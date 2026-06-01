import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import process from 'process';

const ALLOWED_UPLOAD_MIME = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
]);

const IMAGE_RE = /\.(png|jpe?g|webp|gif|svg|avif)$/i;
const VIDEO_RE = /\.(mp4|webm|ogg|mov)$/i;

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
      if (body.length > 80 * 1024 * 1024) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function run(command, cwd) {
  return new Promise((resolve) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr });
    });
  });
}

function safeAssetName(filename) {
  const ext = path.extname(filename || '').toLowerCase();
  const stem = path.basename(filename || 'asset', ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'asset';
  return `${Date.now()}-${stem}${ext}`;
}

function mediaTypeForPath(assetPath) {
  if (VIDEO_RE.test(assetPath)) return 'video';
  if (/youtube\.com|youtu\.be|vimeo\.com/i.test(assetPath)) return 'embed';
  return 'image';
}

function listMediaFiles(rootDir, publicPrefix) {
  if (!fs.existsSync(rootDir)) return [];
  return fs.readdirSync(rootDir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(rootDir, entry.name);
    const relPath = `${publicPrefix}/${entry.name}`.replace(/\\/g, '/');
    if (entry.isDirectory()) return listMediaFiles(fullPath, relPath);
    if (!IMAGE_RE.test(entry.name) && !VIDEO_RE.test(entry.name)) return [];
    const stat = fs.statSync(fullPath);
    const type = mediaTypeForPath(entry.name);
    return [{
      name: entry.name,
      path: relPath,
      type,
      size: stat.size,
      modified: stat.mtimeMs,
      media: {
        type,
        src: relPath,
        controls: type === 'video',
        muted: type === 'video',
      },
    }];
  });
}

function statusPath(line) {
  const rawPath = line.slice(3).trim();
  const renamedPath = rawPath.includes(' -> ') ? rawPath.split(' -> ').pop() : rawPath;
  return renamedPath.replace(/\\/g, '/').replace(/^"|"$/g, '');
}

function isAllowedStatusPath(filePath, allowedPrefixes) {
  return allowedPrefixes.some((prefix) => filePath === prefix.replace(/\/$/, '') || filePath.startsWith(prefix));
}

function dataPathForModel(rootDir, dataDir, allowedModels, model) {
  if (!allowedModels.includes(model) || !/^[a-z0-9-]+$/i.test(model)) return null;
  const filePath = path.resolve(rootDir, dataDir, `${model}.json`);
  const dataRoot = path.resolve(rootDir, dataDir);
  return filePath.startsWith(dataRoot) ? filePath : null;
}

export function createSiteEditorPlugin(options = {}) {
  const rootDir = options.rootDir || process.cwd();
  const dataDir = options.dataDir || 'src/data';
  const allowedModels = options.allowedModels || ['content'];
  const uploadDir = options.uploadDir || 'public/assets/uploads';
  const uploadPublicPrefix = options.uploadPublicPrefix || '/assets/uploads';
  const allowedPublishPaths = options.allowedPublishPaths || ['src/data/', 'public/assets/uploads/'];
  const mediaRoots = options.mediaRoots || [
    ['public/assets', '/assets'],
    [uploadDir, uploadPublicPrefix],
  ];

  return {
    name: 'site-editor',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.url?.startsWith('/api/site-editor/data/')) {
          const model = decodeURIComponent(req.url.replace('/api/site-editor/data/', '').split('?')[0]);
          const filePath = dataPathForModel(rootDir, dataDir, allowedModels, model);
          if (!filePath) return sendJson(res, 404, { success: false, error: 'Unknown model' });

          if (req.method === 'GET') {
            if (!fs.existsSync(filePath)) return sendJson(res, 404, { success: false, error: 'Model file not found' });
            res.setHeader('Content-Type', 'application/json');
            res.end(fs.readFileSync(filePath, 'utf-8'));
            return;
          }

          if (req.method === 'POST') {
            try {
              const body = await readBody(req);
              const parsed = JSON.parse(body);
              fs.writeFileSync(filePath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf-8');
              return sendJson(res, 200, { success: true, model });
            } catch (error) {
              return sendJson(res, 400, { success: false, error: 'Invalid JSON', details: error.message });
            }
          }
        }

        if (req.url === '/api/site-editor/media' && req.method === 'GET') {
          const items = mediaRoots
            .flatMap(([root, prefix]) => listMediaFiles(path.resolve(rootDir, root), prefix))
            .sort((a, b) => b.modified - a.modified);
          return sendJson(res, 200, { success: true, items });
        }

        if (req.url === '/api/site-editor/upload' && req.method === 'POST') {
          try {
            const { filename, data, mimeType } = JSON.parse(await readBody(req));
            if (!filename || !data) throw new Error('Missing file data');
            const detectedMime = mimeType || data.match(/^data:([^;]+);base64,/)?.[1] || '';
            if (!ALLOWED_UPLOAD_MIME.has(detectedMime)) throw new Error(`Unsupported media type: ${detectedMime || 'unknown'}`);

            const base64Content = data.split(';base64,').pop();
            const absoluteUploadDir = path.resolve(rootDir, uploadDir);
            fs.mkdirSync(absoluteUploadDir, { recursive: true });

            const safeName = safeAssetName(filename);
            fs.writeFileSync(path.join(absoluteUploadDir, safeName), base64Content, { encoding: 'base64' });
            const assetPath = `${uploadPublicPrefix}/${safeName}`;
            const type = detectedMime.startsWith('video/') ? 'video' : 'image';
            return sendJson(res, 200, {
              success: true,
              path: assetPath,
              media: { type, src: assetPath, controls: type === 'video', muted: type === 'video' },
            });
          } catch (error) {
            return sendJson(res, 400, { success: false, error: 'Upload failed', details: error.message });
          }
        }

        if (req.url === '/api/site-editor/publish' && req.method === 'POST') {
          const fullStatus = await run('git status --porcelain', rootDir);
          if (fullStatus.error) return sendJson(res, 500, { success: false, error: fullStatus.error.message, stderr: fullStatus.stderr });

          const statusLines = fullStatus.stdout.split(/\r?\n/).filter(Boolean);
          const unrelated = statusLines
            .map(statusPath)
            .filter((filePath) => !isAllowedStatusPath(filePath, allowedPublishPaths));

          if (unrelated.length) {
            return sendJson(res, 409, {
              success: false,
              error: 'Unrelated working tree changes are present. Refusing to publish.',
              unrelated,
            });
          }

          if (!statusLines.length) return sendJson(res, 200, { success: true, stdout: 'No changes to commit. Already up to date.' });

          const publish = await run('git add -- src/data/ public/assets/uploads/ && git commit -m "Content updated via Site Editor" && git push', rootDir);
          if (publish.error) {
            return sendJson(res, 500, { success: false, error: publish.error.message, stderr: publish.stderr, stdout: publish.stdout });
          }
          return sendJson(res, 200, { success: true, stdout: publish.stdout });
        }

        return next();
      });
    },
  };
}

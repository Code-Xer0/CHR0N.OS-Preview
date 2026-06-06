import { copyFileSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const indexPath = join(root, 'index.html');
const sourceIndexPath = join(root, 'tools', 'index.source.html');
const hadIndex = existsSync(indexPath);
const previousIndex = hadIndex ? readFileSync(indexPath) : null;
const command = process.platform === 'win32' ? 'cmd.exe' : join(root, 'node_modules', '.bin', 'vite');
const args = process.platform === 'win32'
  ? ['/d', '/s', '/c', 'node_modules\\.bin\\vite.cmd build']
  : ['build'];

try {
  copyFileSync(sourceIndexPath, indexPath);
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status || 1;
} finally {
  if (hadIndex) {
    writeFileSync(indexPath, previousIndex);
  } else if (existsSync(indexPath)) {
    rmSync(indexPath);
  }
}

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|ogg|mov)$/i;

export function isMediaObject(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value) && (value.type || value.src || value.embedUrl));
}

export function mediaKind(value) {
  if (!value) return 'empty';
  if (typeof value === 'object') {
    if (value.type) return value.type;
    if (value.embedUrl) return 'embed';
    if (VIDEO_EXT.test(value.src || '')) return 'video';
    return 'image';
  }
  if (/youtube\.com|youtu\.be|vimeo\.com/i.test(value)) return 'embed';
  if (VIDEO_EXT.test(value)) return 'video';
  return IMAGE_EXT.test(value) || value.includes('/assets/') ? 'image' : 'unknown';
}

export function mediaSource(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.embedUrl || value.src || '';
}

export function isMediaFieldKey(key = '') {
  return /(asset|gallery|hero|icon|image|media|poster|src|thumbnail|video)$/i.test(key);
}

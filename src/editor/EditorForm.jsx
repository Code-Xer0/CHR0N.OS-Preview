import { useState } from 'react';
import { isMediaFieldKey, isMediaObject, mediaKind, mediaSource } from './media';

const LABEL_OVERRIDES = {
  cta: 'Call to action',
  href: 'Link',
  lede: 'Lead copy',
  src: 'Media source',
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function titleize(key) {
  return LABEL_OVERRIDES[key] || key.replace(/([A-Z])/g, ' $1').replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

function joinPath(path) {
  return path.join('.');
}

function setAtPath(source, path, value) {
  const next = clone(source);
  let current = next;
  for (let i = 0; i < path.length - 1; i += 1) current = current[path[i]];
  current[path[path.length - 1]] = value;
  return next;
}

function MediaPreview({ value }) {
  const source = mediaSource(value);
  const kind = mediaKind(value);
  if (!source) return <div className="ed-preview empty">No media</div>;
  if (kind === 'video') return <video className="ed-preview" src={source} muted controls />;
  return <img className="ed-preview" src={source} alt="" />;
}

export default function EditorForm({ data, onUpdate, selectedMedia, onFocusPath }) {
  const [collapsed, setCollapsed] = useState(() => new Set());

  const updateDataPath = (path, value) => {
    onUpdate(setAtPath(data, path, value));
  };

  const toggleCollapsed = (pathString) => {
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(pathString)) next.delete(pathString);
      else next.add(pathString);
      return next;
    });
  };

  const applySelectedMedia = (path, currentValue) => {
    if (!selectedMedia) return;
    updateDataPath(path, isMediaObject(currentValue) ? { ...currentValue, src: mediaSource(selectedMedia) } : mediaSource(selectedMedia));
  };

  const renderMediaField = (key, value, path) => {
    const pathString = joinPath(path);
    return (
      <div className="ed-field ed-media-field" key={pathString}>
        <div className="ed-field-head">
          <label>{titleize(key)}</label>
          <span>{mediaKind(value)}</span>
        </div>
        <div className="ed-media-row">
          <MediaPreview value={value} />
          <div className="ed-media-controls">
            <input
              className="ed-input"
              value={mediaSource(value)}
              onFocus={() => onFocusPath?.(path)}
              onChange={(event) => updateDataPath(path, isMediaObject(value) ? { ...value, src: event.target.value } : event.target.value)}
              placeholder="/assets/example.png"
            />
            <button type="button" className="ed-btn ed-btn-ghost" onClick={() => applySelectedMedia(path, value)} disabled={!selectedMedia}>
              Use Selected
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPrimitive = (key, value, path) => {
    const pathString = joinPath(path);
    if (typeof value === 'boolean') {
      return (
        <label className="ed-check-line" key={pathString}>
          <input type="checkbox" checked={value} onChange={(event) => updateDataPath(path, event.target.checked)} />
          {titleize(key)}
        </label>
      );
    }

    if (typeof value === 'number') {
      return (
        <div className="ed-field" key={pathString}>
          <label>{titleize(key)}</label>
          <input className="ed-input" type="number" value={value} onFocus={() => onFocusPath?.(path)} onChange={(event) => updateDataPath(path, Number(event.target.value))} />
        </div>
      );
    }

    if (typeof value === 'string') {
      if (isMediaFieldKey(key) || mediaKind(value) !== 'unknown') return renderMediaField(key, value, path);
      const multiline = value.length > 78 || /(body|copy|description|lede|recommendation|summary|text)/i.test(key);
      return (
        <div className="ed-field" key={pathString}>
          <label>{titleize(key)}</label>
          {multiline ? (
            <textarea className="ed-input" rows={4} value={value} onFocus={() => onFocusPath?.(path)} onChange={(event) => updateDataPath(path, event.target.value)} />
          ) : (
            <input className="ed-input" value={value} onFocus={() => onFocusPath?.(path)} onChange={(event) => updateDataPath(path, event.target.value)} />
          )}
        </div>
      );
    }

    return null;
  };

  const renderArray = (key, value, path) => {
    const pathString = joinPath(path);
    if (value.every((item) => typeof item === 'string')) {
      return (
        <div className="ed-field" key={pathString}>
          <label>{titleize(key)} List</label>
          <textarea className="ed-input" rows={Math.max(3, value.length)} value={value.join('\n')} onFocus={() => onFocusPath?.(path)} onChange={(event) => updateDataPath(path, event.target.value.split('\n').map((part) => part.trim()).filter(Boolean))} />
        </div>
      );
    }

    return (
      <div className="ed-nested" key={pathString}>
        <button type="button" className="ed-nested-label" onClick={() => toggleCollapsed(pathString)}>
          <span>{titleize(key)}</span>
          <em>{value.length} items</em>
        </button>
        {!collapsed.has(pathString) && value.map((item, index) => (
          <div className="ed-nested-item" key={`${pathString}.${index}`}>
            <div className="ed-nested-label small">Item {index + 1}</div>
            {renderFormFields(item, [...path, index])}
          </div>
        ))}
      </div>
    );
  };

  const renderFormFields = (obj, path = []) => {
    if (!obj || typeof obj !== 'object') return null;
    return Object.keys(obj).map((key) => {
      const value = obj[key];
      const currentPath = [...path, key];
      const pathString = joinPath(currentPath);

      if (Array.isArray(value)) return renderArray(key, value, currentPath);
      if (isMediaObject(value)) return renderMediaField(key, value, currentPath);
      if (value && typeof value === 'object') {
        return (
          <div className="ed-nested" key={pathString}>
            <button type="button" className="ed-nested-label" onClick={() => toggleCollapsed(pathString)}>
              <span>{titleize(key)}</span>
              <em>{collapsed.has(pathString) ? 'closed' : 'open'}</em>
            </button>
            {!collapsed.has(pathString) && <div className="ed-nested-content">{renderFormFields(value, currentPath)}</div>}
          </div>
        );
      }
      return renderPrimitive(key, value, currentPath);
    });
  };

  return <div className="ed-form-fields">{renderFormFields(data)}</div>;
}

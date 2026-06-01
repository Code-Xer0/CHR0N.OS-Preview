import { useCallback, useEffect, useMemo, useState } from 'react';
import EditorForm from './EditorForm';
import { editorBrand, editorModels } from './editorConfig';
import { mediaSource } from './media';
import './EditorPage.css';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function statusText(result) {
  if (result?.stdout?.includes('No changes to commit')) return 'No content changes to publish.';
  return result?.stdout ? 'Content committed and pushed.' : 'Saved.';
}

function MediaLibrary({ mediaItems, selectedMedia, onSelect, onRefresh, activePath }) {
  const [uploading, setUploading] = useState(false);

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/site-editor/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, data: reader.result, mimeType: file.type }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.details || result.error || 'Upload failed');
        onSelect(result.media);
        onRefresh();
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
        event.target.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside className="ed-media-panel">
      <div className="ed-panel-head">
        <div>
          <span>Media Library</span>
          <strong>{activePath ? activePath.join('.') : 'No field focused'}</strong>
        </div>
        <button className="ed-icon-btn" onClick={onRefresh} title="Refresh media" type="button">↻</button>
      </div>

      <label className="ed-upload-zone">
        <input type="file" accept="image/*,video/mp4,video/webm,video/ogg,video/quicktime" onChange={upload} disabled={uploading} />
        <span>{uploading ? 'Uploading...' : 'Upload image or video'}</span>
        <small>Stored in public/assets/uploads</small>
      </label>

      {selectedMedia && (
        <div className="ed-selected-media">
          <span>Selected</span>
          <code>{mediaSource(selectedMedia)}</code>
        </div>
      )}

      <div className="ed-media-grid">
        {mediaItems.map((item) => (
          <button
            type="button"
            key={item.path}
            className={`ed-media-card ${mediaSource(selectedMedia) === item.path ? 'active' : ''}`}
            onClick={() => onSelect(item.media)}
            title={item.path}
          >
            {item.type === 'video' ? (
              <video src={item.path} muted />
            ) : (
              <img src={item.path} alt="" />
            )}
            <span>{item.name}</span>
            <small>{item.type}</small>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default function EditorPage() {
  const [activeModel, setActiveModel] = useState(editorModels[0].id);
  const [data, setData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activePath, setActivePath] = useState(null);

  const meta = editorModels.find((model) => model.id === activeModel) || editorModels[0];
  const dirty = useMemo(() => JSON.stringify(data) !== JSON.stringify(originalData), [data, originalData]);

  const flash = (text, ms = 4200) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), ms);
  };

  const reloadMedia = useCallback(() => {
    fetch('/api/site-editor/media')
      .then((res) => res.json())
      .then((json) => setMediaItems(json.items || []))
      .catch(() => setMediaItems([]));
  }, []);

  const loadModel = useCallback((model) => {
    setLoading(true);
    setActivePath(null);
    fetch(`/api/site-editor/data/${model}`)
      .then((res) => {
        if (!res.ok) throw new Error('Data not found');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setOriginalData(clone(json));
      })
      .catch((error) => {
        console.error(error);
        setData(null);
        setOriginalData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadModel(activeModel);
  }, [activeModel, loadModel]);

  useEffect(() => {
    reloadMedia();
  }, [reloadMedia]);

  const saveDraft = async (nextData = data) => {
    if (!nextData) return false;
    setSaving(true);
    try {
      const res = await fetch(`/api/site-editor/data/${activeModel}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextData),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.details || result.error || 'Draft save failed');
      setOriginalData(clone(nextData));
      flash('Draft saved locally.');
      return true;
    } catch (error) {
      flash(`Save failed: ${error.message}`);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    setPublishing(true);
    try {
      const saved = dirty ? await saveDraft(data) : true;
      if (!saved) return;
      const res = await fetch('/api/site-editor/publish', { method: 'POST' });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || 'Publish failed');
      flash(statusText(result));
    } catch (error) {
      flash(`Publish failed: ${error.message}`);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="ed-layout">
      <aside className="ed-sidebar">
        <div className="ed-logo">
          <img src={`${import.meta.env.BASE_URL}assets/chronos-icon.png`} alt="" />
          <div>
            <strong>{editorBrand.title}</strong>
            <span>{editorBrand.subtitle}</span>
          </div>
        </div>
        <nav className="ed-nav">
          <div className="ed-nav-title">Models</div>
          {editorModels.map((model) => (
            <button
              key={model.id}
              className={`ed-nav-btn ${activeModel === model.id ? 'active' : ''}`}
              onClick={() => setActiveModel(model.id)}
              type="button"
            >
              <span>{model.label}</span>
              <small>{model.filename}</small>
            </button>
          ))}
        </nav>
        <div className="ed-sidebar-footer">
          <div className={`ed-dirty ${dirty ? 'active' : ''}`}>{dirty ? 'Dirty changes' : 'Clean'}</div>
          <button className="ed-btn ed-btn-commit" onClick={publish} disabled={publishing || !data} type="button">
            {publishing ? 'Publishing...' : 'Commit & Push'}
          </button>
          {message && <div className="ed-message">{message}</div>}
        </div>
      </aside>

      <main className="ed-main">
        <header className="ed-header">
          <div>
            <div className="ed-kicker">Current Model</div>
            <h2>{meta.label}</h2>
            <p>{meta.hint}</p>
          </div>
          <div className="ed-header-actions">
            <button className="ed-btn ed-btn-ghost" onClick={() => loadModel(activeModel)} disabled={loading || dirty} type="button">Reload</button>
            <button className="ed-btn ed-btn-primary" onClick={() => saveDraft()} disabled={saving || !data || !dirty} type="button">
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button className="ed-btn ed-btn-gold" onClick={publish} disabled={publishing || !data} type="button">
              {publishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </header>

        <div className="ed-workspace">
          {loading ? (
            <div className="ed-loading">Loading editable content...</div>
          ) : !data ? (
            <div className="ed-loading error">Content model not found in /src/data/.</div>
          ) : (
            <section className="ed-form">
              <EditorForm data={data} onUpdate={setData} selectedMedia={selectedMedia} onFocusPath={setActivePath} />
            </section>
          )}
          <MediaLibrary
            mediaItems={mediaItems}
            selectedMedia={selectedMedia}
            onSelect={setSelectedMedia}
            onRefresh={reloadMedia}
            activePath={activePath}
          />
        </div>
      </main>
    </div>
  );
}

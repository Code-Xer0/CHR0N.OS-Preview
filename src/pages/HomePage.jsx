
import React, { useEffect } from 'react';
import '../index.css';
import content from '../data/content.json';


export default function HomePage() {
  const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

  useEffect(() => {
    
  // UTC clock
  (function () {
    function tick() {
      const d = new Date();
      const z = n => String(n).padStart(2, '0');
      const el = document.getElementById('clock');
      if (el) el.textContent = z(d.getUTCHours()) + ':' + z(d.getUTCMinutes()) + ':' + z(d.getUTCSeconds());
    }
    tick();
    setInterval(tick, 1000);
  })();

  // Animated star field
  (function () {
    const c = document.getElementById('stars');
    if (!c) return;
    const ctx = c.getContext('2d');
    let stars = [];

    function resize() {
      c.width = window.innerWidth * window.devicePixelRatio;
      c.height = window.innerHeight * window.devicePixelRatio;
      c.style.width = window.innerWidth + 'px';
      c.style.height = window.innerHeight + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      stars = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 9000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1.1 + 0.2,
          a: Math.random() * 0.6 + 0.15,
          tw: Math.random() * 0.02 + 0.005,
          p: Math.random() * Math.PI * 2,
          c: Math.random() > 0.85 ? '#00D9FF' : '#E6F0F7',
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const s of stars) {
        const alpha = s.a * (0.55 + 0.45 * Math.sin(t * s.tw + s.p));
        ctx.beginPath();
        ctx.fillStyle = s.c;
        ctx.globalAlpha = alpha;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(draw);
  })();

  // Product gallery — tab switching + auto-cycle
  (function () {
    const root = document.getElementById('gallery');
    if (!root) return;
    const buttons = root.querySelectorAll('.gallery-tabs button');
    const imgs = root.querySelectorAll('.gallery-stage img');
    const foots = root.querySelectorAll('.gallery-foot .gf');

    function setShot(i) {
      buttons.forEach(b => b.classList.toggle('active', b.dataset.shot == i));
      imgs.forEach(im => im.classList.toggle('active', im.dataset.shot == i));
      foots.forEach(f => f.classList.toggle('active', f.dataset.shot == i));
    }

    buttons.forEach(b => b.addEventListener('click', () => {
      setShot(b.dataset.shot);
    }));

    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % buttons.length;
      setShot(idx);
    }, 6000);
  })();

  // Atlas SVG — procedurally generated nodes, rings, and inheritance lines
  (function () {
    const nodesG = document.getElementById('atlas-nodes');
    const linesG = document.getElementById('atlas-lines');
    const ringsG = document.getElementById('atlas-rings');
    if (!nodesG) return;

    const ns = 'http://www.w3.org/2000/svg';
    const clusters = [
      { x: 540, y: 240, r: 130, n: 70, c: '#00D9FF' },
      { x: 820, y: 320, r: 100, n: 50, c: '#7BA7C9' },
      { x: 320, y: 380, r:  90, n: 35, c: '#A6C5DC' },
      { x: 980, y: 170, r:  70, n: 25, c: '#00D9FF' },
      { x: 160, y: 180, r:  60, n: 18, c: '#5E8CB7' },
      { x: 900, y: 470, r:  60, n: 22, c: '#3D6BA1' },
      { x: 420, y: 120, r:  50, n: 15, c: '#A6C5DC' },
    ];

    const allNodes = [];
    clusters.forEach(cl => {
      const ring = document.createElementNS(ns, 'circle');
      ring.setAttribute('cx', cl.x);
      ring.setAttribute('cy', cl.y);
      ring.setAttribute('r', cl.r);
      ringsG.appendChild(ring);

      for (let i = 0; i < cl.n; i++) {
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.pow(Math.random(), 0.7) * cl.r;
        const x = cl.x + Math.cos(ang) * rad;
        const y = cl.y + Math.sin(ang) * rad;
        const isMain = Math.random() > 0.6;
        const r = isMain ? Math.random() * 2.5 + 1.4 : Math.random() * 1 + 0.4;
        const dot = document.createElementNS(ns, 'circle');
        dot.setAttribute('cx', x);
        dot.setAttribute('cy', y);
        dot.setAttribute('r', r);
        const color = Math.random() > 0.7 ? '#00D9FF' : cl.c;
        dot.setAttribute('fill', color);
        dot.setAttribute('opacity', isMain ? 0.85 : 0.5);
        if (isMain && color === '#00D9FF') dot.setAttribute('filter', 'url(#glow)');
        nodesG.appendChild(dot);
        if (isMain) allNodes.push({ x, y });
      }
    });

    for (let i = 0; i < 24; i++) {
      const a = allNodes[Math.floor(Math.random() * allNodes.length)];
      const b = allNodes[Math.floor(Math.random() * allNodes.length)];
      if (!a || !b) continue;
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 200 || d > 700) continue;
      const ln = document.createElementNS(ns, 'path');
      ln.setAttribute('d', `M${a.x} ${a.y} L${b.x} ${b.y}`);
      linesG.appendChild(ln);
    }
  })();

  }, []);

  return (
    <>
      

{/* Background field + star canvas */}
<div className="field"></div>
<canvas id="stars"></canvas>

{/* Top utility bar */}
<div className="topbar">
  <div className="wrap topbar-inner">
    <span className="live">LOCAL NODE · INTEGRITY OK · UTC <em id="clock">00:00:00</em> · BUILT BY <em style={{ color: 'var(--cyan)' }}>HYPERION INDUSTRIES</em></span>
  </div>
</div>

{/* Navigation */}
<header className="nav">
  <div className="wrap nav-inner">
    <a className="brand" href="#top">
      <img src={asset('chronos-logo-horizontal.png')} alt="CHRON.OS" />
      <span className="wordmark">CHRON<span className="os">.OS</span></span>
    </a>
    <nav className="nav-links">
      <a href="#system">System</a>
      <a href="#archivist">Archivist</a>
      <a href="#atlas">Atlas</a>
      <a href="#privacy">Privacy</a>
      <a href="#beta">Beta</a>
      <a href="https://github.com/Code-Xer0/CHR0N.OS-Preview" target="_blank" rel="noopener">GitHub</a>
      <a href="privacy.html">Legal</a>
    </nav>
    <div className="nav-cta">
      <a className="btn" href="https://github.com/Code-Xer0/CHR0N.OS-Preview" target="_blank" rel="noopener">View on GitHub</a>
      <a className="btn btn-primary" href="https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.1-beta.1/CHRON.OS-v0.2.1-beta.1-windows-setup.exe" target="_blank" rel="noopener">Download installer</a>
    </div>
  </div>
</header>

<main className="wrap" id="top">

{/* ============================================================
     HERO
     ============================================================ */}
<section className="hero">
  <div className="hero-grid">
    <div>
      <span className="eyebrow">Local-first archival intelligence</span>
      <h1>Your archive should remember <em>why things matter.</em></h1>
      <p className="lede">CHRON.OS is a local-first archival intelligence system for preserving documents, media, provenance, temporal context, and user-weighted meaning — without making the cloud the source of truth.</p>
      <div className="pill-row">
        <span className="pill">Runs locally</span>
        <span className="pill">Preserves provenance</span>
        <span className="pill">Maps meaning over time</span>
        <span className="pill">Built for high-context work</span>
      </div>
      <div className="cta-row">
        <a className="btn btn-primary" href="https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.1-beta.1/CHRON.OS-v0.2.1-beta.1-windows-setup.exe" target="_blank" rel="noopener">Download Windows installer</a>
        <a className="btn" href="https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.1-beta.1/CHRON.OS-v0.2.1-beta.1-portable-windows.zip" target="_blank" rel="noopener">Portable ZIP</a>
        <a className="btn" href="#doctrine">Read the principles</a>
      </div>
      <div className="trust">Public beta · Installer recommended · <span>Portable ZIP available for no-install use</span></div>
    </div>

    {/* Orbital rig */}
    <div className="orbit" aria-hidden="true">
      <div className="corner tl"><span>SYS//</span> field active</div>
      <div className="corner tr">epoch <span>2026.05.05</span></div>
      <div className="corner bl">node <span>local-0</span></div>
      <div className="corner br">integrity <span>OK</span></div>
      <div className="crosshair"></div>
      <div className="crosshair h"></div>
      <div className="ring"></div>
      <div className="ring r2"></div>
      <div className="ring r3"></div>
      <div className="ring r4"></div>
      <div className="spinner">
        <div className="node" style={{ top: 0, left: '50%', transform: 'translate(-50%,-50%)' }}></div>
        <div className="node dim" style={{ top: '50%', left: '100%', transform: 'translate(-50%,-50%)' }}></div>
      </div>
      <div className="spinner s2">
        <div className="node" style={{ top: '8%', left: '50%', transform: 'translate(-50%,-50%)' }}></div>
        <div className="node dim" style={{ top: '50%', left: '8%', transform: 'translate(-50%,-50%)' }}></div>
        <div className="node dim" style={{ top: '92%', left: '50%', transform: 'translate(-50%,-50%)' }}></div>
      </div>
      <div className="spinner s3">
        <div className="node dim" style={{ top: '18%', left: '18%', transform: 'translate(-50%,-50%)' }}></div>
        <div className="node" style={{ top: '82%', left: '82%', transform: 'translate(-50%,-50%)' }}></div>
      </div>
      <div className="mark"></div>
    </div>
  </div>
</section>

{/* ============================================================
     01 — SYSTEM OVERVIEW
     ============================================================ */}
<section id="system">
  <div className="section-head">
    <span className="eyebrow">01 — System overview</span>
    <h2>Most folders become digital junk drawers over time. <em>CHRON.OS helps turn that around.</em></h2>
  </div>
  <p style={{ maxWidth: '78ch', color: 'var(--ice-mute)', fontSize: '16px', lineHeight: 1.7, margin: '-24px 0 48px' }}>
    Most folders become unnavigable over time — files pile up, context disappears, and finding something from three years ago means hoping you remember what you named it. CHRON.OS turns scattered files into a searchable, connected archive. It keeps track of documents, media, timelines, duplicates, relationships, and project history so important things don't disappear into chaos.
  </p>

  <div className="pillars">
    <div className="pillar">
      <div className="pillar-num">— 01</div>
      <svg className="pillar-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
        <rect x="3" y="5" width="18" height="14" rx="1"/>
        <path d="M3 9h18M8 5v14"/>
      </svg>
      <h3>Archive</h3>
      <p>Preserve files, metadata, source paths, hashes, and provenance. Originals are never mutated.</p>
    </div>
    <div className="pillar">
      <div className="pillar-num">— 02</div>
      <svg className="pillar-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
        <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
      </svg>
      <h3>Understand</h3>
      <p>Classify by domain, form, entities, emotional salience, and user-adjusted meaning weights.</p>
    </div>
    <div className="pillar">
      <div className="pillar-num">— 03</div>
      <svg className="pillar-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
        <path d="M3 12h6l3-6 3 12 3-6h3"/>
      </svg>
      <h3>Navigate</h3>
      <p>Move through files by chronology, ontology, relationships, duplicates, and trace paths.</p>
    </div>
    <div className="pillar">
      <div className="pillar-num">— 04</div>
      <svg className="pillar-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 2"/>
      </svg>
      <h3>Remember</h3>
      <p>Build continuity across projects, cases, research, creative worlds, and operational records.</p>
    </div>
  </div>
</section>

{/* ============================================================
     02 — WHAT IT PRESERVES (provenance chain)
     ============================================================ */}
<section id="preserves" style={{ paddingTop: '48px' }}>
  <div className="section-head">
    <span className="eyebrow">02 — What it preserves</span>
    <h2>Source → hash → metadata → meaning → trace.</h2>
  </div>
  <p style={{ maxWidth: '70ch', color: 'var(--ice-mute)', fontSize: '15px', lineHeight: 1.7, margin: '-24px 0 40px' }}>
    CHRON.OS keeps more than the file itself. It preserves the trail around it — where it came from, when it changed, and how it connects to the rest of your archive.
  </p>

  <div className="chain">
    <div className="chain-step">
      <div className="label">01 · Source</div>
      <div className="name">Original</div>
      <div className="desc">C:\Users\…\source.pdf — untouched. Path, drive, and intake context preserved.</div>
    </div>
    <div className="chain-step">
      <div className="label">02 · Hash</div>
      <div className="name">SHA-256</div>
      <div className="desc">Cryptographic anchor. Detects duplicates, drift, and silent edits.</div>
    </div>
    <div className="chain-step">
      <div className="label">03 · Metadata</div>
      <div className="name">Sidecar</div>
      <div className="desc">MIME, dimensions, timestamps, EXIF, embedded fields — captured once, kept locally.</div>
    </div>
    <div className="chain-step">
      <div className="label">04 · Meaning</div>
      <div className="name">Context</div>
      <div className="desc">Domain, form, relationships, and meaning you can adjust over time.</div>
    </div>
    <div className="chain-step">
      <div className="label">05 · Trace</div>
      <div className="name">Continuity</div>
      <div className="desc">How files connect across projects, timelines, and decisions.</div>
    </div>
  </div>
</section>

{/* ============================================================
     03 — THE ARCHIVIST
     ============================================================ */}
<section id="archivist">
  <div className="section-head">
    <span className="eyebrow">03 — The Archivist subsystem</span>
    <h2>Not every file matters equally. Archivist helps surface the ones that do.</h2>
  </div>

  <div className="archivist">
    <div>
      <span className="eyebrow">subsystem // archivist</span>
      <h3>Archivist helps surface the files that <em>actually matter.</em></h3>
      <p>Some files are just files. Others are the ones tied to a decision, a breakthrough, a revision, an investigation, or a turning point in a project. Archivist helps CHRON.OS identify which is which — and lets you adjust that weighting as your understanding evolves.</p>
      <div className="doctrine" id="doctrine">
        "A datum is not significant merely because it repeats. A datum is significant when it changes future interpretation."
        <span className="src">— CHRON.OS Doctrine, §II</span>
      </div>
    </div>

    <div className="archivist-shot">
      <img src={asset('extracted_4.png')} alt="Archivist subsystem — chat surface with capabilities and indexed-archive context" />
    </div>
  </div>
</section>

{/* ============================================================
     04 — PRODUCT GALLERY (See it operate)
     ============================================================ */}
<section id="atlas">
  <div className="section-head">
    <span className="eyebrow">04 — See it operate</span>
    <h2>See how the archive <em>works in practice.</em></h2>
  </div>
  <p style={{ maxWidth: '72ch', color: 'var(--ice-mute)', fontSize: '15px', lineHeight: 1.7, margin: '-24px 0 40px' }}>
    These are real screens from the live beta. Browse relationships between files, trace project history, inspect artifacts, and explore how CHRON.OS organizes information over time.
  </p>

  <div className="gallery" id="gallery">
    <div className="gallery-head">
      <div className="gallery-tabs">
        <button className="active" data-shot="0">Semantic Atlas</button>
        <button data-shot="1">Constellation</button>
        <button data-shot="2">Artifact Detail</button>
        <button data-shot="3">Trace Relations</button>
        <button data-shot="4">Archivist</button>
        <button data-shot="5">Dashboard</button>
        <button data-shot="6">Files</button>
      </div>
      <div className="gallery-meta">v0.9.4 · live capture</div>
    </div>
    <div className="gallery-stage">
      <img className="active" data-shot="0" src={asset('extracted_5.png')} alt="Semantic Atlas — domain field with clusters, inheritance lines, and seven active semantic domains" />
      <img data-shot="1" src={asset('extracted_6.png')} alt="Knowledge Constellation — orbital lanes around a User Knowledge Well" />
      <img data-shot="2" src={asset('extracted_7.png')} alt="Artifact detail — meaning panel with significance, role, horizon, emotional valence" />
      <img data-shot="3" src={asset('extracted_8.png')} alt="Trace relations — follow lineage between source documents and derivatives" />
      <img data-shot="4" src={asset('extracted_9.png')} alt="Archivist — chat surface ready with archive context" />
      <img data-shot="5" src={asset('extracted_10.png')} alt="Dashboard — domains, document forms, significance, temporal activity" />
      <img data-shot="6" src={asset('extracted_11.png')} alt="Local source browser — preview originals without mutating them" />
    </div>
    <div className="gallery-foot">
      <div className="gf active" data-shot="0">
        <div><div className="lab">Surface relationships</div><p>Clusters show where artifacts collide. Strings show inheritance, recurrence, semantic echo.</p></div>
        <div><div className="lab">Mode tabs</div><p>Field · Domain · Artifact · Lineage · Echo · Meaning. Each lens reframes the same field.</p></div>
        <div><div className="lab">7 active domains</div><p>application/pdf · image/png · image/jpeg · text/plain · visual media · civil litigation · housing law.</p></div>
      </div>
      <div className="gf" data-shot="1">
        <div><div className="lab">Living constellation</div><p>Domains set orbital lanes. Meaning weight pulls important artifacts toward the User Knowledge Well.</p></div>
        <div><div className="lab">549 nodes · 120 edges</div><p>205 domains across the live archive. Drag to pan, click a domain to isolate.</p></div>
        <div><div className="lab">User Knowledge Well</div><p>The gravitational center. Significance accumulates here over time.</p></div>
      </div>
      <div className="gf" data-shot="2">
        <div><div className="lab">Meaning panel</div><p>Significance, score, role, horizon, emotional valence — all attached to the artifact.</p></div>
        <div><div className="lab">User-confirmed outranks model</div><p>Local user-weighted context wins over inferred meaning.</p></div>
        <div><div className="lab">Tags &amp; concepts</div><p>document, applied, research paper, specification. Editable, traceable.</p></div>
      </div>
      <div className="gf" data-shot="3">
        <div><div className="lab">Trace relations</div><p>Every related artifact, every shared domain, every chain of inheritance — kept and walkable.</p></div>
        <div><div className="lab">Cross-form trails</div><p>Whitepapers, analyses, constitutions, landing pages — all on the same field.</p></div>
        <div><div className="lab">No data is orphaned</div><p>If it entered the archive, the path back is preserved.</p></div>
      </div>
      <div className="gf" data-shot="4">
        <div><div className="lab">Ready with context</div><p>Ask Archivist to find files, explain structure, create folders, or review the ontology.</p></div>
        <div><div className="lab">Local history</div><p>Pane and bubble share the same local history. Stays on this device unless context is required.</p></div>
        <div><div className="lab">Operational</div><p>archivist-system / v1.8.0 · 549 indexed.</p></div>
      </div>
      <div className="gf" data-shot="5">
        <div><div className="lab">Domains, forms, significance</div><p>Live counts. Whitepaper, note, specification, report, research paper.</p></div>
        <div><div className="lab">Temporal activity</div><p>Ledger anchors by age window — 7d · 30d · 90d · older.</p></div>
        <div><div className="lab">Recent / high salience</div><p>What just landed and what carries weight, surfaced together.</p></div>
      </div>
      <div className="gf" data-shot="6">
        <div><div className="lab">Local source browser</div><p>Inspect file weight; copy selected sources into CHRON.OS without changing the original.</p></div>
        <div><div className="lab">Originals untouched</div><p>Working copies only. Source paths and timestamps preserved.</p></div>
        <div><div className="lab">Quick places</div><p>Home · Downloads · Documents · Current root. Pin any drive.</p></div>
      </div>
    </div>
  </div>
</section>

{/* ============================================================
     05 — OPERATIONAL STATE (Capabilities)
     ============================================================ */}
<section id="capabilities">
  <div className="section-head">
    <span className="eyebrow">05 — What it can do today</span>
    <h2>What's working now, what's in progress, and what's <em>still being built.</em></h2>
  </div>

  <div className="cap-grid">
    <div className="cap now">
      <div className="cap-head">
        <h4>Working now</h4>
        <span className="status-dot live">Operational</span>
      </div>
      <ul>
        <li><span className="tick"></span>Local document intake &amp; File Explorer previews</li>
        <li><span className="tick"></span>PDF, text, DOCX, image, and video preview support</li>
        <li><span className="tick"></span>Duplicate detection &amp; full duplicate scan</li>
        <li><span className="tick"></span>Temporal ordering &amp; recent-import views</li>
        <li><span className="tick"></span>Dashboard metrics &amp; archive insights</li>
        <li><span className="tick"></span>Archivist-assisted meaning &amp; classification</li>
        <li><span className="tick"></span>Ontology / dimension navigation</li>
        <li><span className="tick"></span>Constellation &amp; Atlas relationship views</li>
        <li><span className="tick"></span>Local-first desktop workflow</li>
      </ul>
      <div className="cap-foot">verified · v0.9.4 · 549 indexed</div>
    </div>

    <div className="cap dev">
      <div className="cap-head">
        <h4>In active development</h4>
        <span className="status-dot dev">Production track</span>
      </div>
      <ul>
        <li><span className="tick"></span>Media inference for images and video</li>
        <li><span className="tick"></span>Frame sampling &amp; visual entity learning</li>
        <li><span className="tick"></span>Media-to-document linking</li>
        <li><span className="tick"></span>Meaning Lab — user-guided ontology refinement</li>
        <li><span className="tick"></span>Stronger dashboard analytics</li>
        <li><span className="tick"></span>Semantic Atlas performance pass</li>
        <li><span className="tick"></span>External trust surfaces (post verification)</li>
        <li><span className="tick"></span>MCP-based local archive access for trusted tools</li>
        <li><span className="tick"></span>NAS / local redundancy after safety review</li>
      </ul>
      <div className="cap-foot">phased rollout · q3–q4 2026</div>
    </div>

    <div className="cap gated">
      <div className="cap-head">
        <h4>What's still being built</h4>
        <span className="status-dot gated">Gated</span>
      </div>
      <ul>
        <li><span className="tick"></span>Production OAuth / Google Drive sync (pending domain, branding, consent screen, and provider verification)</li>
        <li><span className="tick"></span>Full frame-by-frame video understanding</li>
        <li><span className="tick"></span>Replacement of human review for legal, medical, financial, or safety-critical interpretation</li>
        <li><span className="tick"></span>Mutation of original source files — by design, never</li>
        <li><span className="tick"></span>A requirement that the cloud be the canonical archive</li>
        <li><span className="tick"></span>Enterprise-grade security claims beyond what is implemented</li>
      </ul>
      <div className="cap-foot">policy · what we will not pretend</div>
    </div>
  </div>
</section>

{/* ============================================================
     06 — TRUST BY CONSTRUCTION (settings screens)
     ============================================================ */}
<section id="trust-strip" style={{ paddingTop: 0 }}>
  <div className="section-head">
    <span className="eyebrow">06 — Privacy and control built in</span>
    <h2>Your files stay under your control — <em>by default, not by request.</em></h2>
  </div>
  <div className="trust-strip">
    <div className="trust-shot">
      <div className="img"><img src={asset('extracted_12.png')} alt="Security vault — passphrase, auto-lock, Windows Hello, authenticator, hardware key" /></div>
      <div className="body">
        <div className="lab">Security vault</div>
        <h4>Encryption is your call</h4>
        <p>Passphrase encrypts settings, sidecars, uploads, and the local search index. Local presence factors register here.</p>
      </div>
    </div>
    <div className="trust-shot">
      <div className="img"><img src={asset('extracted_13.png')} alt="Cloud provider settings — Claude, OpenAI, Google, Mistral, plus local Ollama and edge OpenAI-compatible endpoints" /></div>
      <div className="body">
        <div className="lab">Choose your AI tools</div>
        <h4>Cloud, local, or entirely on-device</h4>
        <p>Claude · OpenAI · Google · Mistral, plus local Ollama and any OpenAI-compatible LAN endpoint. Prefer-edge routes inference off-cloud.</p>
      </div>
    </div>
    <div className="trust-shot">
      <div className="img"><img src={asset('extracted_14.png')} alt="Local source browser — preview originals before copying into the archive" /></div>
      <div className="body">
        <div className="lab">Local source browser</div>
        <h4>Your original files are never touched</h4>
        <p>Browse, preview, and bring files into CHRON.OS without moving or modifying the originals.</p>
      </div>
    </div>
  </div>
</section>

{/* ============================================================
     07 — LOCAL-FIRST CUSTODY (Privacy)
     ============================================================ */}
<section id="privacy">
  <div className="section-head">
    <span className="eyebrow">07 — Your files stay with you</span>
    <h2>Your computer stays in control. <em>Not a cloud account.</em></h2>
  </div>
  <p style={{ maxWidth: '74ch', color: 'var(--ice-mute)', fontSize: '15px', lineHeight: 1.7, margin: '-24px 0 40px' }}>
    CHRON.OS is designed so your archive starts with you — not a cloud account. Your original files stay untouched on your machine unless you choose otherwise. Cloud tools and external services are optional add-ons, not requirements.
  </p>

  <div className="privacy">
    <div className="trust-list">
      <div className="item">
        <div className="num">// 01</div>
        <div className="body"><strong>Local-first by default</strong>
          <p>Everything starts on your device. No sign-up, no cloud account required to get started.</p></div>
        <div className="stat">Default</div>
      </div>
      <div className="item">
        <div className="num">// 02</div>
        <div className="body"><strong>Original files untouched</strong>
          <p>CHRON.OS works with copies. It never renames, moves, or modifies your original files.</p></div>
        <div className="stat">Enforced</div>
      </div>
      <div className="item">
        <div className="num">// 03</div>
        <div className="body"><strong>Provenance preserved</strong>
          <p>Where a file came from, when it changed, and how it got there — all kept with the file.</p></div>
        <div className="stat">Always on</div>
      </div>
      <div className="item">
        <div className="num">// 04</div>
        <div className="body"><strong>No cloud account required</strong>
          <p>The full experience works without an internet connection. Cloud tools are optional and always opt-in.</p></div>
        <div className="stat">Offline-ok</div>
      </div>
      <div className="item gated">
        <div className="num">// 05</div>
        <div className="body"><strong>External providers gated</strong>
          <p>Cloud sync, OAuth, and third-party integrations are off by default. You enable them only if and when you need them.</p></div>
        <div className="stat">Gated</div>
      </div>
    </div>

    {/* Trust topology diagram */}
    <div className="topo">
      <h5>Trust topology</h5>
      <svg viewBox="0 0 480 360" fill="none">
        <defs>
          <linearGradient id="grad-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#00D9FF" stop-opacity=".0"/>
            <stop offset="100%" stop-color="#00D9FF" stop-opacity=".7"/>
          </linearGradient>
        </defs>

        {/* machine boundary */}
        <rect x="20" y="60" width="280" height="280" rx="6" stroke="#00D9FF" stroke-opacity=".5" stroke-dasharray="2 4"/>
        <text x="32" y="50" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing=".18em" fill="#00D9FF">YOUR MACHINE · CANONICAL</text>

        {/* nodes inside machine */}
        <g font-family="JetBrains Mono, monospace" font-size="11" fill="#E6F0F7">
          <g><rect x="48" y="100" width="100" height="44" rx="3" fill="#0d1c40" stroke="#E6F0F7" stroke-opacity=".25"/><text x="98" y="127" text-anchor="middle">Sources</text></g>
          <g><rect x="170" y="100" width="100" height="44" rx="3" fill="#0d1c40" stroke="#E6F0F7" stroke-opacity=".25"/><text x="220" y="127" text-anchor="middle">Index</text></g>
          <g><rect x="48" y="180" width="100" height="44" rx="3" fill="#0d1c40" stroke="#E6F0F7" stroke-opacity=".25"/><text x="98" y="207" text-anchor="middle">Metadata</text></g>
          <g><rect x="170" y="180" width="100" height="44" rx="3" fill="#0d1c40" stroke="#00D9FF" stroke-opacity=".7"/><text x="220" y="207" text-anchor="middle" fill="#00D9FF">Archivist</text></g>
          <g><rect x="48" y="260" width="222" height="44" rx="3" fill="#0d1c40" stroke="#E6F0F7" stroke-opacity=".25"/><text x="159" y="287" text-anchor="middle">Atlas · Constellation · Ontology</text></g>
        </g>

        {/* internal edges */}
        <g stroke="#E6F0F7" stroke-opacity=".25">
          <path d="M148 122 L170 122"/>
          <path d="M98 144 L98 180"/>
          <path d="M220 144 L220 180"/>
          <path d="M98 224 L98 260"/>
          <path d="M220 224 L220 260"/>
        </g>

        {/* gated bridge to external */}
        <path d="M300 180 L380 180" stroke="url(#grad-edge)" stroke-width="1.2" stroke-dasharray="3 4"/>
        <text x="340" y="172" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing=".18em" fill="#00D9FF" fill-opacity=".7">GATED</text>

        {/* external node */}
        <g font-family="JetBrains Mono, monospace" font-size="11" fill="#E6F0F7" fill-opacity=".55">
          <rect x="380" y="158" width="80" height="44" rx="3" fill="transparent" stroke="#E6F0F7" stroke-opacity=".18" stroke-dasharray="3 3"/>
          <text x="420" y="178" text-anchor="middle">External</text>
          <text x="420" y="192" text-anchor="middle" font-size="9" fill-opacity=".5">opt-in</text>
        </g>
      </svg>
    </div>
  </div>
</section>

{/* ============================================================
     08 — BETA STATUS
     ============================================================ */}
<section id="beta">
  <div className="section-head">
    <span className="eyebrow">08 — Beta status</span>
    <h2>Core features are live <em>and improving quickly.</em></h2>
  </div>
  <p style={{ maxWidth: '74ch', color: 'var(--ice-mute)', fontSize: '15px', lineHeight: 1.7, margin: '-24px 0 0' }}>
    The core archive, file preview, duplicate detection, timeline navigation, dashboard, and relationship views are all working. The instrument works. The archive grows.

  Advanced media understanding, external cloud tools, and deeper Atlas performance are under active development.
  </p>

  <div className="status-grid">
    <div className="stat-card">
      <div className="lab">Build · current</div>
      <div className="num">v0.9<span className="small">.4</span></div>
      <div className="sub">public beta · stable channel</div>
    </div>
    <div className="stat-card">
      <div className="lab">Index · live</div>
      <div className="num">549<span className="small"> artifacts</span></div>
      <div className="sub">186 media · 357 documents · 6 archives</div>
    </div>
    <div className="stat-card">
      <div className="lab">Custody · model</div>
      <div className="num">Local<span className="small">-first</span></div>
      <div className="sub">no cloud account required</div>
    </div>
    <div className="stat-card">
      <div className="lab">Surfaces · external</div>
      <div className="num">Gated</div>
      <div className="sub">verification-dependent</div>
    </div>
  </div>

  {/* Download CTA */}
  <div className="cta-band" id="download">
    <div>
      <span className="eyebrow">Get started</span>
      <h3>Start building an archive <em>you can actually navigate.</em></h3>
      <p>Point CHRON.OS at a folder and let it begin organizing your documents, media, research, and projects into a connected archive you can explore and search over time.</p>
      <div className="cta-row">
        <a className="btn btn-primary" href="https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.1-beta.1/CHRON.OS-v0.2.1-beta.1-windows-setup.exe" target="_blank" rel="noopener">Download Windows installer</a>
        <a className="btn" href="https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.1-beta.1/CHRON.OS-v0.2.1-beta.1-portable-windows.zip" target="_blank" rel="noopener">Portable ZIP</a>
        <a className="btn" href="https://github.com/Code-Xer0/CHR0N.OS-Preview" target="_blank" rel="noopener">View on GitHub</a>
      </div>
      <p className="trust">Recommended for most Windows users: one-click installer. Portable ZIP is for no-install testing or users who already have the required runtime pieces.</p>
    </div>
    <div>
      <div className="ontology" style={{ background: 'rgba(4,8,26,.5)' }}>
        <div className="head">
          <span>Install · footprint</span>
          <span className="live-dot">READY</span>
        </div>
        <div className="row" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="term">macOS · 12+ · Apple Silicon &amp; Intel</div>
          <div className="val" style={{ color: 'var(--cyan)' }}>.dmg</div>
        </div>
        <div className="row" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="term">Windows · 10/11 · x64</div>
          <div className="val" style={{ color: 'var(--cyan)' }}>.exe</div>
        </div>
        <div className="row" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="term">Linux · AppImage / .deb</div>
          <div className="val" style={{ color: 'var(--cyan)' }}>build</div>
        </div>
        <a className="btn" href="https://github.com/Code-Xer0/CHR0N.OS-Preview" target="_blank" rel="noopener">View on GitHub</a>
      </div>
      <p className="trust">Recommended for most Windows users: one-click installer. Portable ZIP is for no-install testing or users who already have the required runtime pieces.</p>
    </div>
    <div>
      <div className="ontology" style={{ background: 'rgba(4,8,26,.5)' }}>
        <div className="head">
          <span>Install · footprint</span>
          <span className="live-dot">READY</span>
        </div>
        <div className="row" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="term">macOS · 12+ · Apple Silicon &amp; Intel</div>
          <div className="val" style={{ color: 'var(--cyan)' }}>.dmg</div>
        </div>
        <div className="row" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="term">Windows · 10/11 · x64</div>
          <div className="val" style={{ color: 'var(--cyan)' }}>.exe</div>
        </div>
        <div className="row" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="term">Linux · AppImage / .deb</div>
          <div className="val" style={{ color: 'var(--cyan)' }}>build</div>
        </div>
        <div className="row" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="term">Source · GitHub mirror</div>
          <div className="val" style={{ color: 'var(--cyan)' }}>repo</div>
        </div>
      </div>
    </div>
  </div>
</section>

</main>

{/* ============================================================
     FOOTER
     ============================================================ */}
<footer>
  <div className="wrap">
    <div className="foot-grid">
      <div className="foot-brand">
        <img src={asset('chronos-logo-horizontal.png')} alt="CHRON.OS" />
        <p>CHRON.OS — local-first archival intelligence. A Hyperion Industries system.</p>
      </div>
      <div className="foot-col">
        <h6>Product</h6>
        <ul>
          <li><a href="#system">How it works</a></li>
          <li><a href="#archivist">The Archivist</a></li>
          <li><a href="#atlas">See it inside</a></li>
          <li><a href="#capabilities">What it does</a></li>
        </ul>
      </div>
      <div className="foot-col">
        <h6>Trust</h6>
        <ul>
          <li><a href="#privacy">On-device</a></li>
          <li><a href="#privacy">Never moves files</a></li>
          <li><a href="#beta">Beta status</a></li>
          <li><a href="#privacy">Privacy notes</a></li>
        </ul>
      </div>
      <div className="foot-col">
        <h6>Distribution</h6>
        <ul>
          <li><a href="https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.1-beta.1/CHRON.OS-v0.2.1-beta.1-windows-setup.exe" target="_blank" rel="noopener">Windows installer</a></li>
          <li><a href="https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.1-beta.1/CHRON.OS-v0.2.1-beta.1-portable-windows.zip" target="_blank" rel="noopener">Portable ZIP</a></li>
          <li><a href="https://github.com/Code-Xer0/CHR0N.OS-Preview" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="#system">Use Cases</a></li>
          <li><a href="CHANGELOG.md" target="_blank" rel="noopener">What's new</a></li>
        </ul>
      </div>
      <div className="foot-col">
        <h6>Legal</h6>
        <ul>
          <li><a href="privacy.html">Privacy</a></li>
          <li><a href="terms.html">Terms of Use</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="mailto:hello@hyperion-industries.dev">hello@hyperion-industries.dev</a></li>
        </ul>
      </div>
    </div>
    <div className="foot-bottom">
      <span className="sig">CHRON<em>.OS</em> · <a href="https://hyperion-industries.dev" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>HYPERION INDUSTRIES</a></span>
      <span>© 2026 · LOCAL-FIRST · BETA</span>
    </div>
  </div>
</footer>
    </>
  );
}


import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import siteContent from '../data/content.json';
import './home-revamp.css';

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const { releaseLinks, home } = siteContent;
const galleryShots = home.gallery.map((shot) => ({ ...shot, src: asset(shot.asset) }));

const workflow = [
  {
    number: '01',
    title: 'Bring in a working copy',
    copy: 'Stage documents and media into local custody while the originals stay exactly where they are.',
  },
  {
    number: '02',
    title: 'Read the evidence',
    copy: 'Capture hashes, metadata, dates, media posture, and source context in inspectable sidecars.',
  },
  {
    number: '03',
    title: 'Find the shape',
    copy: 'Move through the archive by chronology, search, relationships, and operator-weighted meaning.',
  },
  {
    number: '04',
    title: 'Review before action',
    copy: 'Corrections, suggestions, automation, and retention stay visible and gated before they can run.',
  },
];

const currentBuild = [
  'Local archive and media intake',
  'Provenance-preserving working copies',
  'Timeline, search, and relationship views',
  'Durable queues and approved watched sources',
  'Explicit parser and local-engine posture',
  'Review-only context suggestions',
];

const betaBoundaries = [
  'Use test or non-critical data first',
  'Windows may warn on unsigned beta builds',
  'Optional engines require local models or runtimes',
  'Cloud, NAS, OAuth, and deeper interop remain staged',
  'No autonomous delete, move, or retention flows',
];

export default function HomePage() {
  const { isLightMode, toggleTheme } = useTheme();
  const [activeShot, setActiveShot] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveShot((current) => (current + 1) % galleryShots.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  const selectedShot = galleryShots[activeShot];

  return (
    <div className="chron-home" id="top">
      <div className="chron-ambient" aria-hidden="true" />

      <header className="chron-nav">
        <a className="chron-brand" href="#top" aria-label="CHR0N.OS home">
          <img src={asset('chronos-logo-horizontal.png')} alt="CHR0N.OS" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#workflow">Workflow</a>
          <a href="#trust">Trust</a>
          <a href="#videos">Videos</a>
          <a href="#services">Services</a>
          <a href="#beta">Beta</a>
        </nav>
        <div className="chron-nav-actions">
          <button className="chron-theme" type="button" onClick={toggleTheme} aria-label="Toggle color theme">
            {isLightMode ? 'Dark' : 'Light'}
          </button>
          <a className="chron-button chron-button-primary" href={releaseLinks.installer} target="_blank" rel="noopener">
            Download for Windows
          </a>
        </div>
      </header>

      <main>
        <section className="chron-hero" aria-labelledby="hero-title">
          <div className="chron-hero-copy">
            <div className="chron-kicker"><span /> Public beta · v0.2.3</div>
            <h1 id="hero-title">Your files.<br />Their history.<br /><em>Still yours.</em></h1>
            <p>
              CHR0N.OS is a local-first archive for the documents and media that need more than a folder.
              Preserve where they came from, understand how they connect, and keep action under your control.
            </p>
            <div className="chron-hero-actions">
              <a className="chron-button chron-button-primary chron-button-large" href={releaseLinks.installer} target="_blank" rel="noopener">
                Download the public beta <span>↗</span>
              </a>
              <a className="chron-button chron-button-ghost chron-button-large" href="#product">See the product</a>
            </div>
            <div className="chron-assurance" aria-label="Product assurances">
              <span>No account required</span>
              <span>Originals stay put</span>
              <span>Cloud is optional</span>
            </div>
          </div>

          <div className="chron-hero-product">
            <div className="chron-orbit chron-orbit-one" aria-hidden="true" />
            <div className="chron-orbit chron-orbit-two" aria-hidden="true" />
            <div className="chron-product-window">
              <div className="chron-window-bar">
                <div className="chron-window-dots"><span /><span /><span /></div>
                <div className="chron-window-label">LOCAL ARCHIVE · EMPTY DEMO WORKSPACE</div>
                <div className="chron-window-state">LIVE BUILD</div>
              </div>
              <img src={asset('chronos-023-overview.png')} alt="CHR0N.OS v0.2.3 Overview in an isolated empty workspace" />
            </div>
            <div className="chron-float-card chron-float-top">
              <span>Build posture</span>
              <strong>Local-first</strong>
            </div>
            <div className="chron-float-card chron-float-bottom">
              <span>Source policy</span>
              <strong>Originals untouched</strong>
            </div>
          </div>
        </section>

        <section className="chron-proof" aria-label="Product position">
          <div><span>01</span><strong>Copy-first custody</strong><p>Work from archive copies and inspectable sidecars.</p></div>
          <div><span>02</span><strong>Evidence before inference</strong><p>Keep source facts distinct from suggestions and meaning.</p></div>
          <div><span>03</span><strong>Operator before automation</strong><p>Review, policy, and approval remain part of the workflow.</p></div>
        </section>

        <section className="chron-section chron-showcase" id="product">
          <div className="chron-section-head">
            <div>
              <span className="chron-section-index">01 · PRODUCT TOUR</span>
              <h2>See the real build.<br /><em>Not a concept render.</em></h2>
            </div>
            <p>
              Every screen below was captured from v0.2.3 in isolated demo workspaces. Populated views use
              fictional Project Aurora files — never a private archive or hidden capability fallback.
            </p>
          </div>

          <div className="chron-showcase-shell">
            <div className="chron-showcase-tabs" role="tablist" aria-label="Product screenshots">
              {galleryShots.map((shot, index) => (
                <button
                  key={shot.tab}
                  type="button"
                  role="tab"
                  aria-selected={activeShot === index}
                  className={activeShot === index ? 'active' : ''}
                  onClick={() => setActiveShot(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>{shot.tab}
                </button>
              ))}
            </div>

            <div className="chron-showcase-stage">
              <div className="chron-stage-meta">
                <span>CHR0N.OS / v0.2.3</span>
                <span>ISOLATED DEMO / VERIFIED CAPTURE</span>
              </div>
              <img key={selectedShot.src} src={selectedShot.src} alt={selectedShot.alt} />
            </div>

            <div className="chron-showcase-notes">
              <div className="chron-showcase-title">
                <span>Selected surface</span>
                <h3>{selectedShot.tab}</h3>
              </div>
              {selectedShot.panels.map((panel) => (
                <div className="chron-note" key={panel.label}>
                  <span>{panel.label}</span>
                  <p>{panel.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="chron-section" id="workflow">
          <div className="chron-section-head chron-section-head-tight">
            <div>
              <span className="chron-section-index">02 · THE WORKFLOW</span>
              <h2>A memory system starts<br /><em>with a trustworthy trail.</em></h2>
            </div>
            <p>CHR0N.OS keeps collection, interpretation, and action as separate stages so the archive stays understandable.</p>
          </div>

          <div className="chron-workflow">
            {workflow.map((step) => (
              <article key={step.number}>
                <span className="chron-step-number">{step.number}</span>
                <div className="chron-step-line" aria-hidden="true"><i /></div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="chron-section chron-trust" id="trust">
          <div className="chron-trust-visual">
            <div className="chron-image-frame">
              <img src={asset('chronos-023-engines.png')} alt="CHR0N.OS local engine capability posture" />
            </div>
            <div className="chron-trust-caption">
              <span>Capability truth</span>
              <strong>Missing means missing.</strong>
              <p>CHR0N.OS does not silently replace an unavailable local engine with cloud processing.</p>
            </div>
          </div>

          <div className="chron-trust-copy">
            <span className="chron-section-index">03 · TRUST BY CONSTRUCTION</span>
            <h2>Control is a feature.<br /><em>Not a settings page.</em></h2>
            <p className="chron-trust-lede">
              The archive begins on your device. Provider state, vault posture, model availability, and proposal lanes stay visible to the operator.
            </p>
            <div className="chron-trust-grid">
              <div><strong>Local-first</strong><p>No account or permanent cloud source of truth is required.</p></div>
              <div><strong>Non-destructive</strong><p>Original files remain outside the working archive and are not rewritten.</p></div>
              <div><strong>Explicit posture</strong><p>Unavailable engines, missing models, and metadata-only formats remain visible.</p></div>
              <div><strong>Gated action</strong><p>Delete, move, retention, and automation require policy or operator approval.</p></div>
            </div>
          </div>
        </section>

        <section className="chron-section chron-videos" id="videos">
          <div className="chron-section-head">
            <div>
              <span className="chron-section-index">04 · IN MOTION</span>
              <h2>Watch the current build<br /><em>tell the truth.</em></h2>
            </div>
            <p>Two concise, silent walkthroughs from an isolated synthetic ingest session. What you see is the public build working with fictional data.</p>
          </div>

          <div className="chron-video-grid">
            {home.videoLanes.map(({ title, duration, copy, status, src, poster }, index) => (
              <article className="chron-video-card" key={title}>
                <div className="chron-video-wrap">
                  <video controls preload="metadata" playsInline poster={asset(poster)} aria-label={title}>
                    <source src={asset(src)} type="video/webm" />
                    Your browser does not support embedded WebM video.
                  </video>
                  <span className="chron-video-duration">{duration}</span>
                </div>
                <div className="chron-video-body">
                  <span>{String(index + 1).padStart(2, '0')} · {status}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="chron-section chron-services" id="services">
          <div className="chron-section-head">
            <div>
              <span className="chron-section-index">05 · GUIDED SERVICES</span>
              <h2>Use the beta yourself.<br /><em>Bring Hyperion when it matters.</em></h2>
            </div>
            <p>The software remains publicly available. Paid work adds a bounded assessment, guided setup, reviewed migration, or team continuity design—not a hidden license gate.</p>
          </div>
          <div className="chron-service-grid">
            {home.services.map((service) => (
              <article className="chron-service-card" key={service.id}>
                <span>CHR0N.OS SERVICE</span>
                <h3>{service.name}</h3>
                <strong>{service.price}</strong>
                <p>{service.copy}</p>
                <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
                <a href={`https://hyperion-industries.dev/intake/continuity?service=${service.id}&source=chronos-app`}>Start this brief <b>→</b></a>
              </article>
            ))}
          </div>
          <div className="chron-service-boundary">PROPOSAL FIRST · NO ONE-CLICK ORDER · PAYMENT FOLLOWS REVIEWED SCOPE</div>
        </section>

        <section className="chron-section chron-beta" id="beta">
          <div className="chron-beta-intro">
            <span className="chron-section-index">06 · PUBLIC BETA</span>
            <h2>A real build.<br /><em>Clear boundaries.</em></h2>
            <p>
              CHR0N.OS v0.2.3 is available now for Windows. It is a working public beta, not a claim of finished enterprise software.
            </p>
            <a className="chron-text-link" href="./CHANGELOG.md">Read what changed <span>→</span></a>
          </div>
          <div className="chron-scope-card chron-scope-current">
            <div className="chron-scope-head"><span>Current build</span><strong>SHIPPED</strong></div>
            <ul>{currentBuild.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="chron-scope-card chron-scope-boundary">
            <div className="chron-scope-head"><span>Beta boundaries</span><strong>READ FIRST</strong></div>
            <ul>{betaBoundaries.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="chron-final-cta">
          <div className="chron-cta-mark" aria-hidden="true"><img src={asset('chronos-icon.png')} alt="" /></div>
          <div>
            <span className="chron-section-index">LOCAL-FIRST ARCHIVAL INTELLIGENCE</span>
            <h2>Give important files<br /><em>a memory of their own.</em></h2>
          </div>
          <div className="chron-final-actions">
            <a className="chron-button chron-button-primary chron-button-large" href={releaseLinks.installer} target="_blank" rel="noopener">Download installer <span>↗</span></a>
            <a className="chron-text-link" href={releaseLinks.github} target="_blank" rel="noopener">View source and release notes <span>→</span></a>
          </div>
        </section>
      </main>

      <footer className="chron-footer">
        <div className="chron-footer-brand">
          <img src={asset('chronos-logo-horizontal.png')} alt="CHR0N.OS" />
          <p>Local-first archival intelligence from Hyperion Industries.</p>
        </div>
        <div className="chron-footer-links">
          <a href="#product">Product</a>
          <a href="#trust">Trust</a>
          <a href="#services">Services</a>
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms</a>
          <a href="contact.html">Contact</a>
          <a href={releaseLinks.github} target="_blank" rel="noopener">GitHub</a>
        </div>
        <div className="chron-footer-meta">© 2026 HYPERION INDUSTRIES · PUBLIC BETA</div>
      </footer>
    </div>
  );
}

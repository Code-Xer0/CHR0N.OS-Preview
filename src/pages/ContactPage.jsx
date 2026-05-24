
import React from 'react';
import '../index.css';

export default function ContactPage() {
  return (
    <>
      
<div className="topbar">
  <span>CHRON<span style={{ /* color:var(--cyan) */ }}>.OS</span> · HYPERION INDUSTRIES</span>
  <span>
    <a href="./">Home</a> &nbsp;·&nbsp;
    <a href="privacy.html">Privacy</a> &nbsp;·&nbsp;
    <a href="terms.html">Terms</a>
  </span>
</div>
<div className="wrap">
  <h1>Contact</h1>
  <p className="meta">Hyperion Industries · Public Preview · May 2026</p>

  <p>CHRON.OS is an indie project in early beta. Response times may vary, but we read everything.</p>

  <h2>Email</h2>
  <div className="contact-grid">
    <div className="contact-card">
      <div className="label">General</div>
      <div className="addr"><a href="mailto:hello@hyperion-industries.dev">hello@hyperion-industries.dev</a></div>
      <div className="desc">Questions, feedback, anything else. This is the main line.</div>
    </div>
    <div className="contact-card">
      <div className="label">Support</div>
      <div className="addr"><a href="mailto:support@hyperion-industries.dev">support@hyperion-industries.dev</a></div>
      <div className="desc">Bug reports, install issues, unexpected behavior. Include your Windows version and what happened.</div>
    </div>
  </div>

  <h2>GitHub</h2>
  <p>Bug reports, feature requests, and release notes live in the public preview repository.</p>
  <a className="gh-link" href="https://github.com/Code-Xer0/CHR0N.OS-Preview" target="_blank" rel="noopener">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
    Code-Xer0/CHR0N.OS-Preview
  </a>

  <h2>Response expectations</h2>
  <p>This is a solo / small-team project in active development. We aim to respond within a few days. For bugs, the more detail you include (OS version, what you did, what happened, any error messages), the faster we can help.</p>

  <div className="footer-note">
    <span>CHRON<span style={{ /* color:var(--cyan) */ }}>.OS</span> · <a href="https://hyperion-industries.dev">hyperion-industries.dev</a></span>
    <span><a href="./">Home</a> · <a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a></span>
  </div>
</div>

    </>
  );
}


import React from 'react';
import '../index.css';

export default function TermsPage() {
  return (
    <>
      
<div className="topbar">
  <span>CHRON<span style={{ /* color:var(--cyan) */ }}>.OS</span> · HYPERION INDUSTRIES</span>
  <span>
    <a href="./">Home</a> &nbsp;·&nbsp;
    <a href="privacy.html">Privacy</a> &nbsp;·&nbsp;
    <a href="contact.html">Contact</a>
  </span>
</div>
<div className="wrap">
  <h1>Terms of Use</h1>
  <p className="meta">Effective: May 2026 &nbsp;·&nbsp; CHRON.OS Public Preview &nbsp;·&nbsp; Hyperion Industries</p>

  <div className="warn-box">
    CHRON.OS is early beta software. It is provided for testing and personal use. It may have bugs, incomplete features, or unexpected behavior. Back up important files before use.
  </div>

  <h2>What CHRON.OS is</h2>
  <p>CHRON.OS is a local-first file organization tool in public preview. It is developed by Hyperion Industries and distributed as free software for personal use. This is a beta release — it is incomplete, and things may break.</p>

  <h2>No warranty</h2>
  <p>CHRON.OS is provided <strong>as-is</strong>, with no guarantees. Hyperion Industries makes no warranty that the software will work correctly, be error-free, or be fit for any particular purpose. You use it at your own risk.</p>

  <h2>Your responsibility</h2>
  <ul>
    <li><strong>Back up your files</strong> before using CHRON.OS on any folder you care about. Run it on test data first.</li>
    <li>CHRON.OS is designed not to modify original files — but no software is perfect, especially in beta. Treat this like any other early-access tool: assume things could go wrong.</li>
    <li>Windows may show a SmartScreen or Defender warning because the installer may be unsigned or not yet widely distributed. This is a Windows security mechanism. Review the source at the GitHub repo before installing if you are unsure.</li>
    <li>You are responsible for what you store, organize, and annotate using CHRON.OS.</li>
  </ul>

  <h2>Personal use</h2>
  <p>CHRON.OS is free for personal use during the public preview period. If you want to use it in an organizational or commercial context, or need deployment support, contact <a href="mailto:hello@hyperion-industries.dev">hello@hyperion-industries.dev</a>.</p>

  <h2>Open formats</h2>
  <p>CHRON.OS stores its metadata in open formats (JSON/SQLite) on your local device. You are not locked in. You can inspect, export, or delete this data at any time.</p>

  <h2>No account required</h2>
  <p>The local build requires no account, login, or internet connection. Optional cloud integrations, if and when added, will be explicitly opt-in.</p>

  <h2>Limitation of liability</h2>
  <p>To the maximum extent allowed by applicable law, Hyperion Industries is not liable for any damages — direct, indirect, incidental, or consequential — arising from your use of CHRON.OS. This includes data loss, system issues, or any other harm.</p>

  <h2>Changes</h2>
  <p>These terms may be updated as the product matures. The date at the top reflects the most recent revision. Continued use after changes means you accept the updated terms.</p>

  <h2>Contact</h2>
  <p>Questions: <a href="mailto:hello@hyperion-industries.dev">hello@hyperion-industries.dev</a></p>

  <div className="footer-note">
    <span>CHRON<span style={{ /* color:var(--cyan) */ }}>.OS</span> · <a href="https://hyperion-industries.dev">hyperion-industries.dev</a></span>
    <span><a href="./">Home</a> · <a href="privacy.html">Privacy</a> · <a href="contact.html">Contact</a></span>
  </div>
</div>

    </>
  );
}

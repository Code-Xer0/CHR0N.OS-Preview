
import '../index.css';

export default function PrivacyPage() {
  return (
    <>
      
<div className="topbar">
  <span>CHRON<span style={{ /* color:var(--cyan) */ }}>.OS</span> · HYPERION INDUSTRIES</span>
  <span>
    <a href="./">Home</a> &nbsp;·&nbsp;
    <a href="terms.html">Terms</a> &nbsp;·&nbsp;
    <a href="contact.html">Contact</a>
  </span>
</div>
<div className="wrap">
  <h1>Privacy</h1>
  <p className="meta">Effective: May 2026 &nbsp;·&nbsp; CHRON.OS Public Preview &nbsp;·&nbsp; Hyperion Industries</p>

  <h2>What this page is</h2>
  <p>This page covers the public preview site at <strong>hyperion-industries.dev</strong> and the CHRON.OS Windows preview build. It is written in plain language. If anything is unclear, email <a href="mailto:hello@hyperion-industries.dev">hello@hyperion-industries.dev</a>.</p>

  <h2>The public preview site</h2>
  <p>The CHRON.OS preview site is a public download and information page, hosted on GitHub Pages and served through Cloudflare. Standard web server logs (IP address, browser type, page requested) may be recorded by GitHub and Cloudflare under their own privacy policies. Hyperion Industries does not operate its own server-side analytics or tracking on this site.</p>

  <h2>The local Windows app</h2>
  <p>CHRON.OS is designed as a <strong>local-first</strong> file organization tool. That means:</p>
  <ul>
    <li>Your files stay on your device. The app does not upload your files or file contents to any remote server.</li>
    <li>Original files are not intentionally modified. CHRON.OS works with copies and metadata stored in a local database on your machine.</li>
    <li>No account is required to use the local build. No email, no login, no cloud account.</li>
    <li>Metadata, tags, and annotations you create are stored locally on your device in an open format.</li>
  </ul>

  <h2>Third-party services (optional)</h2>
  <p>Future versions of CHRON.OS may include optional integrations with cloud storage providers (e.g. Google Drive, OneDrive). These would be explicitly opt-in. Do not connect external services unless you have reviewed and accepted the terms of those providers. At the time of this writing, no third-party cloud integrations are active in the public preview.</p>

  <h2>Windows Defender / SmartScreen</h2>
  <p>Because CHRON.OS preview builds may be unsigned or not yet widely distributed, Windows may show a SmartScreen warning. This is a Windows security feature, not evidence that the software is harmful. You can view the source and release history at <a href="https://github.com/Code-Xer0/CHR0N.OS-Preview" target="_blank" rel="noopener">github.com/Code-Xer0/CHR0N.OS-Preview</a>.</p>

  <h2>Data you send us</h2>
  <p>If you email us at <a href="mailto:hello@hyperion-industries.dev">hello@hyperion-industries.dev</a>, we receive the contents of that email. We will use it only to respond to you. We do not share it with third parties.</p>

  <h2>Children</h2>
  <p>CHRON.OS is not directed at children under 13. We do not knowingly collect data from children.</p>

  <h2>Changes to this policy</h2>
  <p>This is an early beta product. This privacy notice may be updated as the product evolves. The effective date at the top will reflect the most recent revision.</p>

  <h2>Contact</h2>
  <p>Questions, concerns, or requests: <a href="mailto:hello@hyperion-industries.dev">hello@hyperion-industries.dev</a></p>

  <div className="footer-note">
    <span>CHRON<span style={{ /* color:var(--cyan) */ }}>.OS</span> · <a href="https://hyperion-industries.dev">hyperion-industries.dev</a></span>
    <span><a href="./">Home</a> · <a href="terms.html">Terms</a> · <a href="contact.html">Contact</a></span>
  </div>
</div>

    </>
  );
}

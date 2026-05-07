# Cloudflare Domain Setup — hyperion-industries.dev

Manual steps to connect `hyperion-industries.dev` to the CHRON.OS GitHub Pages preview site.

---

## Prerequisites

- Domain registered and nameservers pointed to Cloudflare (done at registrar)
- Access to the Cloudflare dashboard at dash.cloudflare.com
- Access to the GitHub repo: github.com/Code-Xer0/CHR0N.OS-Preview

---

## Step 1 — DNS Records (Cloudflare Dashboard)

Navigate to: **Cloudflare → hyperion-industries.dev → DNS → Records**

### A Records (apex domain → GitHub Pages)

Add all four. Set **Proxy status** to **DNS only (grey cloud)** initially — GitHub needs to see these for its HTTPS cert check.

| Type | Name | IPv4 Address | TTL |
|------|------|-------------|-----|
| A | @ | 185.199.108.153 | Auto |
| A | @ | 185.199.109.153 | Auto |
| A | @ | 185.199.110.153 | Auto |
| A | @ | 185.199.111.153 | Auto |

### CNAME (www subdomain → GitHub Pages)

| Type | Name | Target | TTL |
|------|------|--------|-----|
| CNAME | www | code-xer0.github.io | Auto |

### CNAME (chronos subdomain — for future use)

| Type | Name | Target | TTL |
|------|------|--------|-----|
| CNAME | chronos | code-xer0.github.io | Auto |

### CNAME (mnem subdomain — for future use)

| Type | Name | Target | TTL |
|------|------|--------|-----|
| CNAME | mnem | code-xer0.github.io | Auto |

> These subdomain CNAMEs can stay as DNS-only until the corresponding GitHub Pages or separate hosting is configured.

---

## Step 2 — SSL/TLS Settings (Cloudflare Dashboard)

Navigate to: **Cloudflare → hyperion-industries.dev → SSL/TLS**

| Setting | Value |
|---------|-------|
| Encryption mode | **Full** |
| Always Use HTTPS | **On** |
| Automatic HTTPS Rewrites | **On** |
| Minimum TLS version | 1.2 |

> Do **not** use "Flexible" — GitHub Pages serves HTTPS, so Full is correct.

---

## Step 3 — GitHub Pages Custom Domain

Navigate to: **github.com/Code-Xer0/CHR0N.OS-Preview → Settings → Pages**

1. Under **Custom domain**, enter: `hyperion-industries.dev`
2. Click **Save**
3. Wait for the DNS check (may take a few minutes to a few hours depending on propagation)
4. Once the DNS check passes and the green checkmark appears, enable **Enforce HTTPS**

> The CNAME file (`/CNAME`) has already been committed to the repo with the value `hyperion-industries.dev`. GitHub Pages reads this automatically.

---

## Step 4 — Email Routing (Cloudflare Dashboard)

Navigate to: **Cloudflare → hyperion-industries.dev → Email → Email Routing**

Enable Email Routing, then add forwarding rules:

| Alias | Forward to |
|-------|-----------|
| hello@hyperion-industries.dev | *(your Gmail address)* |
| support@hyperion-industries.dev | *(your Gmail address)* |
| founder@hyperion-industries.dev | *(your Gmail address)* |
| builds@hyperion-industries.dev | *(your Gmail address)* |

> Cloudflare Email Routing is free. It creates MX records automatically. Do not add your private Gmail address to any public file — manage it only in the Cloudflare dashboard.

---

## Step 5 — Verify DNS propagation (PowerShell)

Run from Windows terminal after DNS records are set:

```powershell
# Check apex A records
Resolve-DnsName hyperion-industries.dev

# Check www CNAME
Resolve-DnsName www.hyperion-industries.dev

# Check HTTP headers
curl.exe -I https://hyperion-industries.dev/
curl.exe -I https://hyperion-industries.dev/privacy.html

# Check GitHub repo info
& "C:\Program Files\GitHub CLI\gh.exe" repo view Code-Xer0/CHR0N.OS-Preview --json name,visibility,url
```

Expected: A records resolve to 185.199.108–111.153. `curl.exe -I` returns `HTTP/2 200`.

---

## Step 6 — Optional: www → apex redirect (Cloudflare Rules)

Navigate to: **Cloudflare → Rules → Redirect Rules → Create rule**

- Match: `www.hyperion-industries.dev/*`
- Redirect to: `https://hyperion-industries.dev/$1` (301 permanent)

---

## Subdomain plan (future)

| Subdomain | Intended use |
|-----------|-------------|
| chronos.hyperion-industries.dev | CHRON.OS product page or app |
| mnem.hyperion-industries.dev | Mnem product page or app |

---

## Checklist

- [ ] Cloudflare A records added (all four GitHub IPs)
- [ ] Cloudflare CNAME for www added
- [ ] SSL/TLS set to Full + Always HTTPS on
- [ ] GitHub Pages custom domain set to hyperion-industries.dev
- [ ] GitHub Pages DNS check passed (green checkmark)
- [ ] GitHub Pages Enforce HTTPS enabled
- [ ] Cloudflare Email Routing enabled and aliases configured
- [ ] https://hyperion-industries.dev/ loads correctly
- [ ] https://hyperion-industries.dev/privacy.html loads correctly
- [ ] https://hyperion-industries.dev/terms.html loads correctly
- [ ] https://hyperion-industries.dev/contact.html loads correctly

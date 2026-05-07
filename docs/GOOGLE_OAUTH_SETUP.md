# Google OAuth Consent Screen Setup

Reference for configuring a Google Cloud OAuth 2.0 application for CHRON.OS / Hyperion Industries.

---

## App Identity

| Field | Value |
|-------|-------|
| App name | CHRON.OS |
| User support email | hello@hyperion-industries.dev |
| App homepage URL | https://hyperion-industries.dev/ |
| Privacy Policy URL | https://hyperion-industries.dev/privacy.html |
| Terms of Service URL | https://hyperion-industries.dev/terms.html |
| Developer contact | hello@hyperion-industries.dev |

---

## Authorized Domains

Add these in the **Authorized domains** section of the OAuth consent screen:

```
hyperion-industries.dev
```

> Note: GitHub Pages (`code-xer0.github.io`) does not need to be listed here as an authorized domain — only your own domain does.

---

## Authorized JavaScript Origins

```
https://hyperion-industries.dev
https://www.hyperion-industries.dev
https://code-xer0.github.io
```

---

## Authorized Redirect URIs

```
https://hyperion-industries.dev/auth/callback
https://www.hyperion-industries.dev/auth/callback
https://code-xer0.github.io/CHR0N.OS-Preview/auth/callback
```

> Add only the redirect URIs that the application actually uses. Remove the GitHub Pages URI once the custom domain is fully live.

---

## Scopes (start minimal)

For initial submission and testing, request only:

| Scope | Description |
|-------|-------------|
| `openid` | Confirms the user signed in with Google |
| `email` | User's email address |
| `profile` | Basic profile info (name, picture) |

**Do not request** Gmail, Drive, Calendar, or other data scopes until you have a clear product reason. Additional scopes trigger Google's sensitive/restricted scope verification process, which requires a security assessment and can delay app publication significantly.

---

## OAuth Flow Notes

- Set **Application type**: Web application
- Set **Publishing status**: Testing (limits to 100 test users) while in beta. Switch to **In production** when ready for public use.
- If staying in Testing mode, add test user emails in the Google Cloud Console under the OAuth consent screen settings.

---

## Verification timeline (if needed)

If you expand to sensitive scopes later:

1. Fill out the OAuth consent screen completely (all URLs required).
2. Submit for verification — Google review typically takes 3–5 business days for basic scopes, weeks for sensitive scopes.
3. For restricted scopes (e.g. Drive file access), a third-party security assessment is required.

For personal/local tools that don't need cloud data access, the minimal `openid email profile` scope set avoids this process entirely.

---

## Where to configure

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create or select a project (e.g. "Hyperion Industries" or "CHRON.OS")
3. Navigate to **APIs & Services → OAuth consent screen**
4. Fill in the fields above
5. Navigate to **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**
6. Set type to **Web application**
7. Add the origins and redirect URIs above
8. Save and note the **Client ID** and **Client Secret** — store these securely, never in the repo

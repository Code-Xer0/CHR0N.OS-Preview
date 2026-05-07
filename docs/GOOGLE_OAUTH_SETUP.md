# Google OAuth Setup — CHRON.OS Desktop App

Domain: chr0nos.app (verified)
App type: Desktop application (Windows .exe, Electron or native)
Updated: May 2026

---

## Step 1 — Google Cloud Console: Project

1. Go to https://console.cloud.google.com
2. Top bar → project dropdown → **New Project**
   - Name: `CHRON.OS` (or `Hyperion Industries`)
   - Click **Create**
3. Make sure the new project is selected in the top bar

---

## Step 2 — OAuth Consent Screen

Navigate to: **APIs & Services → OAuth consent screen**

**User Type:** External → **Create**

Fill in:

| Field | Value |
|-------|-------|
| App name | CHRON.OS |
| User support email | hello@hyperion-industries.dev |
| App logo | (optional — upload chronos-icon.png if desired) |
| App homepage | https://chr0nos.app/ |
| Privacy policy | https://chr0nos.app/privacy.html |
| Terms of service | https://chr0nos.app/terms.html |
| Authorized domain | `chr0nos.app` |
| Developer contact | hello@hyperion-industries.dev |

Click **Save and Continue**

**Scopes page:** Click **Add or remove scopes** → add only:
- `.../auth/userinfo.email`
- `.../auth/userinfo.profile`
- `openid`

Click **Update** → **Save and Continue**

**Test users:** Add your own Gmail address for testing while in development.

Click **Save and Continue** → **Back to Dashboard**

---

## Step 3 — Create OAuth 2.0 Credentials

Navigate to: **APIs & Services → Credentials → + Create Credentials → OAuth client ID**

**Application type: Desktop app**

| Field | Value |
|-------|-------|
| Name | `CHRON.OS Desktop` |

Click **Create**

Google will show you:
- **Client ID** — looks like `123456789-abc...apps.googleusercontent.com`
- **Client Secret** — looks like `GOCSPX-...`

**Download the JSON** (the download button on the confirmation dialog). Save it as `google-oauth-credentials.json`.

> ⚠️ Never commit this file to any repo. Add it to .gitignore.

---

## Step 4 — What Codex needs

Pass these values to the CHRON.OS app:

```
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
GOOGLE_REDIRECT_URI=http://127.0.0.1
```

**Redirect URI for desktop apps:**
Google recommends the loopback IP for desktop apps:
```
http://127.0.0.1
```
The app should spin up a local HTTP listener on a random available port,
then pass `http://127.0.0.1:<port>` as the redirect_uri at runtime.

You do NOT need to register specific ports in the console for loopback —
Google allows any port on 127.0.0.1 for Desktop app type credentials.

---

## Step 5 — OAuth Flow (how it works in the app)

1. User clicks "Sign in with Google" in CHRON.OS
2. App picks a free local port (e.g. 54321)
3. App opens browser to:
   ```
   https://accounts.google.com/o/oauth2/v2/auth
     ?client_id=YOUR_CLIENT_ID
     &redirect_uri=http://127.0.0.1:54321
     &response_type=code
     &scope=openid%20email%20profile
     &access_type=offline
   ```
4. User signs in and approves
5. Google redirects to `http://127.0.0.1:54321?code=AUTH_CODE`
6. App catches the code, exchanges it for tokens via POST to
   `https://oauth2.googleapis.com/token`
7. App receives `access_token` + `refresh_token`
8. Store `refresh_token` securely (Windows Credential Manager / keychain)

---

## Step 6 — Publishing (when ready for public users)

While in **Testing** mode: only the test users you added in Step 2 can sign in.

When ready for anyone to sign in:
- **OAuth consent screen → Publishing status → Publish app**
- Google will ask you to confirm your scopes
- For `openid email profile` only — no sensitive scopes — this is instant, no review required
- For Drive/Gmail scopes — Google requires a security review (weeks)

---

## Codex handoff — implementation notes

```
Auth type:       OAuth 2.0 Authorization Code flow (PKCE recommended)
App type:        Desktop (loopback redirect)
Scopes now:      openid email profile
Scopes later:    drive.file (for optional Drive sync — requires verification)
Token storage:   Windows Credential Manager (not plaintext config file)
Refresh:         Use refresh_token to get new access_token silently
Revocation:      Provide a "Disconnect Google account" option in Settings

Credential files (NEVER commit):
  google-oauth-credentials.json   ← downloaded from Cloud Console
  .env with GOOGLE_CLIENT_ID etc  ← local dev only

Add to .gitignore:
  google-oauth-credentials.json
  *.env
  .env.local
```

---

## Checklist

- [ ] Google Cloud project created
- [ ] OAuth consent screen filled in with chr0nos.app URLs
- [ ] chr0nos.app added as authorized domain
- [ ] Scopes: openid + email + profile only
- [ ] Credentials: Desktop app type created
- [ ] Client ID + Secret downloaded as JSON
- [ ] Credentials passed to Codex securely (not via repo)
- [ ] Test sign-in working with test Gmail account
- [ ] "Disconnect" / revoke option exists in app Settings
- [ ] App published when ready for external users

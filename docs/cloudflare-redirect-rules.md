; Cloudflare redirect rules require browser setup, but the CNAME is already staged.
; This file is for reference only — the redirect rule must be created in the Cloudflare dashboard.
;
; Rule: chronos.hyperion-industries.dev → https://hyperion-industries.dev (301)
;
; Steps:
;   Cloudflare → hyperion-industries.dev → Rules → Redirect Rules → Create rule
;   Match: hostname equals chronos.hyperion-industries.dev
;   Then: Static redirect to https://hyperion-industries.dev — 301 (Permanent)

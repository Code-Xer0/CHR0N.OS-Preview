# CHRON.OS Public Beta

CHRON.OS is a public beta for local-first archival intelligence. The public build helps users capture files into a working archive, preserve provenance, inspect context, search and sort archive state, and review aging signals without making the cloud the source of truth.

## What Users Can Do Today

- install CHRON.OS on Windows through the setup EXE, MSI, or portable ZIP
- copy selected files into a working archive without mutating originals
- preserve source paths, timestamps, hashes, and sidecar metadata
- inspect documents, images, video previews, archive metrics, and file context
- sort and review files by chronology, duplicate posture, recent activity, and relationship surfaces
- use synthetic demo screens on the public site without exposing private archive content
- keep cloud and external provider surfaces gated until intentionally configured

## Safe Workflow

CHRON.OS begins non-destructively. It copies and indexes before it mutates. Delete, move, retention, and automation flows should be gated by explicit policy or operator approval.

Recommended first run:

1. Use a test folder or non-critical data.
2. Import a small set of files.
3. Confirm source paths, previews, hashes, and metadata.
4. Review duplicates, chronology, and archive telemetry.
5. Expand into larger project folders only after the workflow feels clear.

## Public Beta Boundary

The public build is a real beta lane, not a placeholder artifact. It is also not the entire internal CHRON.OS stack.

Public beta focus:

- file capture
- provenance
- search and context
- archive telemetry
- aging signals
- safe archive workflows

Staged or internal:

- advanced automation
- production OAuth and provider verification
- full cloud/NAS polish
- full multimodal inference
- policy dispatch and retention workflows
- Hyperion interop lanes beyond the archive layer

## Distribution

Downloads are published through GitHub Releases. The one-click Windows installer is recommended for most users. The MSI is available as an installer artifact. The portable ZIP is available for advanced testing and no-install evaluation. SHA-256 checksum files are published alongside each package.

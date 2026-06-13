# CHRON.OS Public Beta

CHRON.OS is a local-first archival intelligence public beta for Windows. It helps people and teams copy important files into a working archive, preserve provenance, inspect context, search and sort by lifecycle signals, and begin assigning meaning without mutating original source files.

This repository is the public download, documentation, and portfolio surface. It intentionally does not contain the full CHRON.OS source tree or the full internal Hyperion stack.

## Download

Current public beta: [v0.2.2-beta.1](https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/tag/v0.2.2-beta.1)

Recommended for most Windows users:

- [One-click Windows installer](https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.2-beta.1/CHRON.OS-v0.2.2-beta.1-windows-setup.exe)
- [Installer SHA-256](https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.2-beta.1/CHRON.OS-v0.2.2-beta.1-windows-setup.exe.sha256.txt)

Optional package/installer artifact:

- [MSI package](https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.2-beta.1/CHRON.OS-v0.2.2-beta.1-windows.msi)
- [MSI SHA-256](https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.2-beta.1/CHRON.OS-v0.2.2-beta.1-windows.msi.sha256.txt)

Portable/no-install option for advanced testing:

- [Portable Windows ZIP](https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.2-beta.1/CHRON.OS-v0.2.2-beta.1-portable-windows.zip)
- [Portable ZIP SHA-256](https://github.com/Code-Xer0/CHR0N.OS-Preview/releases/download/v0.2.2-beta.1/CHRON.OS-v0.2.2-beta.1-portable-windows.zip.sha256.txt)

## Public Beta Status

CHRON.OS is in public beta. The public build focuses on local-first archival intelligence: file capture, provenance, search, context, aging signals, and safe archive workflows. Advanced automation, interop, cloud/NAS polish, full multimodal inference, and production OAuth remain staged or internal.

Use test or non-critical data first. The product is real, but it is not yet positioned as enterprise production-ready infrastructure.

## What Works Now

The public beta includes:

- local archive intake
- provenance-preserving copy workflows
- archive telemetry and aging/status signals
- file and context inspection
- chronological sorting and recent-import views
- search-oriented organization
- duplicate detection and review surfaces
- safe non-mutating source behavior
- installer, MSI, portable ZIP, and checksum distribution lanes

## Safety Model

CHRON.OS begins non-destructively. It copies and indexes before it mutates. Delete, move, retention, and automation flows should be gated by explicit policy or operator approval.

Original source files should remain untouched by default. Cloud tools and external providers are optional, staged surfaces rather than the canonical archive.

## Who It Is For

For individuals: recover messy downloads, old documents, scattered project files, and forgotten archives.

For teams: preserve provenance, review aging files, standardize archive rules, and prepare policy-based retention workflows.

For organizations: CHRON.OS can become the archive layer inside a broader local-first Hyperion deployment.

## Public Docs

- [Public beta guide](docs/PUBLIC_BETA.md)
- [Internal roadmap boundary](docs/INTERNAL_ROADMAP.md)
- [Video plan and scripts](docs/VIDEO_PLAN.md)
- [Changelog](CHANGELOG.md)
- [Security and privacy](SECURITY.md)

## Known Areas Still In Progress

- updater pipeline polish
- code signing
- NAS and cloud connector polish
- full multimodal inference
- Atlas performance optimization
- production OAuth setup
- interop lanes beyond the public archival intelligence build

## Source Access

The public beta is distributed as an installer-first preview lane, with a portable ZIP available for no-install testing. Source access, internal doctrine, and active development work remain separate from this public distribution lane.

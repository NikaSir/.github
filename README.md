# NikaSir · GitHub defaults

This repository contains the default community health and engineering-standard files used across public repositories owned by `NikaSir`.

## Purpose

The goal is to keep contribution, support, security, issue, pull-request, repository and shared UI rules consistent across the project ecosystem while allowing individual repositories to override a default when they need project-specific behavior.

## Defaults and shared standards provided

- `CONTRIBUTING.md` — contribution and change-control rules.
- `SECURITY.md` — responsible vulnerability reporting.
- `SUPPORT.md` — support and diagnostic expectations.
- `CODE_OF_CONDUCT.md` — collaboration standards.
- `GOVERNANCE.md` — decision-making model.
- `PULL_REQUEST_TEMPLATE.md` — pull-request checklist.
- `.github/ISSUE_TEMPLATE/` — structured bug and feature request forms.
- `REPOSITORY_STANDARD.md` — common repository structure and release expectations.
- `SPECIALIZED_PANEL_UI_STANDARD.md` — mandatory mobile-first navigation/application-shell contract for integration-owned Home Assistant panels.
- `NIKAS_INTEGRATION_PANEL_TEMPLATE.md` — mandatory common shell, visual primitives, geometry and information-presentation template for specialized panels.
- `SPECIALIZED_PANEL_FRONTEND_RELEASE_STANDARD.md` — mandatory self-contained production-bundle and cold-load reliability contract for specialized Home Assistant panels.
- `reference/integration-panel-template/` — development-time reference implementation of the shared panel shell and primitives; it is copied/vendored into integration source and must never be a cross-repository runtime dependency.

## Repository-specific overrides

A project repository may provide its own file or issue-template directory when its requirements differ from these defaults. Repository-specific rules take precedence only where the shared contract explicitly permits variation.

## Engineering principles

1. Reproducible changes over manual edits.
2. Small, reviewable commits and pull requests.
3. No credentials, tokens, private keys, device secrets, or personal data in source control.
4. Releases are traceable to source commits and versioned artifacts.
5. Automation must fail visibly rather than silently accepting invalid state.
6. Integration-owned Home Assistant panels use the shared NikaS specialized-panel application shell and `NikaS Integration Panel Template` unless explicitly exempted by architecture decision.
7. Every specialized production panel loads from one self-contained project-owned JavaScript bundle; previous UI versions are never runtime dependencies.
8. Shared reference frontend code is a development-time source/reference only; each integration ships an autonomous production bundle.

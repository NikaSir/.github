# NikaSir · GitHub defaults

This repository contains the default community health files used across public repositories owned by `NikaSir`.

## Purpose

The goal is to keep contribution, support, security, issue, and pull-request rules consistent across the project ecosystem while allowing individual repositories to override a default when they need project-specific behavior.

## Defaults provided

- `CONTRIBUTING.md` — contribution and change-control rules.
- `SECURITY.md` — responsible vulnerability reporting.
- `SUPPORT.md` — support and diagnostic expectations.
- `CODE_OF_CONDUCT.md` — collaboration standards.
- `GOVERNANCE.md` — decision-making model.
- `PULL_REQUEST_TEMPLATE.md` — pull-request checklist.
- `.github/ISSUE_TEMPLATE/` — structured bug and feature request forms.

## Repository-specific overrides

A project repository may provide its own file or issue-template directory when its requirements differ from these defaults. Repository-specific rules take precedence.

## Engineering principles

1. Reproducible changes over manual edits.
2. Small, reviewable commits and pull requests.
3. No credentials, tokens, private keys, device secrets, or personal data in source control.
4. Releases are traceable to source commits and versioned artifacts.
5. Automation must fail visibly rather than silently accepting invalid state.

# Repository standard

This document defines the default repository settings for the NikaSir project ecosystem. Repository-specific exceptions must be documented explicitly.

## Default branch

- Branch: `main`.
- Direct functional development on `main` is discouraged; use short-lived branches and pull requests.

## Merge policy

Recommended repository settings:

- Enable **Squash merging**.
- Disable ordinary merge commits unless a project has a documented reason to keep them.
- Rebase merging may remain disabled for a simpler, single-history policy.
- Automatically delete head branches after merge.

The squash commit title should describe the delivered change, not the internal iteration history.

## Main branch protection / ruleset

Apply a ruleset targeting `main` with the following baseline:

1. Require a pull request before merging.
2. Require repository status checks to pass before merging.
3. Require conversation resolution before merging.
4. Block force pushes.
5. Block branch deletion.
6. Do not require signed commits until a signing workflow is deliberately adopted.
7. Do not require a fixed approval count for a single-maintainer repository unless an additional reviewer is actually part of the project.

When the bootstrap workflow is present, use its `validate` job as a required status check. When Hassfest/HACS/test jobs are added, promote them to required checks only after they have proved stable.

## Security

- Never commit credentials, tokens, local/device keys, private keys, production `.env` files, passwords, subscription URLs, or private diagnostics.
- Store secrets outside the repository and inject them at runtime using the platform-appropriate secret mechanism.
- Example configuration must use unmistakable placeholders.
- Security reports follow the shared `SECURITY.md` policy.

## Automation

Every maintained project repository should have:

- `.github/CODEOWNERS`
- `.github/workflows/repository-checks.yml`
- `.github/dependabot.yml`
- `CHANGELOG.md`
- `.editorconfig`
- `.gitignore`
- `docs/RELEASES.md`

Home Assistant repositories add HACS/Hassfest/release validation only when the real `custom_components/<domain>/` implementation is present.

## Releases

- Tags are immutable once published.
- A release is made from committed, reviewed source.
- Existing project version lineage is preserved during GitHub migration.
- A migration/bootstrap commit is not itself a functional product release.

## License

A repository must receive an explicit license decision before its first public functional release. Do not infer or silently change a project's license from repository visibility alone.

# Repository standard

This document defines the default repository settings for the NikaSir project ecosystem. Repository-specific exceptions must be documented explicitly.

## Default branch

- Branch: `main`.
- Direct functional development on `main` is discouraged; use short-lived branches and pull requests.

## Merge policy

Recommended repository settings:

- Enable **Squash merging**.
- Disable ordinary merge commits unless a project has a documented reason to keep them.
- Disable rebase merging for the common squash-only profile.
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

Give every required job a unique name across workflows, such as
`repository-checks`, `hacs`, `hassfest` and `nikas-strict-compliance`. Preserve
existing required checks during migration. Rename jobs and update required
contexts together so no old name is left waiting indefinitely.

A result for one generic `validate` context must not stand for several
independent workflows. If using an aggregate gate, run it after failed or
skipped dependencies and explicitly require every mandatory result to be
`success`. Cross-workflow jobs need separate required contexts or another
verified aggregation mechanism. Check path filters before making a job required.

The [NikaS Repository Contract](NIKAS_REPOSITORY_CONTRACT.md) distinguishes
profile validity from strict product compliance. During adoption, strict
inspection reports actual failures and unverified requirements. It becomes
required for a consumer once those applicable gaps are closed and its trigger
and job name have been verified. This does not waive a standard or remove an
existing check. A document in this defaults repository does not automatically
configure another repository's branch protection.

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

An existing workflow with an equivalent role may keep its filename (for example,
`validate.yml` or `standards-checks.yml`). Preserve its required check names;
do not create a duplicate workflow only to match the example path above.

Home Assistant repositories add HACS, Hassfest and artifact validation only when the real `custom_components/<domain>/` implementation is present.

## Publication

- Reviewed branches, pull requests and `main` remain the source of accepted code.
- The default main-only workflow creates neither GitHub Releases nor automatic release tags. It applies only where the project's documented delivery channel supports that model.
- **HACS exception:** repositories whose HACS delivery depends on release versions follow the [NikaS HACS Publication Contract](docs/NIKAS_HACS_PUBLICATION_CONTRACT.md). Matching Releases/tags are permitted and required for that channel. A merge alone does not prove that a version was delivered.
- Each integration records its actual channel, release automation and any beta/stable acceptance process in `docs/RELEASES.md`. An approved transition is recorded separately from automation already implemented and delivery verified on the target installation.
- Existing published Releases/tags and the previous stable version remain available for traceability and rollback.
- Built/versioned artifacts remain traceable to their source commit and are validated before merge.
- Existing project version lineage is preserved during GitHub migration.
- A migration/bootstrap commit is not itself a functional product publication.

## License

A repository must receive an explicit license decision before its first public functional publication. Do not infer or silently change a project's license from repository visibility alone.

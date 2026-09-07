# Contributing

Thank you for contributing.

## Change process

1. Describe the problem or requested capability in an issue when the change is non-trivial.
2. Keep each pull request focused on one logical change.
3. Base changes on the repository's default branch unless the repository documents a different workflow.
4. Update documentation and changelog information when behavior, configuration, entities, APIs, or installation steps change.
5. Run the repository's validation and tests before requesting review.
6. Identify the production artifact actually registered by the integration and
   record the inspected revision, version/cache bindings and applicable
   [NikaS Repository Contract](NIKAS_REPOSITORY_CONTRACT.md) results.
7. Distinguish profile validity, automated product checks and HA/iPhone
   acceptance. A missing or stale result is unverified; a listed test or source
   keyword alone is not behavioural evidence.

## Engineering requirements

- Do not commit passwords, API tokens, cookies, private keys, device local keys, recovery codes, personal data, or other secrets.
- Prefer reproducible configuration and source-controlled automation over undocumented manual changes.
- Preserve backward compatibility unless a breaking change is intentional and documented.
- Treat `unknown`, `unavailable`, timeout, and stale data as explicit states when they affect system behavior.
- Avoid silent failure. Errors that affect correctness or safety should be observable.
- Keep dependencies minimal and justified.
- Preserve source, accepted-sample time and quality with operational values;
  missing data cannot become zero, false, healthy status or command confirmation.
- Test reconnect after cancelled requests, timers and animation frames. Keep
  existing UI nodes stable during telemetry updates.
- Preserve the existing mandatory CI checks and approved product layout when
  adopting shared tooling. Record remaining gaps explicitly.

## Commits

Use concise imperative commit messages. Conventional prefixes such as `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `ci:`, and `chore:` are preferred.

## Pull requests

A pull request should explain:

- what changed;
- why the change is needed;
- how it was tested;
- compatibility or migration impact;
- any known limitations.

Repository-specific contributing rules override this default document.

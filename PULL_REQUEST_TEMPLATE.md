## Summary

Describe the change and the problem it solves.

## Validation

Explain how the change was tested and include relevant environment details.

For integration/panel or delivery changes, identify the actual registered
production entrypoint, integration/UI/cache versions and checked source revision.
State separately: profile validity, strict compliance, and any HA/iPhone
acceptance. List failed or unverified applicable requirements and their tracking
items; do not describe a tooling-only pass as product readiness.

## Compatibility and migration

Describe any breaking changes, migration steps, configuration changes, or compatibility impact. Write `None` when not applicable.

## Checklist

- [ ] The change is limited to one logical scope.
- [ ] Documentation was updated where behavior or configuration changed.
- [ ] Tests or validation were run where applicable.
- [ ] No credentials, tokens, keys, recovery codes, personal data, or other secrets are included.
- [ ] Error, `unknown`, `unavailable`, timeout, and stale-data behavior was considered where relevant.
- [ ] Breaking changes are explicitly documented.
- [ ] Validation covers the artifact Home Assistant actually loads.
- [ ] Missing/stale data and unconfirmed commands remain distinguishable from valid zero/off/success.
- [ ] Applicable reconnect and stable-DOM scenarios were checked, or are explicitly recorded as unverified.
- [ ] Existing required checks and main/HACS publication policy are preserved.

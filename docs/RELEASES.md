# Standards publication policy

This repository publishes shared contribution defaults and reviewed mirrors of
NikaS contracts. Its publication record is the protected `main` branch and merged
pull requests. It does not produce an installable Home Assistant integration or
publish GitHub Releases or automatic release tags.

Before merging, the required `validate` job checks the UI-standard mirror and
the revision-pinned repository contract. A mirror update must identify its
reviewed canonical commit and update its digest together with the document.
Adding a standard here does not configure another repository's GitHub settings
or certify its runtime behavior.

The [repository standard](../REPOSITORY_STANDARD.md) defines the default profile.
The [HACS publication contract](NIKAS_HACS_PUBLICATION_CONTRACT.md) applies to
consumer integrations with a release-driven update channel. Their Releases,
beta/stable decisions and user acceptance belong to those projects; this
repository's own main-only policy does not prohibit them.

Changes are recorded in [CHANGELOG.md](../CHANGELOG.md). Rollback uses a reviewed
revert; published history and historical tags remain intact.

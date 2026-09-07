#!/usr/bin/env python3
"""Check the reviewed local mirror identity and content digest."""

import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
metadata = json.loads((ROOT / ".nikas-repository-contract-source.json").read_text())
assert metadata["contract_version"] == "1.0", "Unexpected repository contract version"
assert metadata["canonical_repository"] == "NikaSir/ha-contract-generated-ui"
assert metadata["canonical_path"] == "docs/NIKAS_REPOSITORY_CONTRACT.md"
assert re.fullmatch(r"[0-9a-f]{40}", metadata["canonical_revision"]), "Pin the reviewed canonical revision"
assert metadata["local_path"] == "NIKAS_REPOSITORY_CONTRACT.md"
document = (ROOT / metadata["local_path"]).read_bytes()
assert hashlib.sha256(document).hexdigest() == metadata["sha256"], "Repository contract mirror digest mismatch"
assert document.startswith(b"# NikaS Repository Contract v1.0\n")
print("Repository Contract v1.0 mirror matches its reviewed, revision-pinned digest.")

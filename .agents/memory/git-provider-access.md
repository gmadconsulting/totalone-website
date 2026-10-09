---
name: Git provider access
description: Distinguish GitHub authorization from operational access in the workspace.
---

Git transport authentication and GitHub CLI/API authentication can differ. A GitHub CLI authentication failure does not establish that Git fetch or push is unavailable.

**Why:** The connection reported itself active and already attached, but GitHub CLI requests lacked authentication and the generic connector API exposed no usable credentials. A later read-only Git request to a user-specified repository succeeded.

**How to apply:** When the user provides a repository URL, test Git access directly with a noninteractive read-only request instead of treating GitHub CLI status as decisive. Repository creation and visibility changes still require working provider API access. Do not extract tokens or repeatedly request OAuth to compensate for unavailable session access.

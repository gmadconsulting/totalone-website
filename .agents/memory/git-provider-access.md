---
name: Git provider access
description: Distinguish GitHub authorization from operational access in the workspace.
---

Git transport access, GitHub CLI authentication, and the integration's authorization status are separate checks. A successful read from a public repository is not evidence of authenticated write access.

**Why:** The integration reported itself active, while GitHub CLI requests lacked authentication. Reading a public repository succeeded anonymously, but pushing to it was rejected for invalid credentials.

**How to apply:** Use noninteractive Git reads to inspect a user-provided target, without treating success as proof a push will work. On an actual credential rejection, use the integration's authorization-recovery flow. Repository creation and visibility changes require working provider API access. Never extract tokens to compensate for unavailable session access.

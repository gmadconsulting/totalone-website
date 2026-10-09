---
name: Git provider access
description: Distinguish GitHub authorization from operational access in the workspace.
---

An active Git provider connection is not sufficient evidence that this session can create repositories or push code.

**Why:** The connection reported itself active and already attached, but actual GitHub CLI requests lacked authentication and the connector API exposed no usable connection credentials.

**How to apply:** Confirm operational access with a read-only request before promising repository creation or a push. Do not extract tokens or repeatedly request OAuth to compensate for unavailable session access. If supported access remains unavailable, explain the limitation and direct the user to the Git pane.

---
name: feedback_scoping
description: How to scope changes efficiently — read minimally, confirm before rewriting, surgical edits over full rewrites
metadata:
  type: feedback
---

Read only the files directly needed for the stated request. Don't bulk-read the whole codebase upfront.

**Why:** Reading 10+ files before changes are confirmed burns a large portion of the session context budget unnecessarily.

**How to apply:** For each sub-task, identify the 1-2 files needed, read those, make the change, then move to the next.

---

For vague design requests ("make it less X"), ask a clarifying question before touching components. Confirm scope before rewriting anything.

**Why:** The Experience.tsx rewrite + revert was pure waste — a one-question confirm ("should I touch the Experience cards too?") would have prevented it.

**How to apply:** State what you plan to change and ask for a thumbs-up before writing. Especially for components not explicitly named.

---

Prefer surgical Edit calls over full Write rewrites when changing existing components.

**Why:** Full rewrites cost significantly more tokens than targeted edits and are harder to review.

**How to apply:** Only use Write for new files or when >70% of the file is changing. Otherwise use Edit with precise old_string/new_string.

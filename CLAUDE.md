## Delegating to Glimmer (local model)
- For well-scoped coding tasks, delegate to the local model by running: glimmer "<clear, specific task with file names>"
- Use a 10-minute timeout; the local model is slow.
- After each delegation: review `git diff`, run tests, and either accept, send Glimmer a specific fix request, or fix small issues yourself.
- Keep planning, architecture decisions, and final review for yourself.
- If the glimmer command fails or hangs (e.g., LM Studio server isn't running), stop and tell the user instead of retrying.

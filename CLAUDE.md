## Delegating to Glimmer (local model)
- For well-scoped coding tasks, delegate to the local model by running: glimmer "<clear, specific task with file names>"
- Run glimmer as a background task (it can take 10+ minutes) and check on it periodically instead of waiting on a timeout.
- After each delegation: review `git diff`, run tests, and either accept, send Glimmer a specific fix request, or fix small issues yourself.
- Keep planning, architecture decisions, and final review for yourself.
- If the glimmer command fails or hangs (e.g., LM Studio server isn't running), stop and tell the user instead of retrying.

# iP Bot Development Rules

1. Build in small milestones.
2. Run a smoke test after every meaningful UI or logic change.
3. Fix regressions before starting the next dependent feature.
4. Keep local/demo mode runnable without external credentials.
5. Never commit API keys, OAuth secrets or passwords.
6. Keep business-room logic modular and reusable.
7. Keep consequential external actions behind explicit permissions and approval gates.
8. Verify mobile layout as well as desktop layout.
9. Record known issues rather than silently carrying them forward.
10. Do not call a feature production-ready until its critical flow has been executed and checked.

## Update format
Each development update should state:
- what changed
- what was tested
- known issues
- what is next
- whether the user needs to take an action

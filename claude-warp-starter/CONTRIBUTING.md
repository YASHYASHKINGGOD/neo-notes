# CONTRIBUTING.md
## Definition of Done
1) Code formatted & linted
2) Types clean
3) Tests updated & passing
4) Docs updated (README / CLAUDE.md / planning / tasks)
5) Commit uses Conventional Commits
6) Demo-able via `make start` or verifiable via tests

## PR Checklist (even if solo)
- [ ] Scope limited; one concern per PR
- [ ] Added/updated tests
- [ ] Docs updated
- [ ] Manual smoke test steps included
- [ ] No secrets in diff; `.env.example` updated if needed

## Testing policy
- Unit for logic; integration for boundaries; e2e optional
- Deterministic seeds; avoid network in unit tests
- Target coverage ~80% when practical

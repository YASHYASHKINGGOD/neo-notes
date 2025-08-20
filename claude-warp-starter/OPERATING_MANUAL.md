# Operating Manual (Manager + Two AI Interns)

This repo is structured so both **Claude Code** and **Warp.dev** follow the same rules and you can reproduce every change. 
Use **SESSION_TEMPLATE.md** for each work session, keep `tasks.md` current, and enforce `make check` before commits.

## Files of interest
- `CLAUDE.md` — project memory & rules (the first thing Claude reads)
- `DESIGN.md` — high-level goals, non-goals, architecture
- `planning.md` — per-milestone approach, components, test plan
- `tasks.md` — living backlog with acceptance criteria
- `SESSION_TEMPLATE.md` — log for each session; copy it into `sessions/SESSION-YYYY-MM-DD.md`
- `CONTRIBUTING.md` — standards, Definition of Done, PR checklist
- `Makefile` — canonical commands (`setup`, `dev`, `start`, `fmt`, `lint`, `typecheck`, `test`, `check`)
- `bin/*.sh` — versioning helpers: save tag, fork tag to branch, run a tagged version
- `.pre-commit-config.yaml` — auto formatting/linting gate
- `.tool-versions` / `.nvmrc` — pin runtimes
- `.env.example` — sample environment (no secrets)

## Required daily loop
1. Start: Claude reads `CLAUDE.md`, `DESIGN.md`, `planning.md`, `tasks.md`, `README.md`; restates next task.
2. Implement: small commits; tests updated; `make check` is green.
3. Handover: update `tasks.md` and append “Session YYYY-MM-DD” note to `CLAUDE.md` and save `sessions/SESSION-YYYY-MM-DD.md`.
4. Warp verifies: `make setup && make check && make start`; log exact repro if anything fails.

## Independence tests (both interns)
- Can **Warp** run `make setup && make start` without manual chat steps?
- Can **Claude** continue after reading repo docs *only*?
- Are there scripts for every command you ran?

For the background methodology, see your PDF “AI‑Assisted Development with Claude and Warp: Comprehensive Guide”. 

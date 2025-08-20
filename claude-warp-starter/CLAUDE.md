# Project memory & rules (for Claude + Warp)
## Goals
- One-command bootstrap & test on any machine.
- All features start with a small design and acceptance criteria.
- Every code change includes tests and docs updates.

## Code standards
- Languages: <list>
- Runtimes: see `.tool-versions` / `.nvmrc`
- Style: Prettier/ESLint (JS), Black/Ruff (Py); types via `tsc`/`mypy`/`pyright`
- Branches: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`)

## Commands (preferred)
- Bootstrap: `make setup`
- Dev: `make dev`
- Run: `make start`
- Format: `make fmt` | Lint: `make lint` | Types: `make typecheck`
- Tests: `make test`
- Gate: `make check`

## Design & tasks
- High-level in `DESIGN.md`
- Implementation plan in `planning.md`
- Living checklist in `tasks.md` with acceptance criteria and owner

## Session protocol (Claude)
1) Read: CLAUDE.md, DESIGN.md, planning.md, tasks.md, README.md
2) Restate next task and plan micro-steps
3) Implement, update tests, run `make check`
4) Commit with Conventional Commit
5) Update tasks.md and append daily note in CLAUDE.md and create a session log file

## Environment
- `.env.example` is enough to boot a dev instance (no real secrets).
- Seed data/migrations documented in README.

## Do not
- Rely on prior chat memory.
- Add hidden manual steps; every step must be a script/Make target.

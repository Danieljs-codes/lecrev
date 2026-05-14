# AGENTS.md

## Vendored Repositories

This project vendors external repositories under @.references/

- Use vendored repositories as read-only reference material when working with related libraries
- Prefer examples and patterns from the vendored source code over generated guesses or web search results
- Do not edit files under @.references/ unless explicitly asked
- Do not import from @.references/ - application code should continue importing from normal package dependencies

## Task Completion Requirements

- Use Effect Vitest for tests.
- Run targeted tests with `vitest run ...` when working on a scoped area.
- For code changes, run the narrowest useful verification before handing back.

## Attribution

Do not add any AI assistant, Claude, Anthropic, or Co-Authored-By
attribution/trailers to commits, commit messages, PRs, or generated files.

Pull request titles and descriptions are going to a public GitHub repo, so
avoid using specific names or internal info unless explicitly stated to.

## Engineering Priorities

- Prefer correctness and predictable behavior over short-term convenience.
- Preserve runtime behavior when changing lint, typing, or test structure.
- Keep package boundaries clear; use public package exports instead of relative
  imports across package roots.
- Extract shared logic only when the shared behavior is real and local patterns
  support it. Avoid broad generic abstractions for one-off duplication.

Please make note of mistakes you make in `MISTAKES.md`. If you find you wish you had more context or tools, write that down in `DESIRES.md`. If you learn anything about your env write that down in `LEARNINGS.md`.

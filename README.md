# ableton-dev

Starter repository for an AI-assisted Ableton development workspace.

## Purpose

This repo is designed to support:
- Max for Live device development
- Ableton Live API exploration
- Control Surface / remote script notes
- AI-assisted coding workflows
- Small utilities, examples, and prompts

## What belongs here

Commit:
- Your own notes and distilled cheatsheets
- AI prompts and coding instructions
- Example patches/scripts/code
- Helper scripts and tests
- A curated index of official documentation

Do **not** commit:
- Full copies of the Ableton Live manual
- Large vendor documentation mirrors
- Third-party SDK binaries unless the license clearly allows it
- Random tutorial dumps

## Suggested local companion material

Keep these available locally for fast indexing by your coding tools, but outside the repo if needed:
- Live API Overview
- Live Object Model (LOM)
- Ableton maxdevtools
- Link / ALSExportKit only when actively implementing those features

## Repo structure

```text
docs/        curated notes and official doc indexes
prompts/     AI assistant instructions
reference/   placeholders and notes about local non-repo references
examples/    minimal example code or patches
scripts/     helper scripts and maintenance notes
```

## First tasks

1. Add your own distilled notes to `docs/live-api-cheatsheet.md`
2. Put official links in `docs/official-links.md`
3. Tune `prompts/ableton-dev-assistant.md`
4. Add one minimal Max for Live example or script to `examples/`

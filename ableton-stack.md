# Ableton development stack

## Core surfaces

### 1. Max for Live
Use this for:
- custom MIDI devices
- audio effects
- instruments
- Live API interaction from Max / JavaScript / Node for Max

Key references:
- Live API Overview
- Live Object Model (LOM)
- maxdevtools

### 2. Control Surface / remote scripts
Use this for:
- controller integration
- custom mappings
- Live control from supported script layers

Important note:
- Keep concise internal notes here rather than mirroring vendor docs.

### 3. Link
Use this when building:
- standalone apps
- sync-aware tools
- cross-device tempo/beat/session sync

### 4. Live Set Export
Use only if building:
- iOS tooling that exports Ableton Live Sets

## Default recommendation

Start with:
- Max for Live
- Live API / LOM
- curated notes
- example utilities

Add Link or export tooling only when a real project needs it.

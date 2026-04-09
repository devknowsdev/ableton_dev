# Device release dossier template

## Purpose

This template is for any Max for Live device that is moving from source-stage experimentation toward a releasable artifact.

The goal is to make release thinking explicit.
A device should not move toward distribution based only on “it works on my machine.”

This template is intentionally aligned with the repository’s emphasis on:
- compatibility
- migration safety
- undo safety
- save/recall reliability
- product clarity

---

## Device name

## Version

## Device type
- MIDI
- Audio Effect
- Instrument
- Utility / Other

---

## Purpose of this release

Why is this device being released now?

Examples:
- first external test build
- internal milestone build
- migration-safe update
- performance/stability update
- feature expansion

---

## Source artifact

What editable source is this release built from?

- source path or source project name
- main dependencies
- whether the device has been frozen for release

---

## User-facing behavior summary

What does the device do, at a practical user level?

Keep this short but concrete.

---

## Parameter identity review

### Existing parameters preserved
List the parameters whose identity must remain compatible.

### Changed parameters
List any parameter changes and classify them:
- Low migration risk
- Medium migration risk
- High migration risk

### Notes
Explain why these changes are acceptable or what mitigation is being used.

---

## Save / recall review

Answer these:
- are all intended parameters recalled correctly after save/reload?
- have non-default states been tested?
- have duplicated device instances been tested?
- have old sets or old versions been tested when relevant?

---

## Undo / automation review

Answer these:
- does the device flood undo history?
- are internally animated controls safely designed?
- are automation-visible parameters intentionally chosen?
- are hidden/internal parameters documented in the source notes if relevant?

---

## UI / product clarity review

Answer these:
- is the UI legible and intentional?
- does it behave well across Live themes?
- are parameter names meaningful?
- is the device width appropriate?
- does the device communicate its target or context clearly if it is context-sensitive?

---

## Robustness review

Answer these:
- any Max console noise on load?
- any obvious initialization-order fragility?
- any multiple-instance interference risk?
- any suspicious CPU spikes?
- any latency implications?
- any frozen/unfrozen playback mismatch risk?

---

## Platform / version review

State what was considered or tested:
- Live version(s)
- Max version(s)
- macOS
- Windows
- Push standalone if relevant

If not tested, say so explicitly.

---

## Known uncertainties

What still needs confirmation before broader release?

Be explicit.
This section is important.

---

## Recommended release confidence

Choose one:
- High
- Medium
- Low

Explain why.

---

## Release decision

Choose one:
- okay for internal testing
- okay for limited external testing
- okay for broader release
- not ready

Explain why.

---

## Follow-up tasks

List the next concrete tasks after this release.

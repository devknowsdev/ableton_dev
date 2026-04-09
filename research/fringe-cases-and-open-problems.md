# Fringe cases and open problems

## Purpose

This file is the beginning of the repository’s **frontier research layer**.

It exists for questions that are important, ambiguous, version-sensitive, or poorly served by simple reference notes.

This is where the repo should become more than a tutorial set.
It should become a place where tricky behavior is:
- noticed
- framed clearly
- investigated methodically
- turned into reusable design knowledge

---

## How to use this file

For each topic:
- describe the problem clearly
- say what is already known
- say what is still uncertain
- say why it matters
- propose the smallest useful validation path
- capture design consequences

Do not treat unresolved topics as failures.
They are research targets.

---

## 1. LiveAPI context sensitivity and UI-coupled behavior

### Why this matters
Many useful assistant workflows depend on `live_set view` paths such as:
- `selected_track`
- `detail_device`
- `highlighted_clip_slot`

These are powerful, but they are also UI-context-dependent.

### Known
- they are often the fastest path for assistant-style actions
- they are not the same as durable structural references
- they can change when the user changes focus

### Open questions
- what patterns remain stable enough for productized tools vs only debugging tools?
- which workflows become dangerously ambiguous if built mainly on current selection?
- what are the best fallback strategies when the UI context is not what the tool expected?

### Why it is a frontier topic
It sits at the boundary between convenience and fragility.
A strong AI should know when selection-aware logic is elegant and when it is brittle.

### Next validation path
- test utility behavior while rapidly changing selection
- compare selection-aware flows against index-based or name-based resolution
- document where observer rebinding is sufficient and where architectural changes are better

---

## 2. Parameter identity and long-term migration safety

### Why this matters
Parameter identity is one of the quietest but most serious product risks in Max for Live device evolution.

### Known
- parameter naming matters for automation and recall
- changing important parameter identity can break old-set behavior
- updates should be treated partly as migrations

### Open questions
- which parameter changes are safest vs most dangerous in practice?
- how should a repo track planned parameter migrations for devices under development?
- what tooling would best detect accidental compatibility breakage before release?

### Innovation opportunity
A specialized parameter-compatibility audit tool could become a high-value internal utility for advanced Max-for-Live development.

### Next validation path
- document concrete migration scenarios
- compare parameter lists across versions of an experimental device
- design a “parameter compatibility checklist” artifact for future releases

---

## 3. Undo-history pollution from internal modulation

### Why this matters
Undo pollution is the kind of issue that can make a device feel unprofessional even if the sound/result is otherwise excellent.

### Known
- internally driving visible/stored parameters can flood undo history
- this is especially relevant when native-looking controls are updated rapidly from inside the patch

### Open questions
- what is the cleanest repeatable design pattern for avoiding this while preserving useful UI feedback?
- where is the best line between visible user parameters and hidden internal state?
- which categories of device designs are most vulnerable?

### Innovation opportunity
The repo could eventually define a reusable “safe modulation interface” pattern for Max for Live UI design.

### Next validation path
- build tiny devices that intentionally stress undo behavior
- compare hidden vs visible parameter strategies
- document patterns that preserve usability without polluting history

---

## 4. Observer architecture in larger LiveAPI utilities

### Why this matters
Small utilities can get away with simple observer setups.
Larger tools can become fragile if observer graphs are not designed carefully.

### Known
- observer rebinding is necessary when context objects change
- observing the smallest meaningful property is safer than broad polling

### Open questions
- what observer architectures scale cleanly for medium-complexity Max-for-Live tooling?
- what naming, routing, and lifecycle practices best reduce observer bugs?
- when should a utility move from direct script logic to a more explicit state model?

### Innovation opportunity
A reusable observer-management abstraction for Max JS / LiveAPI utilities could become a major leverage point.

### Next validation path
- create a few utilities that observe different kinds of context
- compare direct callback wiring vs explicit rebinding helpers
- record common failure modes

---

## 5. Selection-aware assistants vs deterministic batch tools

### Why this matters
AI tooling inside Live may divide into two broad classes:
- tools that act on what the user is currently focused on
- tools that act on a known structural target in the set

### Known
- selection-aware tools feel natural and fast
- deterministic tools are easier to reason about and test

### Open questions
- what kinds of jobs should never rely mainly on selection context?
- what UX pattern best bridges selection-aware convenience with deterministic safety?
- how should the AI communicate what target it believes it is operating on?

### Innovation opportunity
This could lead to a general design language for AI-in-Live tooling: “focus-based mode” vs “explicit target mode.”

### Next validation path
- build paired examples of both patterns
- compare failure modes and user trust implications
- define decision rules for when each pattern is appropriate

---

## 6. Multiple-instance safety beyond naming

### Why this matters
It is easy to think of multiple-instance safety only in terms of local naming.
That is necessary but may not be sufficient.

### Known
- global naming collisions are real in Max
- multiple instances are a normal usage pattern in Live

### Open questions
- what other classes of instance interference show up in LiveAPI or utility-device workflows?
- how should temporary caches, observers, or shared assumptions be isolated?
- what design patterns help utilities remain composable in larger sets?

### Next validation path
- run utilities in parallel across several tracks
- test selection changes while multiple instances are active
- document any accidental shared behavior

---

## 7. Source-first development vs frozen distribution workflow

### Why this matters
The repo currently favors source-first scaffolding, which is good for learning and extension.
But real productization introduces a new class of risk around frozen releases and ongoing maintenance.

### Known
- frozen builds are correct for distribution
- continuing development from frozen artifacts is discouraged
- version control should primarily track editable source

### Open questions
- what repo conventions best support both source clarity and release discipline?
- how should release notes capture migration-sensitive changes?
- what should a “device release dossier” contain before freezing and sharing?

### Next validation path
- define a release checklist template
- test a simple source-to-frozen flow on one utility when ready
- capture lessons learned in repo conventions

---

## 8. Host-specific behavior for external plugins in Live

### Why this matters
If the repo is meant to train expert judgment, it must eventually cover Live not only as a device platform, but as a plugin host with its own practical behavior.

### Known
- external plugin development is a different surface from Max for Live
- Live-specific host behavior still matters for validation

### Open questions
- what host-facing edge cases matter most in Live for external plugin developers?
- how should the repo compare “portable plugin logic” with “Live-specific host expectations”?
- what would a rigorous host-validation checklist for Live look like?

### Next validation path
- build a dedicated host-behavior research note collection
- record official public guidance and experiment-derived observations separately
- identify where Live differs most meaningfully from naive host assumptions

---

## 9. Innovative AI tooling ideas that respect Ableton reality

### Why this matters
The repo should not become only defensive or documentary.
It should also generate compelling new directions.

### Open opportunity areas
- parameter compatibility auditing
- observer-safe utility frameworks
- selection-aware but confirmable assistant workflows
- migration-risk analyzers for device updates
- utility devices for debugging Live sets
- bridge tools between structural set analysis and creative UI flow

### Key rule
Every innovation note should be judged by both:
- originality
- platform realism

---

## 10. Research queue pattern for future additions

When adding a new research topic, use this compact structure:

## Topic
## Why it matters
## Verified
## Uncertain
## Risks
## Smallest useful experiment
## Design consequence

This format keeps the frontier layer rigorous.

# Ableton expert curriculum

## Purpose

This document defines the learning and reasoning path the repository should support.

The goal is not only to know facts.
The goal is to develop **expert judgment** across the surfaces that matter in Ableton-related development work.

This curriculum is written for both:
- humans using the repo as a study system
- AI systems using the repo as structured context

---

## Stage 0: Orientation

### Objective
Understand the major development surfaces and avoid category confusion.

### Must understand
- what Max for Live is and is not
- what external plugins are and are not
- what Live API / LOM work is and is not
- what controller / remote script work is and is not
- what Ableton Link is and is not

### Required outcome
Be able to classify a new idea into the correct platform surface before suggesting implementation.

### Failure mode to avoid
Confusing:
- Max for Live with standard plugin development
- Link with generic device authoring
- controller scripting with audio-device design

---

## Stage 1: Live-centered mental model

### Objective
Understand Live as the host environment, not just a collection of APIs.

### Must understand
- the device chain as user-facing context
- Session vs Arrangement implications
- selected-track, detail-device, highlighted-clip-slot style context
- transport as global state
- parameter, automation, and mapping behavior as product concerns

### Required outcome
Be able to explain why a technically working idea may still be a poor Live-native user experience.

---

## Stage 2: Max for Live competence

### Objective
Become strong enough at Max-for-Live reasoning to design and review serious devices.

### Must understand
- `[live.*]` UI objects and why they matter
- parameter naming discipline
- save/recall expectations
- dependency freezing
- undo history pitfalls
- initialization order pitfalls
- multiple-instance behavior
- UI design in the context of Live
- frozen release vs editable source

### Required outcome
Be able to turn a prototype device idea into a safer, more releasable design.

### Evidence of mastery
- good parameter naming decisions
- awareness of recall and migration risk
- ability to propose a QA checklist
- ability to distinguish source patch concerns from release artifact concerns

---

## Stage 3: Live API / LOM operational fluency

### Objective
Move beyond isolated path memorization into reliable object-model reasoning.

### Must understand
- canonical paths
- root object structure
- track / device / parameter traversal
- clip slot vs clip distinction
- view-based contextual access
- observer usage and rebinding
- runtime ids vs durable references
- read vs write side effects

### Required outcome
Be able to design and debug LiveAPI flows for real utilities and assistant workflows.

### Evidence of mastery
- can resolve selected track, detail device, and highlighted clip slot cleanly
- can traverse to parameters safely
- can identify where brittle index-based logic should be replaced by better strategies
- can explain where observer rebinding is necessary

---

## Stage 4: Host-facing plugin understanding

### Objective
Understand external plugin development in relation to Live as host.

### Must understand
- the conceptual difference between external plugins and Max for Live devices
- what should be solved in a plugin framework/toolchain rather than in Ableton-specific code
- host-facing concerns such as parameter behavior, recall, expressive control, and compatibility in Live
- the importance of verifying Live-specific host behavior rather than assuming all DAWs behave identically

### Required outcome
Be able to reason about when to choose external plugin development over Max for Live, and what extra host validation Live requires.

### Failure mode to avoid
Speaking as if Ableton provides a proprietary all-purpose plugin-authoring surface for everything.

---

## Stage 5: External app and sync systems

### Objective
Understand when the correct solution lives outside Live.

### Must understand
- Ableton Link’s role in tempo/beat/phase synchronization
- why sync-aware companion tools are a separate category from plugins/devices
- architectural implications of standalone or multi-app systems

### Required outcome
Be able to separate:
- in-Live utility ideas
- cross-app sync ideas
- standalone creative tool ideas

---

## Stage 6: Controller and workflow tooling

### Objective
Understand control-surface and workflow acceleration as their own problem space.

### Must understand
- why controller scripting is different from audio-device authoring
- what kinds of workflow tools are best expressed as scripts vs devices vs external tools
- the relationship between hardware integration and user workflow design

### Required outcome
Be able to route a controller/workflow idea to the right implementation layer.

---

## Stage 7: QA, compatibility, and migration

### Objective
Train the AI to think like a release-minded engineer rather than only a prototype builder.

### Must understand
- save/reload correctness
- frozen/unfrozen version handling
- migration risk across updates
- parameter identity preservation
- cross-platform and cross-version concerns
- testing in musical context rather than synthetic isolation only

### Required outcome
Be able to design a useful test plan before or alongside implementation.

### Evidence of mastery
- asks about recall and undo before release
- thinks about old-set compatibility
- treats updates as migrations, not just replacements

---

## Stage 8: Fringe cases and frontier reasoning

### Objective
Develop the ability to reason about unclear, undocumented, or version-sensitive behavior.

### Must understand
- how to classify uncertainty
- how to design an experiment to reduce uncertainty
- how to keep a note open without pretending certainty
- how to turn a weird edge case into reusable repository knowledge

### Required outcome
Be able to investigate ambiguous platform behavior instead of bluffing.

---

## Stage 9: Innovation and product imagination

### Objective
Use the previous stages to invent stronger solutions.

### Must understand
- how to identify real user friction in Live workflows
- how to invent utility and product concepts that fit the actual platform
- how to constrain ambitious ideas into testable prototypes
- how to balance novelty with maintainability and trust

### Required outcome
Be able to propose ideas that are both original and implementable.

### Evidence of mastery
- proposes a useful prototype path, not just a vague concept
- names likely constraints early
- can say why an idea belongs in Max, LiveAPI, a plugin, a script, or an external app

---

## Cross-cutting habits the repo should reinforce

At every stage, reinforce these habits:

### Habit 1: State the surface clearly
Always know what kind of thing is being built.

### Habit 2: Separate fact from inference
Never let convenience blur that distinction.

### Habit 3: Think in tradeoffs
Good solutions have costs.
Name them.

### Habit 4: Think in failure modes
Assume the happy path is not enough.

### Habit 5: Think in migration and compatibility
What ships must survive time, not just run today.

### Habit 6: Connect theory to experiments
When uncertain, design the smallest useful validation.

---

## Suggested repository mapping

The curriculum should map to the repo like this:

- `docs/ableton-development-paths.md` → Stage 0
- `docs/max-for-live-development-principles.md` → Stage 2
- `docs/live-api-cheatsheet-v1.md` → Stage 3
- `docs/live-api-patterns-and-snippets.md` → Stage 3
- `examples/selected-track-inspector-device/` → Stages 3 and 8
- `examples/selected-device-parameter-browser/` → Stages 3 and 8
- future plugin-host notes → Stage 4
- future Link/system notes → Stage 5
- future compatibility and QA notes → Stage 7
- frontier and fringe-case notes → Stage 8

---

## What mastery looks like in practice

A strong AI built on this repo should be able to:
- classify a new idea into the right implementation surface
- sketch an implementation path
- identify where edge cases are likely
- design a practical experiment or utility to validate assumptions
- propose a QA and release risk checklist
- document what remains uncertain without sounding lost
- still produce creative, forward-looking ideas

That is the level this curriculum is meant to support.

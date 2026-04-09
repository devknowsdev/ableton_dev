# Research workflow

## Purpose

This document defines how serious research should be done in this repository.

The goal is to avoid two weak extremes:
- vague note-taking with no evidence discipline
- overconfident claims based on one small experiment

A good research workflow should help the repo produce knowledge that is:
- durable
- explicit about confidence
- useful for implementation and design
- reusable by both humans and AI systems

---

## 1. Start by classifying the question

Before researching, decide what kind of question it is.

### Type A: platform fact
Example:
- what object family owns this behavior?
- is this property documented?
- what is the official route for this integration?

### Type B: observed behavior
Example:
- what happens when selection changes during this utility action?
- how does a device behave after save/reload?

### Type C: design tradeoff
Example:
- should this tool rely on selection context or explicit indexing?
- should this behavior live in Max, a script, or an external app?

### Type D: open frontier question
Example:
- what architecture scales best for observer-heavy utilities?
- how should AI tools balance convenience and determinism inside Live?

Different question types need different evidence mixes.

---

## 2. Gather the first-pass evidence

For most topics, gather from these buckets in order.

### Bucket 1: official public sources
Use this for:
- platform facts
- object model references
- official recommended practices
- packaging and release guidance

### Bucket 2: repository examples and experiments
Use this for:
- behavior verification
- edge-case exploration
- implementation feasibility

### Bucket 3: synthesis
Use this for:
- design consequences
- likely failure modes
- architecture recommendations

The repo should not jump straight to synthesis if the first two buckets are thin.

---

## 3. Write down the uncertainty early

At the beginning of a research note, capture uncertainty explicitly.

Examples:
- exact property name unverified
- version sensitivity likely
- current behavior inferred from example, not yet reproduced
- host-specific behavior suspected but untested

This prevents a common failure mode where uncertainty disappears simply because the note becomes longer.

---

## 4. Prefer the smallest useful experiment

When official sources do not fully answer the question, design the smallest experiment that could reduce uncertainty.

Examples:
- a one-function Max JS script
- a tiny device with one exposed parameter and one internal modulation path
- a save/reload comparison test
- a multiple-instance conflict test
- a selection-change stress test

Small experiments are easier to trust and easier to document.

---

## 5. Capture reproduction conditions

If a note depends on observed behavior, record the rough context:
- what was tested
- what assumptions existed
- what triggered the behavior
- what was and was not controlled

Without reproduction conditions, a behavior note ages badly.

---

## 6. Separate observation from recommendation

A research note should not jump immediately from “this happened once” to “therefore this is best practice.”

Use this order:
1. what was observed
2. what likely explains it
3. what design risk it implies
4. what practice should follow

This makes the reasoning inspectable.

---

## 7. Record confidence levels

Every substantial conclusion should have an implied or explicit confidence level.

### High confidence
Supported strongly by official docs and/or repeated reliable experiments.

### Medium confidence
Supported by strong but incomplete evidence or likely to be version-sensitive.

### Low confidence
Interesting, plausible, or directionally useful, but still needing confirmation.

This is essential if the repo is meant to train AI judgment rather than just store claims.

---

## 8. Force a design consequence

A research note should not stop at “interesting.”
It should end in one or more consequences.

Examples:
- therefore prefer hidden internal parameters for this modulation pattern
- therefore selection-aware mode should include confirmation UI
- therefore we need a migration checklist before changing parameter names
- therefore a reusable observer helper would be worth building

This is what turns research into leverage.

---

## 9. Decide where the result belongs

After finishing research, place the result in the correct layer.

### If it is stable orientation knowledge
Put it in `docs/`.

### If it is implementation guidance
Put it in `docs/` or near the relevant example.

### If it is unresolved, version-sensitive, or exploratory
Put it in `research/`.

### If it is best demonstrated by code
Add or update an example under `examples/`.

This stops the repo from becoming structurally incoherent.

---

## 10. Recommended lifecycle for a research topic

### Step 1: question
State the problem clearly.

### Step 2: official grounding
Collect the best currently available official references.

### Step 3: experiment
Build the smallest useful validating artifact.

### Step 4: analysis
Separate verified facts from likely implications.

### Step 5: design recommendation
State what should change in implementation, documentation, or testing.

### Step 6: repository placement
Move the result into the right long-term home.

---

## 11. Research note checklist

Before considering a research note “good enough,” ask:

- does it say why the topic matters?
- does it separate fact from inference?
- does it record what is still uncertain?
- does it include or propose a concrete experiment?
- does it identify likely failure modes?
- does it produce a design or implementation consequence?
- does it belong in the current folder?

If several answers are no, the note is not done.

---

## 12. Long-term goal

Over time, this workflow should make the repo capable of supporting an AI that can:
- investigate rather than bluff
- reason across multiple evidence types
- handle ambiguous technical situations with discipline
- generate innovative but testable ideas
- learn from experiments instead of only memorizing docs

That is the research standard this repository should aim for.

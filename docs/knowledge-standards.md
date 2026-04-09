# Knowledge standards

## Purpose

This document defines the standard for what counts as a good knowledge artifact in this repository.

The goal is not to collect a lot of text.
The goal is to accumulate knowledge that is:
- trustworthy
- reusable
- explicit about uncertainty
- useful for implementation decisions
- useful for future AI reasoning

---

## 1. Every note should declare its evidence type

Each meaningful technical note should indicate which of these evidence classes it uses.

### A. Official public source
Examples:
- official Ableton documentation
- official Ableton GitHub repositories
- official Cycling ’74 documentation

Use this when possible for platform facts.

### B. Repository experiment
Examples:
- a Max for Live utility created in this repo
- a scripted LiveAPI test
- a behavioral observation reproduced in Live

Use this for observed behavior that is not yet clearly documented.

### C. Strong inference
Examples:
- a design conclusion derived from multiple official facts
- a likely compatibility implication
- a likely architectural tradeoff

Use this only when the distinction from verified fact remains visible.

### D. Open question
Examples:
- unclear current method semantics
- version-specific behavior not yet tested
- undocumented edge-case assumptions

Open questions are not a weakness.
They are part of serious research.

---

## 2. Every deep note should answer five questions

A strong technical note should make these easy to find.

1. **What is the topic?**
2. **What is verified?**
3. **What is uncertain?**
4. **Why does it matter?**
5. **What design or implementation consequence follows?**

If a note does not answer those questions, it is likely too vague to train good judgment.

---

## 3. Separate facts from implications

This repo should repeatedly distinguish between:
- platform fact
- observed behavior
- inferred consequence
- recommended practice

Example structure:

### Verified
What the source or experiment clearly supports.

### Implication
What likely follows for product or implementation choices.

### Risk
What might still go wrong.

### Action
What we should do in code, testing, or documentation.

This format helps prevent shallow AI reasoning.

---

## 4. Edge cases are first-class knowledge

A note is not finished just because the happy path is described.

For relevant topics, also ask:
- what happens with zero tracks, zero devices, or empty clip slots?
- what happens when selection changes?
- what happens with multiple instances?
- what happens after save/reload?
- what happens under automation?
- what happens with undo history?
- what happens across Live versions?
- what happens across platforms?

If a note ignores these and they plausibly matter, the note is incomplete.

---

## 5. Innovation notes need realism fields

This repo should include inventive ideas, but each significant design idea should say:
- what platform surface it belongs to
- what problem it solves
- what makes it novel
- what constraints may block it
- what minimal prototype would test it
- what release risks it introduces

This prevents innovation from turning into hand-wavy speculation.

---

## 6. Implementation notes should include testing intent

Whenever a note suggests code or device behavior, it should also propose how to test it.

At minimum, include one or more of:
- a manual Live test
- a Max console inspection step
- a save/reload verification step
- a multiple-instance check
- a freeze/render consistency check
- a parameter recall check
- a version migration check

The repo should teach the AI that implementation and verification belong together.

---

## 7. Prefer stable abstractions over raw memorization

A strong repo should help the AI remember:
- object families
- traversal patterns
- classes of risk
- testing patterns
- migration patterns

Not just raw method names.

Exact names still matter, but a good artifact should help the AI understand:
- the pattern
- the failure modes
- the decision process

This is more durable than memorizing isolated facts.

---

## 8. Use examples as evidence, not as the whole truth

Executable examples are extremely valuable.
But a single example script does not prove complete platform understanding.

For each important example, ask:
- what did this script demonstrate?
- what did it not demonstrate?
- what assumptions did it make?
- what should be validated before reuse?

This is how examples become research assets instead of just snippets.

---

## 9. Recommended note template

For technical notes that matter, use this structure:

## Topic

## Why it matters

## Verified

## Observed / experimented

## Likely implications

## Fringe cases / failure modes

## What still needs confirmation

## Recommended practice

## Test plan

This is not required for every small file, but it should become the dominant style for serious notes.

---

## 10. Confidence discipline

This repo should actively train good confidence behavior.

### High confidence
Use when the claim is well supported by official docs or repeated reliable experiments.

### Medium confidence
Use when the evidence is strong but incomplete or version-sensitive.

### Low confidence
Use when the claim is mostly an inference or needs direct Live validation.

This prevents the AI from sounding “certain” when it is only guessing.

---

## 11. What to avoid

Avoid these failure modes:
- undocumented claims presented as fact
- long notes with no design consequence
- shallow summaries of official docs with no insight
- code examples with no explanation of assumptions
- innovation notes with no implementation path
- bug/edge-case observations with no reproduction conditions
- files that duplicate official docs without adding structure or value

---

## 12. Success condition

A good artifact in this repo should help a future AI do at least one of these better:
- reason more accurately
- implement more safely
- test more intelligently
- diagnose more deeply
- preserve compatibility more carefully
- invent more realistically

If a file does none of those, it probably does not belong here.

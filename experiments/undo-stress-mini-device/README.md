# Undo Stress Mini-Device

## Purpose

This experiment is designed to generate direct evidence for the repository’s case study on undo-history pollution and internal modulation.

The goal is to compare two or more tiny device designs that are musically similar but architecturally different in how they expose or hide moving state.

---

## Research question

What kinds of internal parameter-update designs are most likely to pollute Live’s undo history, and what safer alternatives preserve usability without sacrificing clarity?

---

## Core experiment design

Build a tiny Max for Live device with one obvious moving control strategy and compare variants.

### Variant A: visible/stored animated parameter
A visibly animated `[live.*]` parameter that is updated internally at rate.

### Variant B: hidden/internal animated state
A musically equivalent design in which the rapidly changing internal state is not exposed as a normal visible/stored parameter.

### Variant C: optional hybrid design
A design where the user-facing control is stable, but a derived visual display reflects internal movement separately.

---

## Recommended experimental behavior

Keep the sound or effect behavior simple.
The important thing is not audio complexity.
The important thing is how Live responds to the device architecture.

For example, compare designs where one internal process repeatedly changes a value that the user can see.

---

## Test procedure

### Step 1: build a tiny baseline patch
Use one or two parameters only.
Do not add extra complexity.

### Step 2: enable motion
Create a repeatable internal modulation or update process.

### Step 3: generate a clear undo action outside the device
For example, make a separate Live edit that should remain easy to undo.

### Step 4: observe the undo menu over time
Check whether the meaningful undo action remains visible or gets buried by device-generated actions.

### Step 5: compare variants
Record:
- whether undo gets flooded
- whether the device still feels understandable
- whether the UI remains musically useful
- whether hiding/internalizing the state solves the problem cleanly

---

## Observation log template

### Variant

### Parameter visibility strategy

### Internal movement strategy

### Did undo flood?

### Did the UI remain understandable?

### Did the design still feel musically useful?

### Recommended pattern class
Examples:
- unsafe
- conditionally safe
- good candidate for reusable pattern

---

## Why this experiment is valuable

This experiment is small, but the result is high leverage.

If run well, it can help the repo define:
- safer modulation interface patterns
- better guidance for visible vs hidden parameter decisions
- stronger QA expectations for Live-native device behavior

---

## Expected repository outputs

A good run of this experiment should generate:

1. a strengthened undo-history case study
2. a future “safe modulation interface” design note
3. a dedicated QA checklist item for undo behavior
4. clearer AI guidance on when a visible control should not be host-facing

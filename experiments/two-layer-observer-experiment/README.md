# Two-Layer Observer Experiment

## Purpose

This experiment is designed to turn the repository’s observer-architecture case study into more concrete evidence.

The goal is to compare two observer design styles:
- a simpler direct-callback approach
- a two-layer context/object observer approach

---

## Research question

Does a two-layer observer architecture produce a more understandable and resilient design for LiveAPI utilities than direct ad hoc observer wiring?

---

## Core experiment design

Build a tiny utility that watches multiple moving pieces of context.

A good first combination is:
- selected track
- detail device
- one property on the current detail device or current track

Then compare two implementations.

### Variant A: direct observer wiring
Handle changes with direct callbacks and minimal structure.

### Variant B: two-layer observer model
Use a clear split:
- context observers for top-level changing references
- object observers for properties on the currently resolved target

---

## Recommended architecture comparison

### Variant A questions
- is it easy to read?
- does it become confusing when more observers are added?
- are stale observers easy to accidentally leave active?

### Variant B questions
- does the layering reduce ambiguity?
- is the rebinding flow easier to reason about?
- does the extra structure actually help at this small scale?

---

## Suggested event set

Try to generate and inspect these events:
- selected track changed
- detail device changed
- observed property on current target changed

The point is not volume.
The point is whether the architecture keeps event meaning clear.

---

## Observation log template

### Variant

### Context observers used

### Object observers used

### Rebinding strategy

### Any duplicate events?

### Any stale-target behavior?

### Readability of implementation

### Ease of debugging

### Recommended architecture class
- good for tiny tools
- acceptable only for prototypes
- strong candidate for reusable repo pattern

---

## Why this experiment is valuable

If done well, this experiment could produce one of the most useful architecture-level assets in the repo.

Observer logic is a likely leverage point for:
- larger Max JS utilities
- assistant-style context tracking
- future reusable helper modules

---

## Expected repository outputs

A useful run of this experiment should generate:

1. stronger observer design rules
2. a future shared observer helper or pattern note
3. a debugging checklist for observer-driven tools
4. clearer guidance on when simple callback wiring stops being enough

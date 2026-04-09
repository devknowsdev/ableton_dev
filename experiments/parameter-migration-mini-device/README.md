# Parameter Migration Mini-Device

## Purpose

This experiment is designed to turn the repository’s migration-safety case study into real evidence.

The goal is to test how different kinds of parameter changes affect:
- save / recall
- automation continuity
- user expectations across versions
- practical migration risk

This is an experiment scaffold, not a finished Max for Live release.

---

## Research question

What kinds of parameter changes appear safest or most dangerous when a Max for Live device evolves across versions?

---

## Core experiment design

Create a tiny Max for Live device with a small stable parameter set, then create versioned variants that change exactly one thing at a time.

### Baseline version
Recommended baseline parameter set:
- `Gain`
- `Tone`
- `Mix`

The exact names matter less than keeping them simple, distinct, and clearly intentional.

### Variant A: rename only
Change one parameter name while keeping its musical role the same.

Example:
- `Tone` → `Color`

### Variant B: same name, different meaning
Keep the parameter name but change its musical role or effective scaling enough to alter what an old value means.

### Variant C: add a new parameter
Add one new parameter without intentionally changing the original three.

### Variant D: reorder visible controls
Keep names stable but alter visible order or browsing order if relevant.

---

## Suggested file structure for the experiment

- baseline device source
- variant source A
- variant source B
- variant source C
- variant source D
- one or more saved Live Sets created against the baseline
- a research note capturing observations

This repo does not yet contain the full `.amxd` artifacts.
Start with source scaffolding and a disciplined observation log.

---

## Minimal Max for Live source strategy

For a first useful test device:
- use `[live.dial]` or similar `[live.*]` controls
- give each parameter a deliberate Long Name and Short Name
- keep the DSP or MIDI behavior trivial
- make the experiment about parameter identity, not sound design complexity

The smaller the device, the easier the migration evidence will be to trust.

---

## Test procedure

### Step 1: baseline build
Build the baseline device and save a Live Set with clearly non-default values for all parameters.

### Step 2: duplicate saved states
Create one or more saved sets or presets using the baseline so recall behavior has something real to test against.

### Step 3: substitute each variant
Open the same saved context using one variant at a time.

### Step 4: inspect outcomes
For each variant, record:
- which values still recall cleanly
- which values appear missing or misassigned
- whether old automation still appears sensible
- whether the device is technically functional but semantically misleading

### Step 5: classify risk
Classify the change as:
- Low migration risk
- Medium migration risk
- High migration risk

---

## Observation log template

For each variant, capture:

### Variant

### What changed

### What still recalled correctly

### What broke or became misleading

### Was the failure obvious or subtle?

### Likely migration risk

### Recommended release response
Examples:
- safe in-place update
- requires extra caution
- should be a versioned release instead

---

## Why this experiment is valuable

This experiment helps the repo move from:
- generic warnings about migration

to:
- concrete evidence about which changes are actually risky in practice

That is exactly the kind of knowledge an expert Ableton AI should have.

---

## Expected repository outputs

If this experiment is run properly, it should generate at least:

1. a filled case study with stronger evidence
2. a parameter compatibility checklist
3. a better release-dossier standard
4. sharper AI rules for device evolution

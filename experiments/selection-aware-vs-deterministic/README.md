# Selection-Aware vs Deterministic Utility Experiment

## Purpose

This experiment is designed to generate evidence for the repository’s case study on selection-aware vs deterministic tool design.

The goal is to compare two tools that solve the same class of problem but differ in how they choose their target.

---

## Research question

When a LiveAPI utility needs to inspect or modify something, when is it better to rely on current UI focus and when is it better to use an explicit structural target?

---

## Core experiment design

Build two very small utilities that perform the same essential task.

### Variant A: selection-aware
Target the current UI context.

Examples:
- `live_set view detail_device`
- `live_set view selected_track`
- `live_set view highlighted_clip_slot`

### Variant B: deterministic
Target an explicitly specified structural path.

Examples:
- track index + device index
- explicit scene index
- explicit parameter index inside an explicitly chosen device

---

## Recommended shared task

A strong first task is:
- inspect a device and list its parameters

### Selection-aware version
Use the currently focused detail device.

### Deterministic version
Use an explicit track/device index.

This is a good comparison because both are realistic and easy to understand.

---

## What to compare

For each variant, record:
- ease of use
- clarity of target
- ease of debugging
- risk of acting on the wrong object
- suitability for repeated tasks
- suitability for risky write actions

---

## Suggested test situations

### Situation 1: exploratory inspection
The user is actively browsing devices and wants quick feedback.

### Situation 2: repeated action
The same action must be repeated reliably on a known target.

### Situation 3: context drift
The user changes selection between inspection and action.

### Situation 4: communication clarity
The tool output is reviewed later and must still make clear what object it acted on.

---

## Observation log template

### Variant

### Task performed

### How target was resolved

### Did target confusion occur?

### Did the output make the target clear?

### Did the interaction feel smooth?

### Was the tool easy to trust?

### Recommended mode for this task class
- Selection-aware preferred
- Deterministic preferred
- Mixed mode with explicit confirmation

---

## Why this experiment is valuable

This experiment helps the repo move beyond abstract debate.
It should help define:
- when focus-based design is a strength
- when explicit targeting is safer
- what target-communication patterns improve trust

---

## Expected repository outputs

A useful run of this experiment should generate:

1. stronger decision rules for assistant-style tooling
2. a future note on “current target” UI conventions
3. better guidance for write-vs-read tool modes
4. clearer AI rules about when to ask for explicit target confirmation

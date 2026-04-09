# Undo history and internal modulation design

## Why this matters

A Max for Live device can sound excellent and still feel broken if it pollutes Live’s undo history.

This issue matters because it directly affects user trust.
A device that constantly buries meaningful undo actions makes the broader Live session harder to use, even if the device itself is doing something musically interesting.

This topic matters for:
- UI design
- parameter exposure strategy
- internal modulation architecture
- product polish
- release safety

---

## Question

How should this repository think about internal modulation and parameter visibility so that an AI can propose expressive devices without casually wrecking Live’s undo behavior?

---

## Evidence sources

- [x] Official public source
- [ ] Repository experiment
- [x] Strong inference
- [x] Open question

Primary grounding comes from Ableton’s Max for Live Production Guidelines around undo flooding and hidden/internal parameters.

---

## Verified

The following points are strongly grounded by the official guidance:

1. Rapid internal updates to Live-facing stored/automatable parameters can flood undo history.
2. This can make Live’s undo function effectively unusable during playback or modulation-heavy operation.
3. In some cases, the correct solution is to make a parameter **Hidden** rather than exposing it as a normal stored/automatable control.
4. Device design must consider not only whether a parameter is musically useful, but also how its visibility interacts with Live’s global editing model.

---

## Observed / repository-aligned reasoning

This issue is especially interesting because it sits at the intersection of:
- UI expectations
- internal architecture
- product feel
- host integration

A native-looking control is not automatically a good exposed parameter.
Sometimes the control should look informative or interactive while being backed by a safer internal state strategy.

This suggests an important design distinction:

### User-facing parameter
A control that should support:
- mapping
- automation
- storage/recall
- stable host-visible identity

### Internal animated state
A control or value that may move frequently for sound-design or modulation reasons, but should not necessarily behave like a host-facing parameter.

The danger is that prototype thinking often blurs these categories.
That is one reason this topic is valuable for AI training.

---

## Likely implications

### Implication 1: visible controls are not automatically safe automatable controls
An AI should not assume every useful control should be exposed with full parameter visibility.

### Implication 2: modulation architecture should be chosen early
When a device concept involves frequent internal movement, the design should decide early:
- what truly belongs to the user-facing parameter layer
- what belongs to a hidden or derived internal layer

### Implication 3: the repo needs a reusable “safe modulation” pattern
This is a strong candidate for a future design pattern note or utility scaffold.
A good pattern would help decide:
- what the user edits directly
- what is displayed only
- what is stored
- what may move rapidly without affecting undo history badly

---

## Fringe cases / failure modes

### 1. Native-looking control, unsafe visibility
A control looks like a normal device control but is internally animated at high frequency while still being host-visible.
This is the classic undo pollution failure.

### 2. Hidden parameter, poor user understanding
A parameter is hidden for technical safety, but the UI gives no clue how or why the visible state behaves the way it does.
This protects undo but harms usability.

### 3. Stored-but-derived state
A value that should really be derived from a safer core parameter is instead treated as a primary stored parameter, creating noisy recall and edit behavior.

### 4. Automation conflict
A device tries to support both internal modulation and direct automation on the same exposed control without a clear precedence or architecture, leading to confusing results.

### 5. Prototype-to-product drift
A prototype that was musically effective becomes productized without revisiting whether its parameter layer is architecturally safe.

---

## What remains uncertain

Important points still need more direct experimentation:

1. Which exact modulation patterns create the most severe undo pollution in current Live versions?
2. How much update frequency matters compared with mere parameter visibility state?
3. What UI patterns best preserve clarity when a parameter is hidden for safety?
4. What is the cleanest reusable architecture for “visible result, hidden modulation engine” designs?

---

## Smallest useful experiment

### Undo stress mini-device
Build a tiny Max for Live device with:
- one visible `[live.*]` parameter driven internally at rate
- one equivalent hidden/internal variant
- identical musical output if possible

Then compare:
- undo menu behavior
- user interaction feel
- automation implications
- save/reload behavior

This would create practical repo evidence instead of relying only on principle.

---

## Recommended practice

Until the experiment exists, this repo should train the AI to follow these rules:

1. Do not expose a parameter as a normal Live-facing control just because it is interesting to watch.
2. Separate user-editable host-facing parameters from rapidly changing internal state where possible.
3. Treat undo safety as a product requirement, not a cleanup detail.
4. Whenever internal modulation is central to a device, ask explicitly whether the visible control should actually be Hidden or derived.
5. Include an undo-behavior check in any serious device QA plan.

---

## Confidence

**Medium**

The core risk and the need for Hidden/internal strategies are strongly grounded.
The best reusable architectural patterns and exact severity boundaries still need direct repository experiments.

---

## Follow-up tasks

1. Build the undo stress mini-device.
2. Add a future “safe modulation interface” design note.
3. Create a QA checklist item specifically for undo-behavior validation.
4. Document UI patterns for internal-state transparency without exposing unsafe parameters.

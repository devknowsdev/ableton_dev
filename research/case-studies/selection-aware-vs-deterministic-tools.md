# Selection-aware vs deterministic tools

## Why this matters

Many of the most attractive LiveAPI workflows are selection-aware.
They let a tool act on whatever the user is currently looking at:
- selected track
- detail device
- highlighted clip slot

This feels elegant and immediate.
But it can also be fragile, ambiguous, and difficult to test if the tool’s target depends too heavily on UI focus.

This topic matters for:
- AI assistant design
- LiveAPI utility design
- user trust
- debugging clarity
- product safety

---

## Question

When should a tool rely on current UI selection, and when should it require or derive a more deterministic structural target?

---

## Evidence sources

- [x] Official public source
- [x] Repository experiment
- [x] Strong inference
- [x] Open question

This case study draws on:
- the LiveAPI view-context paths already documented in the repo
- the selected-track and selected-device utility scaffolds already created in `examples/`
- strong design inference from their strengths and fragilities

---

## Verified

The following points are well supported by existing repo knowledge and practical examples:

1. `live_set view` paths provide fast access to current UI context such as selected track and detail device.
2. These paths are extremely useful for assistant-style and debugging-style workflows.
3. They are inherently contextual and can change as the user changes focus.
4. Structural paths such as `live_set tracks N devices N` are more deterministic but less naturally aligned with what the user is looking at.

---

## Observed / repository-aligned reasoning

The repo’s current utilities already reveal the split clearly:

### Selection-aware style
Examples:
- selected-track inspector
- selected-device parameter browser

Strengths:
- intuitive for the user
- fast to prototype
- aligned with “work on what I’m looking at” workflows

Weaknesses:
- ambiguous target if user focus shifts unexpectedly
- harder to reason about in repeatable automation flows
- easier to misuse if the AI does not clearly communicate assumed target

### Deterministic style
Examples would be tools based on explicit track/device/scene indexes or named targets.

Strengths:
- more testable
- more repeatable
- better for batch actions or explicit transformations

Weaknesses:
- less fluid in interactive use
- can feel cumbersome if the user already signaled intent through Live’s UI

This suggests that the right question is not “which is better?”
It is “which is appropriate for this class of task?”

---

## Likely implications

### Implication 1: the repo should model two tool modes explicitly
A strong future design vocabulary for AI-in-Live tooling may be:

#### Focus-based mode
Operate on current selection or detail context.
Best for:
- inspection
- debugging
- quick transformations
- exploratory assistance

#### Explicit-target mode
Operate on a named, indexed, or otherwise resolved structural target.
Best for:
- repeatable edits
- batch work
- risky write actions
- situations where reproducibility matters more than convenience

### Implication 2: selection-aware tools should announce their target
A selection-aware tool should ideally make its target visible before or while acting.
This could be through:
- a printed summary
- a UI confirmation label
- a route-tagged output message
- a “currently acting on” field in the device UI

### Implication 3: dangerous actions should lean deterministic
If an action can significantly alter session state, a more explicit target strategy is likely safer.
Examples might include:
- destructive parameter rewrites
- broad batch edits
- scene-wide manipulations
- operations whose result would be hard to reverse cleanly

---

## Fringe cases / failure modes

### 1. Target drift during use
The user changes selection between inspection and action, and the tool acts on the wrong object.

### 2. Implicit assumption mismatch
The AI assumes the user meant “selected track,” while the user expected “detail device” or vice versa.

### 3. Hidden context dependency
A script works well in manual testing but becomes confusing because its behavior depends on focus state not visible in the UI.

### 4. Overly rigid deterministic workflow
A tool that should have been quick and context-sensitive becomes frustrating because it requires too much explicit targeting.

### 5. Mixed-mode confusion
A tool uses both selection and explicit indexing without clearly telling the user which source of truth currently wins.

---

## What remains uncertain

1. Which classes of user actions most benefit from selection-aware mode in practice?
2. What UX language best communicates “current target” inside Max for Live tools?
3. How often should a selection-aware tool re-resolve its target during interaction?
4. What is the safest balance between convenience and reproducibility for AI-assisted write actions?

---

## Smallest useful experiment

### Paired utility experiment
Create two tiny tools that perform the same family of task:
- one selection-aware
- one explicit-target

For example, a parameter inspector that works on:
- current detail device
- explicit track/device index

Then compare:
- ease of use
- likelihood of target confusion
- clarity during debugging
- suitability for repetitive tasks

This would turn the current design intuition into more grounded repo knowledge.

---

## Recommended practice

Until more experiments exist, this repo should train the AI to follow these rules:

1. Use selection-aware mode for inspection, lightweight assistance, and exploratory workflows.
2. Use explicit-target mode for high-stakes or repeatable edits.
3. In selection-aware mode, always expose or print the resolved target.
4. Do not mix selection and explicit targeting without stating which one wins.
5. Treat target clarity as part of product quality, not just implementation detail.

---

## Confidence

**Medium**

The distinction and its practical importance are strongly supported by existing repo work and sound design reasoning.
The best decision rules and UX patterns still need more direct experiments.

---

## Follow-up tasks

1. Build paired selection-aware and deterministic utilities for one shared task.
2. Add a “current target” UI convention note for assistant-style Max devices.
3. Extend the selected-device browser with an optional explicit target mode.
4. Create a small testing note on target drift and user trust.

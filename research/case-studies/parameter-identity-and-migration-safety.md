# Parameter identity and migration safety

## Why this matters

Parameter identity is one of the most important long-term compatibility concerns in Max for Live device development.

A device can sound correct, feel polished, and still become unsafe to evolve if parameter identity changes in ways that break old Live Sets, automation, mappings, or user expectations.

This topic matters for:
- save / recall safety
- upgrade safety
- user trust
- release discipline
- the design of AI-generated device changes

---

## Question

How should this repository think about **parameter identity** so that an AI can propose changes to Max for Live devices without casually creating migration bugs?

---

## Evidence sources

- [x] Official public source
- [ ] Repository experiment
- [x] Strong inference
- [x] Open question

Primary grounding currently comes from Ableton’s Max for Live Production Guidelines, especially the sections on parameter naming, saving/recall, and updates.

---

## Verified

The following points are strongly supported by the official public guidance already captured in this repo’s source base:

1. Parameter names matter for how parameters appear in automation and mapping contexts.
2. Long Name and Short Name quality are part of device usability, not just metadata quality.
3. Save/recall behavior is a first-class concern for production Max for Live devices.
4. Changing important parameter identity across updates can break value recall in older Live Sets.
5. Device updates should be treated with compatibility discipline, not as freeform rewrites.

---

## Observed / repository-aligned reasoning

Even without a dedicated migration experiment yet, the current repository structure already implies a source-first and release-aware workflow.
That makes parameter identity a design object rather than an afterthought.

In practical terms, parameter identity appears to include at least these dimensions:
- user-visible label identity
- automation-facing identity
- storage/recall identity
- ordering expectations in device UI and Push-like contexts
- semantic meaning of the parameter over time

This suggests that migration safety is not only about avoiding renames.
A parameter may also become effectively incompatible if:
- its meaning changes drastically while the name stays the same
- its range semantics shift enough to make old values misleading
- its role in the UI changes enough that old automation becomes confusing

These latter points are currently **strong inference**, not fully verified repo fact.

---

## Likely implications

### Implication 1: parameter changes should be classified by migration risk
Not all parameter edits are equally dangerous.

A useful future classification could be:

#### Low migration risk
- improving Info Text
- visual presentation changes that do not alter identity or behavior
- adding new parameters without disturbing existing ones, if ordering and mapping consequences are understood

#### Medium migration risk
- changing default values
- reordering visible controls
- changing parameter grouping or browsing experience
- changing modulation expectations while keeping identity stable

#### High migration risk
- renaming important parameters
- removing parameters
- reusing an old parameter name for a different function
- drastically changing scaling/meaning without explicit migration handling

This classification is not yet experimentally validated, but it is a strong and useful design abstraction.

### Implication 2: AI-proposed device edits need a migration check
An AI assistant should not treat parameter edits as ordinary refactors.
It should ask:
- is this device already released or used in saved sets?
- does this change alter parameter identity?
- does it alter recall semantics?
- does it require a versioned release instead of in-place replacement?

### Implication 3: compatibility needs explicit artifacts
If the repo is to train expert judgment, it should eventually contain:
- a parameter compatibility checklist
- a release dossier template
- a diff-oriented parameter audit habit for evolving devices

---

## Fringe cases / failure modes

### 1. Same name, different meaning
A parameter keeps its name but changes musical function.
This may technically preserve recall while practically breaking user intent.

### 2. Different name, same meaning
A parameter rename may feel harmless but can still damage recall or automation continuity.

### 3. Added parameters with shifted ordering expectations
Even if existing names remain, a new parameter layout can alter user mental models, controller workflows, or browser expectations.

### 4. Duplicated or auto-indexed names
Multiple copies of abstractions may produce names that look stable during development but drift in ways that make release behavior fragile.

### 5. Partially migrated devices
A device update may preserve some parameters cleanly while silently breaking a subset, which is harder to notice than total failure.

---

## What remains uncertain

Several important points still need direct experiments or sharper documentation:

1. Which concrete parameter edits are the most dangerous in Live Sets already using a device?
2. How much parameter reordering matters in practice for different user workflows?
3. What is the best repo-level representation of “parameter identity contracts” for a device?
4. What automated or semi-automated audit tooling is realistic inside this repo?

---

## Smallest useful experiment

The next high-value experiment would be:

### Migration mini-device experiment
Build a tiny Max for Live test device with a few clearly named `[live.*]` parameters.
Then create versioned variants that change exactly one thing at a time:
- rename one parameter
- change one parameter’s role but not its name
- add a new parameter
- reorder visible parameters

For each variant:
- save a Live Set with non-default values
- reopen using the changed device
- observe what still recalls correctly and what becomes misleading

This would convert several strong inferences here into repo-level evidence.

---

## Recommended practice

Until the experiment exists, this repo should train the AI to follow these rules:

1. Treat parameter identity as compatibility-critical.
2. Preserve Long Names unless there is a strong reason and a release strategy.
3. Assume released devices have a migration surface, not just a code surface.
4. Describe parameter changes in terms of migration risk.
5. Prefer versioned releases when a change may invalidate old-set expectations.

---

## Confidence

**Medium**

The broad importance of parameter identity and migration discipline is well grounded.
The finer-grained classification of migration risk and some of the semantic failure modes are still inference-rich and should be tested explicitly.

---

## Follow-up tasks

1. Add a parameter compatibility checklist template.
2. Build the migration mini-device experiment.
3. Add a release dossier template for device updates.
4. Create a future audit note on “same name, different meaning” parameter hazards.

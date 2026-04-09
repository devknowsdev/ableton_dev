# Live as plugin host: research note

## Why this matters

If this repository is meant to support expert-level Ableton judgment, it cannot stop at Max for Live and LiveAPI.
It also needs to treat Live as a **plugin host** with practical behavior that matters for external plugin developers.

A strong AI should know the difference between:
- writing a plugin
- writing a Max for Live device
- validating a plugin inside Live as host

This topic matters for:
- external plugin strategy
- host validation
- compatibility thinking
- avoiding misleading Ableton-specific assumptions

---

## Question

How should this repository frame Live as a plugin host so that an AI can reason intelligently about external plugin development without pretending Ableton provides a single unified plugin-authoring surface?

---

## Evidence sources

- [x] Official public source
- [ ] Repository experiment
- [x] Strong inference
- [x] Open question

This note is intentionally cautious.
The repository currently has stronger grounding on Max for Live and Link than on the full current external-plugin host guidance surface.
So this note is partly a research map rather than a finished authoritative statement.

---

## Verified

The following points are safe and important:

1. External plugin development is a different surface from Max for Live development.
2. Max for Live devices are Live-specific device constructs; external plugins are not the same category.
3. Live still matters as a host for external plugins, because host behavior affects validation, compatibility, and user experience.
4. A serious Ableton-focused knowledge base should include host-facing plugin notes, not only in-Live device notes.

---

## Observed / repository-aligned reasoning

The current repo already emphasizes a key distinction:
- **Max for Live** is the native-in-Live device path
- **external plugins** are built outside that path and then evaluated in Live as host

This means an expert AI should not ask only:
- “how do I implement the plugin?”

It should also ask:
- “what assumptions might hold in one host but behave differently in Live?”
- “what should be validated specifically inside Live?”
- “what user-facing expectations inside Live change what counts as a good plugin behavior?”

This strongly suggests that the repository should eventually maintain a dedicated host-validation layer.

---

## Likely implications

### Implication 1: external plugin notes need a host-validation section
Any serious plugin-related note in this repo should eventually separate:
- portable plugin logic
- Live-specific host validation concerns

### Implication 2: the repo should avoid fake Ableton-specific plugin mythology
A weak repo would blur everything together and imply that “Ableton development” is one giant surface.
A strong repo should keep the boundaries clear.

### Implication 3: Live-host behavior should be documented as a practical layer
Useful host-facing topics may include:
- parameter behavior inside Live
- recall expectations in Live Sets
- expressive-control expectations
- preset/browsing consequences where relevant
- validation scenarios specific to Live workflows

These are not necessarily proprietary Ableton authoring topics.
They are host-facing product realities.

---

## Fringe cases / failure modes

### 1. Cross-host assumption drift
A plugin behaves acceptably in another host and the developer assumes that is enough, without validating Live-specific workflow consequences.

### 2. Category confusion
A discussion about external plugins gets contaminated by Max-for-Live-specific assumptions.

### 3. Over-Abletonization
An AI starts talking as though Ableton supplies a universal plugin-building environment for all plugin work.

### 4. Under-validation
The plugin is built well in general, but not examined carefully inside Live’s actual user-facing environment.

---

## What remains uncertain

This note deliberately leaves several points open until the repo has stronger direct grounding:

1. Which host-facing plugin edge cases matter most in current Live versions?
2. What official public guidance should become the canonical host-validation source set in this repo?
3. What is the right checklist for testing external plugins specifically in Live?
4. Where does Live’s practical behavior diverge most meaningfully from naive “all hosts are the same” assumptions?

---

## Smallest useful experiment

### Host-validation checklist seed
The next useful step is not a broad claim.
It is to begin a dedicated note that captures candidate host-validation categories for external plugins in Live, then fill it only with:
- clearly sourced official public guidance
- clearly labeled repo experiments

That would let this area grow carefully instead of speculatively.

---

## Recommended practice

Until deeper host research is added, this repo should train the AI to follow these rules:

1. Keep Max for Live and external plugin development conceptually separate.
2. Treat Live as an important host-validation environment for plugins.
3. Do not present Live-specific plugin guidance as broader than the available evidence supports.
4. When discussing plugin behavior, distinguish implementation from host validation.
5. Build this part of the repo cautiously and source-first.

---

## Confidence

**Medium-Low**

The high-level distinction and the need for host-specific validation are solid.
The detailed host-behavior body of knowledge for current Live versions still needs more direct sourcing and future research work.

---

## Follow-up tasks

1. Create a host-validation checklist seed document.
2. Add official-source plugin-host notes as they are verified.
3. Collect experiment ideas that compare portable assumptions with Live-host realities.
4. Keep this area clearly separated from Max for Live notes.

# Expert repo vision

## Purpose

This repository should not merely help an AI produce snippets or basic Max for Live experiments.
It should be structured so that an AI can develop **expert-level judgment** about Ableton-related development work.

The standard is not:
- "can answer beginner questions"
- "can build toy devices"
- "can repeat API paths from memory"

The standard is closer to:
- can reason across product surfaces
- can distinguish platform fact from inference
- can anticipate edge cases before they become bugs
- can propose implementation strategies with tradeoffs
- can preserve compatibility over time
- can investigate ambiguous behavior rather than bluffing
- can move from reference material to working product decisions

The benchmark idea is:

**Could this repo help turn an AI into a collaborator who would not be out of place on a serious Ableton product or developer-tools team?**

That does not mean the AI must know every internal detail.
It means the repo should cultivate:
- deep technical understanding
- disciplined uncertainty handling
- broad product awareness
- research habits
- release-minded thinking
- creativity grounded in platform reality

---

## What “expert” means here

In this repository, expert-level capability means the AI can do all of the following.

### 1. Model the platform correctly
The AI should understand the differences between:
- Max for Live devices
- external plugins hosted by Live
- Live API / LOM driven tooling
- controller / remote script development
- external sync-aware apps using Ableton Link
- packaging, distribution, and compatibility work

### 2. Work at multiple abstraction levels
The AI should be able to move fluidly between:
- product idea
- architecture
- object model / API paths
- implementation scaffolding
- testing and QA
- release compatibility and migration risk

### 3. Handle uncertainty well
A strong system should not fake certainty.
It should be able to say:
- what is verified
- what is likely but not yet verified
- what depends on current official docs
- what needs live testing in Max / Live

### 4. Anticipate fringe cases
The AI should not only know the happy path.
It should understand likely trouble around:
- selection-dependent behavior
- parameter recall
- undo history
- automation interaction
- multiple-instance interference
- frozen vs source device drift
- cross-version and cross-platform behavior
- Live UI context assumptions

### 5. Generate innovative but grounded ideas
Innovation is useful only when it respects the real platform.
The AI should be able to invent:
- smarter tooling
- debugging utilities
- workflow accelerators
- novel device interaction models
- safer abstractions

But it should do so while remaining aware of:
- Live’s hosting model
- Max for Live constraints
- productization effort
- maintainability
- user trust and safety

---

## What this repo should contain

The repo should gradually become a layered system.

### Layer 1: canonical orientation
Documents that explain the platform surfaces and how they differ.

### Layer 2: operational references
Fast working notes for Live API, Max for Live, parameter handling, packaging, QA, release discipline, and host behavior.

### Layer 3: research-grade notes
Deep analysis of edge cases, version shifts, design tradeoffs, and observed behavior.

### Layer 4: executable scaffolds
Small utilities and experiments that let the AI connect theory with real Live/Max behavior.

### Layer 5: frontier thinking
Open problems, unanswered questions, experimental hypotheses, and innovation prompts.

The mistake to avoid is letting executable examples become the whole repo.
Examples should support the knowledge base, not replace it.

---

## Core principles for repository growth

### Principle 1: Official-source anchored
Prefer official public sources where possible.
When a note is based on an experiment, make that explicit.
When a note is based on memory or likely inference, label it clearly.

### Principle 2: Structured depth
Do not dump information randomly.
Every deep note should say:
- what problem it addresses
- what is verified
- what remains uncertain
- why it matters
- what design consequence follows

### Principle 3: Edge-case first thinking
Whenever a new pattern or device idea is added, ask:
- what breaks when selection changes?
- what breaks when there are zero devices?
- what breaks with multiple instances?
- what breaks after save/reload?
- what breaks across Live versions?
- what breaks in automation or undo?

### Principle 4: Product realism
The AI should learn not only how to make something work, but how to make it releasable.
That includes:
- QA criteria
- parameter naming discipline
- frozen vs source management
- user-facing clarity
- compatibility preservation

### Principle 5: Innovation with constraints
The repo should encourage novel ideas, but every proposal should also ask:
- what platform surface is this really on?
- what would implementation complexity be?
- what part is fragile?
- what would need live validation?

---

## Repository ambition

A strong future state for this repo would let an AI do all of these well:
- explain the right development surface for a new idea
- scaffold a Max for Live utility quickly and safely
- reason about external-plugin implications in Live as host
- trace Live API paths and likely object relationships
- anticipate parameter and recall risks
- propose test plans before coding
- identify likely migration hazards
- convert scattered notes into a stable product strategy
- investigate ambiguous behavior without pretending certainty

That is the level this repo should aim for.

---

## Near-term direction

In the short term, the best way to move toward this vision is to keep expanding four areas in parallel:

1. **Deep documentation**
2. **Edge-case and frontier research notes**
3. **Small executable experiments**
4. **Methodology and evidence standards**

This balance is what turns a useful repo into an expert-training repo.

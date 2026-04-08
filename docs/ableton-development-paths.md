# Ableton development paths

## Purpose

This document is the practical map for deciding **what kind of Ableton-related thing we are building** before choosing tools, architecture, or documentation.

The most important distinction is that “Ableton development” is not one single path. In practice, it splits into different surfaces with different constraints:

1. **Max for Live devices**
2. **External audio plugins hosted by Live**
3. **External apps and companion tools that sync with Live or other apps**
4. **Controller / remote script workflows**

Choosing the wrong surface early will cause wasted effort.

---

## 1. Max for Live devices

Use this path when the goal is to build something that should feel like a **native Live device** inside the device chain.

Typical use cases:
- MIDI devices
- audio effects
- instruments
- Live-aware utilities
- tools that expose parameters in Live
- tools that need close interaction with Live’s UI, mapping, automation, or object model

This is the most direct route for making something that behaves like an Ableton-native extension.

### Why this is the default starting point

Ableton’s own `maxdevtools` repository says it contains resources and tools used at Ableton when building and maintaining Max devices, and points new builders toward the **Building Max Devices** pack for getting started. That strongly suggests that Max for Live is the main official path for building in-Live devices rather than a side option.

### Main development concerns

Max for Live work is not just “make a patch that functions.” It also includes:
- automation behavior
- parameter naming
- MIDI mapping
- Push support
- device width and UI design
- dependency management
- save / recall reliability
- performance and CPU behavior
- cross-platform compatibility
- frozen vs unfrozen version management

### Key references

Start with:
- Live API Overview
- Live Object Model (LOM)
- Building Max Devices
- Ableton `maxdevtools`

---

## 2. External audio plugins hosted by Live

Use this path when the goal is to build a **standard plugin** that Live can host alongside plugins in other DAWs.

Typical use cases:
- a plugin intended for use in multiple DAWs
- DSP code that should not depend on Max for Live
- commercial plugin products that need broad host compatibility
- existing plugin codebases that should also work in Live

### Important boundary

This is **not** the same thing as Max for Live.

A Max for Live device is a Live-specific device format and workflow.
An external plugin is built outside Ableton and then validated in Live as a host.

### Working assumption for this repo

Treat external plugin work as:
- standard plugin development outside Ableton
- host validation inside Live
- targeted checks for Live-specific behavior such as parameter handling, recall, and expressive control support when relevant

### Caution

This repo currently does **not** contain the full current official Ableton plugin-portal material.
Before implementation details are treated as final, verify them against the latest official public developer pages.

### When to prefer this path over Max for Live

Choose external plugin development when:
- the product must run in multiple DAWs
- the codebase needs a conventional plugin architecture
- the product should not depend on Max / Max for Live licensing or packaging
- deep DSP portability matters more than tight Live-specific integration

---

## 3. External apps and companion tools

Use this path when the goal is **not** to be a plugin or device in Live, but a separate app or tool that interacts musically with Live.

Typical use cases:
- sync-aware music apps
- tempo / beat / phase-synced tools
- performance companions
- networked music systems
- utilities that communicate with Live indirectly

### Ableton Link

Ableton Link is the clearest official public technology here.

The public Ableton Link repository describes Link as a technology that synchronizes **beat, tempo, and phase** across multiple applications on one or more devices on a local network. It also states that applications can start and stop independently while staying in time, and that tempo changes propagate across the session.

The same repository describes Link as a **header-only** library and includes build guidance for CMake and other build systems.

### What Link is for

Link is for **sync**, not for:
- building a Max for Live device
- building a conventional hosted audio plugin by itself
- replacing the Live API

### When to choose this path

Choose Link or an external-app workflow when:
- the tool should run as its own app
- the tool should sync with Live or other music software
- the goal is a companion utility rather than a hosted device

---

## 4. Controller / remote script workflows

Use this path when the goal is to control Live from hardware or supported script layers rather than build a new audio device.

Typical use cases:
- controller integration
- custom mappings
- workflow acceleration
- navigation and transport control
- custom control-surface behaviors

This path is adjacent to device building, but it is its own category.

### Important distinction

A control-surface script is not:
- a Max for Live device
- a standard audio plugin
- an external sync app

It is a way of controlling Live’s behavior and hardware interaction.

---

## How to choose the correct path

### Choose Max for Live when:
- it should live in the device chain
- it should feel native inside Live
- it needs Live-style parameters and mapping
- it benefits from fast iteration inside Live

### Choose an external plugin when:
- it must run in multiple DAWs
- portability is a core requirement
- it should follow a standard plugin product path

### Choose an external app with Link when:
- it should run outside Live
- it needs tempo/beat/phase sync
- it is a companion tool, not a hosted device

### Choose controller scripting when:
- the main job is controlling Live or hardware integration
- audio processing is not the primary surface

---

## Practical default for this repo

Default to **Max for Live first** unless there is a strong reason not to.

Why:
- it is the shortest path to something that feels native in Ableton
- it has clear official development guidance available publicly
- it matches the current purpose of this repository
- it is a better early experimentation surface for many Ableton-focused ideas

Move to the external-plugin path only when cross-DAW portability is actually required.
Use Link only when the thing is truly an external app or sync system.

---

## Decision rule

Before starting a new project, answer this sentence:

**Where should this thing live?**

- inside Live as a device → **Max for Live**
- inside many DAWs as a hosted plugin → **external plugin**
- outside Live as a sync-aware app → **external app / Link**
- inside Live as controller logic → **control-surface scripting**

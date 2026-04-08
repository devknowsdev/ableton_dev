# Live API cheatsheet v1

## Purpose

This is the first practical quick reference for working with Ableton Live through the Live API.

It is designed to answer the questions that come up most often during development:
- Where do I start in the object model?
- How do I reach tracks, devices, clips, scenes, and parameters?
- How do I observe changes safely?
- What are the usual paths for transport and selection work?

This is a **first-pass operational guide**, not a complete replacement for the official Live Object Model (LOM).
When exact property or method names matter, verify against the current LOM.

---

## 1. Core mental model

The Live API is easiest to use if you think in three layers:

### Layer A: find an object
Use a **canonical path** or an object id to locate something in Live.

Typical tools:
- `[live.path]`
- `LiveAPI` in JavaScript

### Layer B: inspect or control the object
Once you have an id or object reference, read properties or call methods on it.

Typical tools:
- `[live.object]`
- `LiveAPI.get()` / `LiveAPI.set()` / `LiveAPI.call()` in JavaScript

### Layer C: observe change
Use observers for changing state rather than polling everything constantly.

Typical tools:
- `[live.observer]`
- callback-driven `LiveAPI` usage in JavaScript

---

## 2. The root object

Most work starts from:

`live_set`

Think of `live_set` as the root of the Live document.
From there, you move down into:
- tracks
- return tracks
- master track
- scenes
- view

### Useful starting paths
- `live_set`
- `live_set tracks N`
- `live_set return_tracks N`
- `live_set master_track`
- `live_set scenes N`
- `live_set view`

---

## 3. Canonical path patterns you will use often

In practice, most navigation follows a small number of repeating shapes.

### Tracks
- `live_set tracks N`
- `live_set return_tracks N`
- `live_set master_track`

### Track contents
- `live_set tracks N devices N`
- `live_set tracks N clip_slots N`
- `live_set tracks N mixer_device`

### Mixer parameters
Common mixer parameter paths usually go through the track’s mixer device:
- `live_set tracks N mixer_device volume`
- `live_set tracks N mixer_device panning`
- `live_set tracks N mixer_device sends N`

### Device parameters
- `live_set tracks N devices N parameters N`

### Scenes and clips
- `live_set scenes N`
- `live_set tracks N clip_slots N`
- `live_set tracks N clip_slots N clip`

### View / current UI selection
These are often the fastest way to reach whatever the user is currently focused on:
- `live_set view selected_track`
- `live_set view selected_scene`
- `live_set view highlighted_clip_slot`
- `live_set view detail_clip`
- `live_set view detail_device`

### Indexing rule
When navigating lists, treat indexes as **zero-based unless the current LOM says otherwise**.

---

## 4. The most important object families

### Track
A track is a hub object.
From a track you commonly care about:
- name
- color
- mute / solo / arm-style state when relevant
- `devices`
- `clip_slots`
- `mixer_device`
- `playing_slot_index`

A lot of workflows begin by finding the selected track, then walking down to devices or clips.

### Device
A device usually matters for:
- name
- class or type information
- whether it can have chains
- its `parameters`

When building tooling, the usual pattern is:
1. resolve a track
2. resolve a device on that track
3. enumerate parameters
4. read or set the parameter values you care about

### Parameter
Parameters are often the most important terminal objects.
For a parameter, you typically care about:
- name
- current value
- minimum / maximum range
- whether it is quantized or continuous
- whether it is enabled or available

### Clip slot
A clip slot is the Session View container.
Typical things to check:
- whether it has a clip
- whether it is playing or triggered
- whether to fire or stop it

### Clip
A clip is where you usually inspect or control:
- name
- looping state
- start / end markers
- playback-related properties
- note or envelope data when relevant to the clip type and API surface

### Scene
A scene usually matters when launching or navigating Session View structure.

### View
`live_set view` is critical because it exposes UI-focused state.
It is often the cleanest way to answer questions like:
- what track is currently selected?
- what clip slot is currently highlighted?
- what detail object is visible right now?

---

## 5. The usual development pattern

For most tasks, use this sequence:

1. **Resolve the object** with `[live.path]` or a `LiveAPI` path.
2. **Turn that into an object reference**.
3. **Read properties** to discover state.
4. **Call methods or set values** only when needed.
5. **Observe the smallest useful property** if you need updates over time.

That pattern is safer than trying to hard-code everything at once.

---

## 6. Common tasks

### Task: get the currently selected track
Use:
- `live_set view selected_track`

Typical pattern:
1. resolve the path
2. get the track id
3. inspect properties like `name`
4. walk into `devices`, `clip_slots`, or `mixer_device`

### Task: get the highlighted clip slot
Use:
- `live_set view highlighted_clip_slot`

Then:
- check whether it actually contains a clip
- if it does, follow the `clip` child

### Task: get the device currently shown in detail view
Use:
- `live_set view detail_device`

This is often useful for AI-assisted workflows that operate on what the user is actively looking at.

### Task: inspect a device parameter
Use a path like:
- `live_set tracks 0 devices 0 parameters 5`

Then inspect:
- name
- value
- min / max or equivalent range information

### Task: control mixer volume or pan
Resolve the track first, then go through:
- `mixer_device volume`
- `mixer_device panning`
- `mixer_device sends N`

### Task: launch a clip slot or scene
Usual targets are:
- clip slot object → launch/fire-style method
- scene object → fire-style method

Verify the exact current method name in the LOM before implementation.

### Task: read or control transport state
Start at:
- `live_set`

This is the usual home for transport-level properties and methods such as:
- tempo
- current song time
- play state
- loop state
- metronome-related state

Again, verify exact property or method names before writing production code.

---

## 7. Observation patterns

### Observe scalars, not the whole world
Good observer targets are things like:
- selected track
- selected scene
- highlighted clip slot
- parameter value
- playing slot index
- play state

Avoid trying to observe huge structures indirectly when a smaller property gives you the answer.

### Rebind when context changes
If you observe something derived from selection, remember that the selected object can change.
A common pattern is:
1. observe `selected_track`
2. when it changes, resolve the new track
3. attach or move lower-level observers as needed

### Object ids are runtime handles
Do not assume ids are permanent across sessions or set reloads.
If you need stability, prefer:
- canonical paths where appropriate
- your own stored intent
- careful re-resolution logic

---

## 8. Max object roles at a glance

### `[live.path]`
Use when you want to:
- resolve a canonical path
- move to a child path
- convert a path into an id

### `[live.object]`
Use when you want to:
- get properties
- set properties
- call methods on the current object

### `[live.observer]`
Use when you want to:
- subscribe to a changing property
- react to Live state changes without crude polling

### `LiveAPI` in JavaScript
Use when you want:
- more procedural control
- reusable helper code
- path-based resolution and object manipulation inside JS

---

## 9. First-pass JavaScript patterns

### Pattern: selected track
Use a `LiveAPI` object aimed at:
- `live_set view selected_track`

Then:
- read the id
- inspect properties like `name`
- branch into device or mixer traversal

### Pattern: parameter helper
Build a helper that accepts:
- track index
- device index
- parameter index

Then resolves:
- `live_set tracks N devices N parameters N`

This is one of the most reusable helper patterns in Live tooling.

### Pattern: selection-aware tool
Resolve from:
- `live_set view detail_device`
or
- `live_set view selected_track`

This lets a tool act on the user’s current context instead of hard-coded indices.

---

## 10. Common gotchas

### Gotcha: confusing clip slots with clips
A clip slot is not the same thing as a clip.
Often you must:
1. resolve the clip slot
2. check whether a clip exists
3. only then work with the clip child

### Gotcha: ids are not durable
An object id is useful for the current runtime, not as a long-term reference format.

### Gotcha: selection paths are contextual
`selected_track`, `detail_device`, and `highlighted_clip_slot` are extremely useful, but they are UI-context-dependent.
They are ideal for assistant workflows, but not always for deterministic batch logic.

### Gotcha: list indexes are brittle
Hard-coded indexes are fine for experiments.
For durable tooling, prefer a strategy that can also identify targets by name, role, or current selection.

### Gotcha: exact methods matter
The rough path structure is often easy to remember.
Exact method names are where mistakes happen.
Before final implementation, verify the current LOM for:
- launch methods
- duplication methods
- delete methods
- note-edit methods
- any transport call you have not used recently

### Gotcha: Live API work can create side effects
Changing values may affect:
- automation
- undo history
- playback state
- UI focus

Treat write operations as deliberate actions.

---

## 11. Default strategy for AI-assisted tooling

When an AI tool needs to operate inside Live, prefer this order of attack:

### For user-context actions
Start from:
- `live_set view selected_track`
- `live_set view detail_device`
- `live_set view highlighted_clip_slot`

### For deterministic structural actions
Start from:
- `live_set tracks N`
- `live_set scenes N`
- `live_set tracks N devices N`

### For parameter-oriented tools
Use:
- track → device → parameter traversal
- helper functions to wrap resolution and validation

### For state updates
Observe:
- play state
- selection changes
- parameter changes
- slot or track playback indicators

This gives you a clean split between **what the user is focused on** and **what the set structurally contains**.

---

## 12. What to memorize first

If you only memorize a few things, memorize these:

- `live_set`
- `live_set view selected_track`
- `live_set view highlighted_clip_slot`
- `live_set view detail_device`
- `live_set tracks N devices N parameters N`
- `live_set tracks N mixer_device volume`
- track → device → parameter traversal
- clip slot → clip distinction
- observer rebinding when selection changes

That small set covers a surprising amount of day-to-day Live API work.

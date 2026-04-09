# Max routing example for tagged LiveAPI output

## Purpose

The selected-track inspector scripts emit **tagged lists** so they can be routed cleanly inside Max.

This note shows the simplest recommended patching pattern.

---

## Basic patch pattern

Use:

- `[js selected-track-inspector.js]`
- `[route selected_track_summary selected_track_name begin_devices device end_devices begin_parameters parameter end_parameters detail_device transport tempo_set no_devices error]`

This lets you split one outlet into multiple semantic lanes.

---

## Example message flow

If the script outputs:

```text
selected_track_summary id 27 name Bass device_count 3 clip_slot_count 8
```

Then `[route selected_track_summary ...]` will strip the tag and pass the rest:

```text
id 27 name Bass device_count 3 clip_slot_count 8
```

You can then send that to:
- `[print selected_track_summary]`
- additional parsing objects
- UI update logic

---

## Recommended first routing setup

### For summary output
Use:
- `[route selected_track_summary]`
- `[print selected_track_summary]`

### For devices
Use:
- `[route begin_devices device end_devices]`
- print each branch separately first

### For parameters
Use:
- `[route begin_parameters parameter end_parameters]`
- print each branch separately first

### For transport
Use:
- `[route transport tempo_set]`

### For error handling
Always reserve a branch for:
- `[route error]`

---

## Suggested development workflow

1. Route by the first symbol tag.
2. Print each branch to the Max console.
3. Once the output shape is stable, replace `print` objects with UI logic.
4. Keep the symbolic tags stable so routing does not break when the script evolves.

---

## Why this works well

Tagged list output is a good fit for Max because:
- it stays human-readable while debugging
- it is easy to route
- it avoids brittle positional assumptions too early
- it gives the JavaScript layer a simple contract with the patch layer

---

## Working rule for this repo

When adding new script outputs, prefer:
- one stable symbol tag at the front
- then key/value-style pairs where practical

That keeps patch wiring readable and AI-editable.

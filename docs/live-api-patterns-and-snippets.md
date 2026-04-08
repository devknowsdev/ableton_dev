# Live API patterns and snippets

## Purpose

This document turns the Live API quick reference into **reusable implementation patterns**.

It focuses on the most common developer tasks:
- selected track lookup
- selected device lookup
- parameter traversal
- highlighted clip slot inspection
- tempo read/write
- scene firing

These are **first-pass patterns** for prototyping and assistant workflows.
Before shipping production code, verify exact property and method names against the current Live Object Model (LOM).

---

## 1. Max object chain pattern

For most Max for Live Live API work, the basic object chain is:

`[live.path] -> [live.object] -> [live.observer]`

Use it like this:
- `[live.path]` to resolve a canonical path into an id
- `[live.object]` to get/set/call on that id
- `[live.observer]` to track a changing property on that object

### Working rule

Do not start by observing everything.
First resolve the smallest object that matters, then observe only the property you need.

---

## 2. Pattern: selected track

### Goal
Get the track the user currently has selected in Live.

### Canonical path
`live_set view selected_track`

### JavaScript sketch
```javascript
function getSelectedTrack() {
  var api = new LiveAPI("live_set view selected_track");
  return {
    id: api.id,
    name: api.get("name")
  };
}
```

### Notes
From this object, the most common next steps are:
- read the track name
- inspect `devices`
- inspect `clip_slots`
- inspect `mixer_device`

### When to use
Use this for assistant-style tools that should operate on whatever the user is focused on.

---

## 3. Pattern: selected track to first device

### Goal
Walk from the selected track to a specific device index.

### Path approach
1. resolve `live_set view selected_track`
2. get the track id
3. navigate to `devices N`

### JavaScript sketch
```javascript
function getDeviceOnSelectedTrack(deviceIndex) {
  var track = new LiveAPI("live_set view selected_track");
  var device = new LiveAPI("id " + track.id + " devices " + deviceIndex);
  return {
    id: device.id,
    name: device.get("name")
  };
}
```

### Notes
Hard-coded indexes are fine for prototypes.
For more durable tooling, add validation and a fallback by device name or type.

---

## 4. Pattern: selected device from detail view

### Goal
Act on the device the user is currently looking at in the detail pane.

### Canonical path
`live_set view detail_device`

### JavaScript sketch
```javascript
function getDetailDevice() {
  var api = new LiveAPI("live_set view detail_device");
  return {
    id: api.id,
    name: api.get("name")
  };
}
```

### Why it matters
This is often better than using numeric track/device indexes in creative assistant workflows, because it follows the user’s current context.

---

## 5. Pattern: enumerate parameters on a device

### Goal
Inspect the parameter list for a target device.

### Canonical structure
`track -> device -> parameters N`

### JavaScript sketch
```javascript
function getParameterInfo(trackIndex, deviceIndex, parameterIndex) {
  var api = new LiveAPI(
    "live_set tracks " + trackIndex +
    " devices " + deviceIndex +
    " parameters " + parameterIndex
  );

  return {
    id: api.id,
    name: api.get("name"),
    value: api.get("value")
  };
}
```

### Expanded helper idea
In practice, build a small wrapper that also tries to read:
- min
- max
- is_enabled or equivalent availability state
- quantization-style information if the parameter exposes it

### Notes
Exact property names vary in importance and memory is easy to get wrong here, so range and quantization fields should be confirmed against the current LOM during real implementation.

---

## 6. Pattern: parameter set helper

### Goal
Set a parameter value in a reusable, small function.

### JavaScript sketch
```javascript
function setParameterValue(trackIndex, deviceIndex, parameterIndex, value) {
  var api = new LiveAPI(
    "live_set tracks " + trackIndex +
    " devices " + deviceIndex +
    " parameters " + parameterIndex
  );

  api.set("value", value);
}
```

### Caution
Write operations can affect:
- automation
- undo history
- user expectations during playback

Use small, explicit writes rather than rapid uncontrolled updates.

---

## 7. Pattern: highlighted clip slot -> clip check

### Goal
Inspect the currently highlighted clip slot, then work with its clip only if one exists.

### Canonical path
`live_set view highlighted_clip_slot`

### JavaScript sketch
```javascript
function getHighlightedClipSlot() {
  var slot = new LiveAPI("live_set view highlighted_clip_slot");
  return { id: slot.id };
}
```

### Safe working sequence
1. resolve the highlighted clip slot
2. check whether the slot has a clip
3. only then navigate to the clip child

### Sketch for clip resolution
```javascript
function getClipFromHighlightedSlot() {
  var slot = new LiveAPI("live_set view highlighted_clip_slot");

  // Confirm the exact property name in the LOM before production use.
  // Commonly this is a has-clip style property.
  var clip = new LiveAPI("id " + slot.id + " clip");

  return {
    slotId: slot.id,
    clipId: clip.id
  };
}
```

### Working rule
Never treat a clip slot and a clip as the same object.
That is one of the easiest Live API mistakes to make.

---

## 8. Pattern: tempo read

### Goal
Read the current global tempo.

### Root object
`live_set`

### JavaScript sketch
```javascript
function getTempo() {
  var api = new LiveAPI("live_set");
  return api.get("tempo");
}
```

### Notes
This is one of the simplest global reads and is useful for utilities, sync tools, and diagnostics.

---

## 9. Pattern: tempo write

### Goal
Set the global tempo.

### JavaScript sketch
```javascript
function setTempo(value) {
  var api = new LiveAPI("live_set");
  api.set("tempo", value);
}
```

### Caution
This is a global action.
Only do this intentionally, and preferably in response to a clear user action.

---

## 10. Pattern: scene fire

### Goal
Launch a scene by index.

### Canonical structure
`live_set scenes N`

### JavaScript sketch
```javascript
function fireScene(sceneIndex) {
  var api = new LiveAPI("live_set scenes " + sceneIndex);

  // Confirm the exact current method name in the LOM before production use.
  api.call("fire");
}
```

### Notes
Scene-launching is a classic example of where the path is easy to remember and the exact callable method should still be verified before a production release.

---

## 11. Pattern: selected-track observer rebinding

### Goal
Keep a tool attached to the currently selected track even when the user changes selection.

### Why this matters
If your tool depends on the selected track, the observed object can change under you.
So the correct pattern is to observe the selection first, then rebind any lower-level observers.

### Conceptual flow
1. observe `live_set view selected_track`
2. when it changes, resolve the new track id
3. rebuild any dependent observers for:
   - track name
   - playing slot index
   - devices
   - mixer parameters

### Pseudocode
```javascript
var selectedTrackObserver = null;
var currentTrackApi = null;

function bindSelectedTrack() {
  currentTrackApi = new LiveAPI("live_set view selected_track");
  post("Selected track id: " + currentTrackApi.id + "\n");
}

function onSelectedTrackChanged() {
  bindSelectedTrack();
  // Rebind any track-specific observers here.
}
```

### Working rule
Observe the highest-level context change first.
Then re-resolve the concrete target objects.

---

## 12. Pattern: Max message flow for a parameter read

### Goal
Read a parameter value inside a Max patch without needing a full JS layer.

### Typical flow
1. send a path like `live_set tracks 0 devices 0 parameters 0` to `[live.path]`
2. send the resulting id into `[live.object]`
3. send `get value` into `[live.object]`
4. use the returned value downstream

### Working rule
This is often the cleanest first prototype when the logic is small.
Move to JavaScript only when the state management becomes more procedural.

---

## 13. Pattern: validate indexes before use

### Goal
Avoid brittle failures when a track, device, or parameter index does not exist.

### Working rule
Before assuming an index is valid, try to confirm:
- track count or presence
- device count on the target track
- parameter count on the target device

For quick experiments, fixed indexes are fine.
For durable tools, wrap traversal in validation helpers.

---

## 14. Suggested helper layer for this repo

When actual code lands in this repo, the most useful first helper functions will be:

- `getSelectedTrack()`
- `getDetailDevice()`
- `getDeviceOnSelectedTrack(index)`
- `getParameterInfo(trackIndex, deviceIndex, parameterIndex)`
- `setParameterValue(trackIndex, deviceIndex, parameterIndex, value)`
- `getTempo()`
- `setTempo(value)`
- `fireScene(sceneIndex)`

That set is small enough to stay understandable and large enough to support many AI-assisted workflows.

---

## 15. Default implementation stance

For initial tool building in this repo:

- prefer selection-aware paths for interactive tools
- prefer structural paths for deterministic batch actions
- keep write actions explicit and small
- separate path resolution from business logic
- verify method/property edge cases against the current LOM before release

This keeps prototypes fast without making the codebase careless.

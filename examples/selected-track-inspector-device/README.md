# Selected Track Inspector Device

## Purpose

This folder contains a small **Max for Live utility scaffold** built around the repo’s first LiveAPI examples.

It is meant to be the first real utility project in the repository:
- inspect the currently selected track
- list devices on that track
- inspect parameters on the first device
- inspect the currently focused detail device
- read transport state
- set tempo deliberately

This is not a finished `.amxd` release yet.
It is the **source scaffold** for building that utility in Max for Live.

---

## Files

- `selected-track-inspector.js` — the main Max JS script for the utility

---

## What the script can do

The script currently exposes these useful entry points:

- `bang` → reports selected-track summary
- `report_selected_track_summary`
- `report_selected_track_name`
- `report_devices`
- `report_first_device_parameters`
- `report_detail_device`
- `report_transport`
- `set_tempo <value>`

All output is sent out of outlet 0 as tagged lists so it can be routed or printed inside Max.

---

## Recommended first patch

Create a new Max for Live device and wire it like this:

1. Create a Max Audio Effect or Max MIDI Effect in Live.
2. Open the device in Max.
3. Add:
   - `[js selected-track-inspector.js]`
   - a few message boxes such as:
     - `bang`
     - `report_devices`
     - `report_first_device_parameters`
     - `report_detail_device`
     - `report_transport`
   - `[print inspector]`
4. Connect the message boxes into the `js` object.
5. Connect the outlet of the `js` object to `[print inspector]`.
6. Save the patch and test it in Live.

This gives you a fast working inspector without designing the UI first.

---

## Suggested next UI layer

Once the script is working, the next step is to turn it into a real utility device UI.

Recommended additions:
- a refresh button
- a selected-track name display
- a simple device list view
- a parameter list for the first or selected device
- a transport section
- a protected tempo input control

---

## Why start this way

This project is intentionally source-first.

That keeps the early device:
- readable
- easy to modify
- easy for an AI assistant to extend
- less fragile than over-designing the patch before the LiveAPI paths are proven

---

## Good next engineering steps

After basic testing in Live, the strongest next improvements are:

1. add a `route`-based parsing layer in Max for cleaner UI wiring
2. add validation for missing devices or empty selections
3. add observer-based refresh for selected track changes
4. add a selected-device parameter browser
5. turn the utility into a polished frozen `.amxd` release once stable

---

## Safety note

Some properties and callable methods in LiveAPI are easy to misremember.
Use this utility as a working scaffold, and confirm exact edge-case behavior against the current Live Object Model when hardening it for release.

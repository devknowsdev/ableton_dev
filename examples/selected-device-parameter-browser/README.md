# Selected Device Parameter Browser

## Purpose

This folder contains a small **Max for Live utility scaffold** for inspecting the device currently visible in Live’s detail view.

It is intended to help with:
- selected-device inspection
- parameter enumeration
- quick parameter testing
- AI-assisted debugging and prototyping

This is source scaffolding, not a finished `.amxd` release.

---

## Files

- `selected-device-parameter-browser.js` — the main Max JS script

---

## What the script can do

The script currently exposes these useful entry points:

- `bang` → reports selected device summary
- `report_device_summary`
- `report_parameters`
- `report_parameter <index>`
- `set_parameter <index> <value>`

All output is emitted as tagged lists from outlet 0.

---

## Recommended first patch

Create a new Max for Live device and wire it like this:

1. Create a Max Audio Effect or Max MIDI Effect in Live.
2. Open the device in Max.
3. Add:
   - `[js selected-device-parameter-browser.js]`
   - message boxes such as:
     - `bang`
     - `report_parameters`
     - `report_parameter 0`
     - `set_parameter 0 0.5`
   - `[print parameter_browser]`
4. Connect the message boxes into the `js` object.
5. Connect the outlet of the `js` object to `[print parameter_browser]`.
6. Save the patch and test it in Live.

---

## Recommended routing layer

A good first route object is:

`[route device_summary begin_parameters parameter end_parameters parameter_set error]`

This makes the browser easier to attach to UI components later.

---

## Suggested next improvements

After basic testing, the strongest next improvements are:

1. add device-selection observers so the browser refreshes automatically
2. add parameter metadata such as min/max when confirmed against the LOM
3. add a list UI for parameter selection
4. add protected write controls so parameter changes are deliberate
5. turn the utility into a polished frozen `.amxd` once behavior is stable

---

## Safety note

Parameter writing changes real device state.
Treat `set_parameter` as a deliberate action, especially during playback or while automation is active.

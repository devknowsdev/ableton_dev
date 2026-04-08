# Max for Live development principles

## Purpose

This document is the practical foundation for building serious Max for Live devices.

It is not a beginner tutorial. It is a checklist of what matters if the goal is to build devices that are stable, readable, performant, and pleasant to use in real Live Sets.

The main idea is simple:

**A good Max for Live device is not just a working patch. It is a well-behaved Live device.**

---

## 1. Build for Live, not just for Max

Max for Live sits inside Ableton Live, so the standard for success is not merely “does the patch output the right result?”

The device also needs to behave well in the Live environment.

That means thinking about:
- automation
- MIDI mapping
- save and recall
- device enable/disable state
- visual consistency with Live
- parameter naming
- Push support
- performance in a real set
- update safety for older projects

Ableton’s Max for Live Production Guidelines are useful because they frame device development in exactly these terms.

---

## 2. Freeze devices before distributing them

A core packaging rule from Ableton’s production guidance is to **freeze** a Max for Live device before sharing it.

Freezing packages the device with its dependencies so it behaves more like Live’s “Collect All and Save” concept. Without freezing, shared devices can fail because file references break on another machine.

### Working rule

- develop from the unfrozen source
- distribute frozen builds
- keep source under version control

This gives you a stable release artifact without destroying your editable source structure.

---

## 3. Use `[live.*]` UI objects when Live integration matters

Ableton’s guidance makes it clear that `[live.*]` UI objects are the correct route when you want smooth integration with Live.

These objects are designed to support:
- automation
- MIDI mapping
- saved parameter state
- default values on instantiation
- Live-like behavior in the device UI

### Working rule

If a visible control is supposed to behave like a real Live parameter, prefer a `[live.*]` object.

If you avoid `[live.*]` objects, assume you are taking on extra work and extra risk.

---

## 4. Treat parameter names as compatibility-critical

Ableton’s production guidance stresses parameter naming more than many people expect.

Why it matters:
- the user sees these names in automation and mapping contexts
- generic names look unprofessional
- Live uses parameter names to identify stored values
- changing important names later can break recall in older sets

### Working rule

For every exposed parameter:
- choose a clear **Short Name** for the UI
- choose a clear **Long Name** for automation/mapping
- keep Long Names stable across future versions
- avoid generic defaults and accidental duplicates

If a device is updated after users have saved sets with it, preserving parameter identity matters.

---

## 5. Design for save / recall from the start

A Max device that sounds right until the set is reopened is not production-ready.

Ableton’s guidance treats save/reload testing as essential. Parameters should come back correctly with Live Sets and presets, and defaults should be intentional.

### Working rule

Test every device for:
- correct initial values on a fresh instance
- correct recall after saving and reopening a Live Set
- correct behavior when duplicated
- correct behavior when multiple instances are loaded

---

## 6. Avoid undo-history flooding

One of the most practical warnings in Ableton’s guidelines is about **undo flooding**.

If a visible/stored Live parameter is driven internally at a high rate, it can generate a constant stream of undo events and make Live’s undo function effectively useless.

### Working rule

Do not blindly drive exposed `[live.*]` parameters from internal modulation.

If a control needs a native-looking UI element but is primarily internal machinery, consider whether its parameter visibility should be **Hidden**.

---

## 7. Prioritize deterministic initialization

Ableton’s production guidance explicitly warns against fixing initialization order by throwing `[delay]` or similar timing hacks at the problem.

The preference is for synchronous control of order using `[trigger]`, and for asynchronous processes to signal their own completion explicitly.

### Working rule

For initialization:
- prefer explicit ordering over timing guesses
- avoid timing hacks unless there is a true asynchronous dependency
- test startup behavior with audio on and audio off

This matters because some time-based behavior depends on the engine state.

---

## 8. Design the UI like a real device, not a patch screenshot

Ableton’s production guidance spends significant effort on design, which shows that presentation is part of device quality.

Important themes include:
- Live color-theme compatibility
- font consistency
- sensible device width
- whole-pixel layout for crisp rendering
- dynamic widths only when justified
- fold-out, tabbed, or overlay strategies for complex devices

### Working rule

A production device should:
- look intentional
- remain legible in different Live themes
- avoid wasting horizontal device space
- communicate hierarchy clearly

The UI should help the user trust the device.

---

## 9. Build for robustness, not only for the ideal case

Ableton’s guidance treats robustness as a major pillar.

That includes:
- low console noise
- sensible CPU behavior
- correct latency handling
- render/playback consistency
- compatibility across platforms
- independence of multiple simultaneous instances

### Working rule

A device is not finished until it has been tested in a real Live context:
- several tracks
- automation running
- multiple device instances
- freeze/render comparisons
- sample-rate changes if relevant

---

## 10. Use local naming and good patch organization

The production guidance highlights global vs local naming in Max. Named objects such as `[send]`, `[receive]`, `[coll]`, and `[buffer~]` can leak interactions across devices if naming is not handled carefully.

Ableton recommends using the local naming approach with leading dashes where appropriate to keep things instance-local.

### Working rule

Assume more than one instance of your device will exist.

Design names, routing, and state so devices do not accidentally interfere with each other.

Also keep the patch readable:
- encapsulate
- comment
- organize layout
- make the editable source legible if someone opens it in Max

---

## 11. Keep source and release artifacts separate

Ableton recommends continuing development from the original unfrozen version and not treating distributed frozen files as the main editable source.

### Working rule

Maintain two layers:
- **source version** for editing and version control
- **frozen release version** for distribution and stable usage

If the repo ever stores actual Max source assets, this separation should stay explicit.

---

## 12. Test updates like migrations

An updated Max for Live device is not merely “the same patch but newer.”
It is potentially a migration problem for existing Live Sets.

Ableton’s guidance emphasizes preserving parameter naming and recall behavior across versions.

### Working rule

For every update, test:
- old set opens correctly
- old parameter values still map correctly
- any persistent IDs or stored references still resolve
- the new device does not silently break user work

---

## Practical checklist for this repo

When we build Max for Live devices in this workspace, the default standard should be:

### Architecture
- keep the editable source clean and versioned
- separate release artifacts from source
- avoid hidden coupling between instances

### Parameters
- use `[live.*]` objects for real Live-facing controls
- give every parameter meaningful names
- preserve Long Names across versions
- test automation, mapping, and recall

### UI
- design for Live themes
- keep width under control
- use clear hierarchy
- avoid rough prototype-looking presentation in release builds

### Robustness
- test initialization carefully
- avoid undo flooding
- keep console output clean
- test CPU and latency in context

### Release discipline
- freeze before sharing
- keep unfrozen source in git
- test old-set compatibility before shipping updates

---

## Default development stance

When unsure, optimize for these four things:

1. **Recall safety**
2. **Parameter clarity**
3. **Robust behavior in real sets**
4. **Readable source patches**

That combination is the difference between an interesting patch and a usable device.

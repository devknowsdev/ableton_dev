/*
  Selected Track Observer

  Observes track-selection changes and reports an updated summary whenever
  the selected track changes.

  Intended for Max JavaScript in a Max for Live device.

  Notes:
  - This uses a LiveAPI callback observer pattern.
  - Exact callback payload shape can vary by context, so keep output tagging
    explicit and easy to inspect in Max.
*/

autowatch = 1;
inlets = 1;
outlets = 1;

var selectionObserver = null;

function safeGet(api, propertyName) {
  try {
    return api.get(propertyName);
  } catch (error) {
    post("safeGet failed for property '" + propertyName + "': " + error + "\n");
    return null;
  }
}

function safeGetCount(api, childName) {
  try {
    return api.getcount(childName);
  } catch (error) {
    post("safeGetCount failed for child list '" + childName + "': " + error + "\n");
    return -1;
  }
}

function getSelectedTrackApi() {
  return new LiveAPI("live_set view selected_track");
}

function loadbang() {
  start();
}

function start() {
  stop();

  selectionObserver = new LiveAPI(onSelectedTrackChanged, "live_set view");
  selectionObserver.property = "selected_track";

  outlet(0, ["observer_started", "property", "selected_track"]);
  report_selected_track_summary();
}

function stop() {
  if (selectionObserver) {
    try {
      selectionObserver.property = "";
    } catch (error) {
      post("observer stop warning: " + error + "\n");
    }
  }

  selectionObserver = null;
  outlet(0, ["observer_stopped"]);
}

function bang() {
  report_selected_track_summary();
}

function onSelectedTrackChanged() {
  outlet(0, ["selected_track_changed"]);
  report_selected_track_summary();
}

function report_selected_track_summary() {
  var trackApi = getSelectedTrackApi();

  outlet(0, [
    "selected_track_summary",
    "id", trackApi.id,
    "name", safeGet(trackApi, "name"),
    "playing_slot_index", safeGet(trackApi, "playing_slot_index"),
    "device_count", safeGetCount(trackApi, "devices"),
    "clip_slot_count", safeGetCount(trackApi, "clip_slots")
  ]);
}

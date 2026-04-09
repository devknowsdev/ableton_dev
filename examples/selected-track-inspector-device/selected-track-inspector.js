/*
  Selected Track Inspector Device

  A small Max-for-Live-oriented LiveAPI utility script that reports
  information about the currently selected track.

  This is intended as a practical scaffold, not a finished product.
  It favors readability and extension points over completeness.
*/

autowatch = 1;
inlets = 1;
outlets = 1;

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

function bang() {
  report_selected_track_summary();
}

function report_selected_track_summary() {
  var trackApi = getSelectedTrackApi();

  outlet(0, [
    "selected_track_summary",
    "id", trackApi.id,
    "name", safeGet(trackApi, "name"),
    "color", safeGet(trackApi, "color"),
    "playing_slot_index", safeGet(trackApi, "playing_slot_index"),
    "device_count", safeGetCount(trackApi, "devices"),
    "clip_slot_count", safeGetCount(trackApi, "clip_slots")
  ]);
}

function report_selected_track_name() {
  var trackApi = getSelectedTrackApi();
  outlet(0, ["selected_track_name", safeGet(trackApi, "name")]);
}

function report_devices() {
  var trackApi = getSelectedTrackApi();
  var deviceCount = safeGetCount(trackApi, "devices");
  var i;

  outlet(0, ["begin_devices", "track_id", trackApi.id, "count", deviceCount]);

  for (i = 0; i < deviceCount; i++) {
    var deviceApi = new LiveAPI("id " + trackApi.id + " devices " + i);

    outlet(0, [
      "device",
      "index", i,
      "id", deviceApi.id,
      "name", safeGet(deviceApi, "name"),
      "parameter_count", safeGetCount(deviceApi, "parameters")
    ]);
  }

  outlet(0, ["end_devices", "track_id", trackApi.id]);
}

function report_first_device_parameters() {
  var trackApi = getSelectedTrackApi();
  var deviceCount = safeGetCount(trackApi, "devices");
  var i;

  if (deviceCount < 1) {
    outlet(0, ["no_devices", "track_id", trackApi.id]);
    return;
  }

  var deviceApi = new LiveAPI("id " + trackApi.id + " devices 0");
  var parameterCount = safeGetCount(deviceApi, "parameters");

  outlet(0, [
    "begin_parameters",
    "device_id", deviceApi.id,
    "device_name", safeGet(deviceApi, "name"),
    "count", parameterCount
  ]);

  for (i = 0; i < parameterCount; i++) {
    var parameterApi = new LiveAPI("id " + deviceApi.id + " parameters " + i);

    outlet(0, [
      "parameter",
      "index", i,
      "id", parameterApi.id,
      "name", safeGet(parameterApi, "name"),
      "value", safeGet(parameterApi, "value")
    ]);
  }

  outlet(0, ["end_parameters", "device_id", deviceApi.id]);
}

function report_detail_device() {
  var deviceApi = new LiveAPI("live_set view detail_device");

  outlet(0, [
    "detail_device",
    "id", deviceApi.id,
    "name", safeGet(deviceApi, "name"),
    "parameter_count", safeGetCount(deviceApi, "parameters")
  ]);
}

function report_transport() {
  var setApi = new LiveAPI("live_set");

  outlet(0, [
    "transport",
    "tempo", safeGet(setApi, "tempo"),
    "current_song_time", safeGet(setApi, "current_song_time"),
    "is_playing", safeGet(setApi, "is_playing")
  ]);
}

function set_tempo(value) {
  var setApi = new LiveAPI("live_set");

  try {
    setApi.set("tempo", value);
    outlet(0, ["tempo_set", safeGet(setApi, "tempo")]);
  } catch (error) {
    post("set_tempo failed: " + error + "\n");
    outlet(0, ["error", "tempo_set_failed"]);
  }
}

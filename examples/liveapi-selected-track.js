/*
  LiveAPI selected-track inspector

  Intended for the Max JavaScript environment used with Max for Live.
  This file keeps the examples small and readable rather than feature-complete.

  Working assumptions:
  - LiveAPI is available in the Max JS runtime.
  - The code is being used inside a Max for Live context.
  - Exact property availability should still be confirmed against the current LOM.
*/

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

function getSelectedTrackApi() {
  return new LiveAPI("live_set view selected_track");
}

function bang() {
  reportSelectedTrack();
}

function reportSelectedTrack() {
  var trackApi = getSelectedTrackApi();
  var trackName = safeGet(trackApi, "name");

  outlet(0, [
    "selected_track",
    "id", trackApi.id,
    "name", trackName
  ]);
}

function reportSelectedTrackMixer() {
  var trackApi = getSelectedTrackApi();
  var mixerApi = new LiveAPI("id " + trackApi.id + " mixer_device");

  outlet(0, [
    "selected_track_mixer",
    "track_id", trackApi.id,
    "mixer_id", mixerApi.id
  ]);
}

function reportDetailDevice() {
  var deviceApi = new LiveAPI("live_set view detail_device");
  var deviceName = safeGet(deviceApi, "name");

  outlet(0, [
    "detail_device",
    "id", deviceApi.id,
    "name", deviceName
  ]);
}

function reportTempo() {
  var setApi = new LiveAPI("live_set");
  var tempo = safeGet(setApi, "tempo");

  outlet(0, ["tempo", tempo]);
}

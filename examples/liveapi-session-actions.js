/*
  LiveAPI session actions

  Minimal examples for tempo access, highlighted clip-slot inspection,
  and scene firing.

  Intended for Max JavaScript in a Max for Live device.
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

function get_tempo() {
  var api = new LiveAPI("live_set");
  outlet(0, ["tempo", safeGet(api, "tempo")]);
}

function set_tempo(value) {
  var api = new LiveAPI("live_set");

  try {
    api.set("tempo", value);
    outlet(0, ["tempo", safeGet(api, "tempo")]);
  } catch (error) {
    post("set_tempo failed: " + error + "\n");
    outlet(0, ["error", "set_tempo_failed"]);
  }
}

function highlighted_clip_slot() {
  var slotApi = new LiveAPI("live_set view highlighted_clip_slot");

  outlet(0, [
    "highlighted_clip_slot",
    "id", slotApi.id
  ]);
}

function highlighted_clip() {
  var slotApi = new LiveAPI("live_set view highlighted_clip_slot");
  var clipApi = new LiveAPI("id " + slotApi.id + " clip");

  outlet(0, [
    "highlighted_clip",
    "slot_id", slotApi.id,
    "clip_id", clipApi.id,
    "name", safeGet(clipApi, "name")
  ]);
}

function fire_scene(sceneIndex) {
  var sceneApi = new LiveAPI("live_set scenes " + sceneIndex);

  try {
    sceneApi.call("fire");
    outlet(0, ["scene_fired", sceneIndex, sceneApi.id]);
  } catch (error) {
    post("fire_scene failed: " + error + "\n");
    outlet(0, ["error", "fire_scene_failed"]);
  }
}

/*
  LiveAPI parameter helper

  Small utility functions for reading and setting parameters by
  track / device / parameter index.

  Intended for Max JavaScript in a Max for Live device.
*/

inlets = 1;
outlets = 1;

function makeParameterPath(trackIndex, deviceIndex, parameterIndex) {
  return "live_set tracks " + trackIndex +
    " devices " + deviceIndex +
    " parameters " + parameterIndex;
}

function getParameterApi(trackIndex, deviceIndex, parameterIndex) {
  return new LiveAPI(makeParameterPath(trackIndex, deviceIndex, parameterIndex));
}

function safeGet(api, propertyName) {
  try {
    return api.get(propertyName);
  } catch (error) {
    post("safeGet failed for property '" + propertyName + "': " + error + "\n");
    return null;
  }
}

function parameter_info(trackIndex, deviceIndex, parameterIndex) {
  var api = getParameterApi(trackIndex, deviceIndex, parameterIndex);

  outlet(0, [
    "parameter_info",
    "id", api.id,
    "track", trackIndex,
    "device", deviceIndex,
    "parameter", parameterIndex,
    "name", safeGet(api, "name"),
    "value", safeGet(api, "value")
  ]);
}

function parameter_set(trackIndex, deviceIndex, parameterIndex, value) {
  var api = getParameterApi(trackIndex, deviceIndex, parameterIndex);

  try {
    api.set("value", value);
    outlet(0, [
      "parameter_set",
      "id", api.id,
      "value", safeGet(api, "value")
    ]);
  } catch (error) {
    post("parameter_set failed: " + error + "\n");
    outlet(0, ["error", "parameter_set_failed"]);
  }
}

function selected_track_first_device_first_parameter() {
  var trackApi = new LiveAPI("live_set view selected_track");
  var parameterApi = new LiveAPI("id " + trackApi.id + " devices 0 parameters 0");

  outlet(0, [
    "selected_track_first_device_first_parameter",
    "track_id", trackApi.id,
    "parameter_id", parameterApi.id,
    "name", safeGet(parameterApi, "name"),
    "value", safeGet(parameterApi, "value")
  ]);
}

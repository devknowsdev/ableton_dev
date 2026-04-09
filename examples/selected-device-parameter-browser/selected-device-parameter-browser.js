/*
  Selected Device Parameter Browser

  A small Max-for-Live-oriented LiveAPI utility script that inspects
  the device currently shown in Live's detail view and enumerates its parameters.

  Intended as a practical scaffold rather than a finished release.
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

function getDetailDeviceApi() {
  return new LiveAPI("live_set view detail_device");
}

function bang() {
  report_device_summary();
}

function report_device_summary() {
  var deviceApi = getDetailDeviceApi();

  outlet(0, [
    "device_summary",
    "id", deviceApi.id,
    "name", safeGet(deviceApi, "name"),
    "parameter_count", safeGetCount(deviceApi, "parameters")
  ]);
}

function report_parameters() {
  var deviceApi = getDetailDeviceApi();
  var parameterCount = safeGetCount(deviceApi, "parameters");
  var i;

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

function report_parameter(parameterIndex) {
  var deviceApi = getDetailDeviceApi();
  var parameterApi = new LiveAPI("id " + deviceApi.id + " parameters " + parameterIndex);

  outlet(0, [
    "parameter",
    "index", parameterIndex,
    "id", parameterApi.id,
    "name", safeGet(parameterApi, "name"),
    "value", safeGet(parameterApi, "value")
  ]);
}

function set_parameter(parameterIndex, value) {
  var deviceApi = getDetailDeviceApi();
  var parameterApi = new LiveAPI("id " + deviceApi.id + " parameters " + parameterIndex);

  try {
    parameterApi.set("value", value);
    outlet(0, [
      "parameter_set",
      "index", parameterIndex,
      "id", parameterApi.id,
      "value", safeGet(parameterApi, "value")
    ]);
  } catch (error) {
    post("set_parameter failed: " + error + "\n");
    outlet(0, ["error", "set_parameter_failed"]);
  }
}

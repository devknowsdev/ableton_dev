/*
  Selection-Aware Detail Device Browser

  Experiment variant A for comparing selection-aware and deterministic tools.

  This script always targets the device currently shown in Live's detail view.
  It is useful for fast, context-sensitive inspection.
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

function getTargetApi() {
  return new LiveAPI("live_set view detail_device");
}

function bang() {
  report_target();
}

function report_target() {
  var deviceApi = getTargetApi();

  outlet(0, [
    "target",
    "mode", "selection_aware",
    "target_type", "detail_device",
    "id", deviceApi.id,
    "name", safeGet(deviceApi, "name"),
    "parameter_count", safeGetCount(deviceApi, "parameters")
  ]);
}

function report_parameters() {
  var deviceApi = getTargetApi();
  var parameterCount = safeGetCount(deviceApi, "parameters");
  var i;

  outlet(0, [
    "begin_parameters",
    "mode", "selection_aware",
    "target_type", "detail_device",
    "device_id", deviceApi.id,
    "device_name", safeGet(deviceApi, "name"),
    "count", parameterCount
  ]);

  for (i = 0; i < parameterCount; i++) {
    var parameterApi = new LiveAPI("id " + deviceApi.id + " parameters " + i);

    outlet(0, [
      "parameter",
      "mode", "selection_aware",
      "index", i,
      "id", parameterApi.id,
      "name", safeGet(parameterApi, "name"),
      "value", safeGet(parameterApi, "value")
    ]);
  }

  outlet(0, ["end_parameters", "mode", "selection_aware", "device_id", deviceApi.id]);
}

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;
exports.setTemporaryConfiguration = setTemporaryConfiguration;
exports.getLastLocations = getLastLocations;
exports.checkIOSAuthorization = checkIOSAuthorization;
exports.requestIOSAuthorization = requestIOSAuthorization;
exports.useLocation = useLocation;
exports.default = exports.locationEmitter = void 0;

var _nativeModule = _interopRequireDefault(require("./nativeModule"));

var _defaultConfiguration = _interopRequireDefault(require("./defaultConfiguration"));

var _reactNative = require("react-native");

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* get native module */
const {
  start,
  revertTemporaryConfiguration
} = _nativeModule.default;
/* init default configuration */

const _configuration = _defaultConfiguration.default;

function configure(configuration) {
  _nativeModule.default.configure(_objectSpread(_objectSpread({}, _configuration), configuration));
}

function setTemporaryConfiguration(configuration) {
  _nativeModule.default.setTemporaryConfiguration(_objectSpread(_objectSpread({}, _configuration), configuration));
}
/**
 * Get last `n` last locations computed by the service.
 * @param n last computed locations
 */


function getLastLocations(n) {
  return _nativeModule.default.getLastLocations(n).then(result => {
    const locations = JSON.parse(result);
    return locations;
  });
}
/**
 * Check location authorization for iOS.
 * To check for android just use AndroidPermissions
 */


function checkIOSAuthorization() {
  return _nativeModule.default.checkPermission();
}
/**
 * Request location authorization for iOS.
 * To request for android just use AndroidPermissions
 */


function requestIOSAuthorization() {
  return _nativeModule.default.askForPermission();
}
/* Native event emitter to catch geolocations event */


const locationEmitter = new _reactNative.NativeEventEmitter(_nativeModule.default);
/**
 * A React Hook which updates when the location significantly changes.
 */

exports.locationEmitter = locationEmitter;

function useLocation() {
  const [location, setLocation] = (0, _react.useState)({
    latitude: -1,
    longitude: -1,
    accuracy: Number.MAX_SAFE_INTEGER,
    time: 0
  });
  (0, _react.useEffect)(() => {
    /* get last known use position */
    getLastLocations(1).then(res => setLocation(res[0]));
    /* subscribe to the listener */

    const subscription = locationEmitter.addListener('LOCATION_UPDATED', result => {
      if (result.success) {
        setLocation(result.payload);
      }
    });
    return () => subscription.remove();
  }, []);
  return location;
}

var _default = {
  configure,
  start,
  setTemporaryConfiguration,
  revertTemporaryConfiguration,
  locationEmitter,
  getLastLocations,
  checkIOSAuthorization,
  requestIOSAuthorization
};
exports.default = _default;
//# sourceMappingURL=index.js.map
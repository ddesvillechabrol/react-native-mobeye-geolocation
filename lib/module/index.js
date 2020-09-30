function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Mobeye.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import MobeyeGeolocation from './nativeModule';
import DEFAULT_CONFIGURATION from './defaultConfiguration';
import { NativeEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';
/* get native module */

const {
  start,
  revertTemporaryConfiguration
} = MobeyeGeolocation;
/* init default configuration */

const _configuration = DEFAULT_CONFIGURATION;
export function configure(configuration) {
  MobeyeGeolocation.configure(_objectSpread(_objectSpread({}, _configuration), configuration));
}
export function setTemporaryConfiguration(configuration) {
  MobeyeGeolocation.setTemporaryConfiguration(_objectSpread(_objectSpread({}, _configuration), configuration));
}
/**
 * Get last `n` last locations computed by the service.
 * @param n last computed locations
 */

export function getLastLocations(n) {
  return MobeyeGeolocation.getLastLocations(n).then(result => {
    const locations = JSON.parse(result);
    return locations;
  });
}
/**
 * Check location authorization for iOS.
 * To check for android just use AndroidPermissions
 */

export function checkIOSAuthorization() {
  return MobeyeGeolocation.checkPermission();
}
/**
 * Request location authorization for iOS.
 * To request for android just use AndroidPermissions
 */

export function requestIOSAuthorization() {
  return MobeyeGeolocation.askForPermission();
}
/* Native event emitter to catch geolocations event */

export const locationEmitter = new NativeEventEmitter(MobeyeGeolocation);
/**
 * A React Hook which updates when the location significantly changes.
 */

export function useLocation() {
  const [location, setLocation] = useState({
    latitude: -1,
    longitude: -1,
    accuracy: Number.MAX_SAFE_INTEGER,
    time: 0
  });
  useEffect(() => {
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
export default {
  configure,
  start,
  setTemporaryConfiguration,
  revertTemporaryConfiguration,
  locationEmitter,
  getLastLocations,
  checkIOSAuthorization,
  requestIOSAuthorization
};
//# sourceMappingURL=index.js.map
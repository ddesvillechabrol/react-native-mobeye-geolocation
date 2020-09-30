"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationError = void 0;

/**
 * Copyright (c) Mobeye.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * iOS location error, android seems to never throw errors
 */
let LocationError;
exports.LocationError = LocationError;

(function (LocationError) {
  LocationError[LocationError["locationUnknown"] = 0] = "locationUnknown";
  LocationError[LocationError["denied"] = 1] = "denied";
  LocationError[LocationError["headingFailure"] = 3] = "headingFailure";
})(LocationError || (exports.LocationError = LocationError = {}));
//# sourceMappingURL=types.js.map
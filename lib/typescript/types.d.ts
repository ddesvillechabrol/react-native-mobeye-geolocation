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
export declare enum LocationError {
    locationUnknown = 0,
    denied = 1,
    headingFailure = 3
}
/**
 * Different types of accuracy
 */
export declare type AccuracyLevel = "PowerSaving" | "BalancedPower" | "BestAccuracy" | "NavigationAccuracy";
export declare type LocationConfiguration = {
    desiredAccuracy: AccuracyLevel;
    distanceFilter: number;
    updateInterval: number;
    bufferSize: number;
};
export declare type Location = {
    latitude: number;
    longitude: number;
    accuracy: number;
    time: number;
};
export declare type LocationEventSuccess = {
    success: true;
    payload: Location;
};
export declare type LocationEventError = {
    success: false;
    payload: LocationError;
};
export declare type LocationEvent = LocationEventSuccess | LocationEventError;

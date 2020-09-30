import { Location, LocationConfiguration } from './types';
import { NativeEventEmitter, PermissionStatus } from 'react-native';
export declare function configure(configuration?: Partial<LocationConfiguration>): void;
export declare function setTemporaryConfiguration(configuration?: Partial<LocationConfiguration>): void;
/**
 * Get last `n` last locations computed by the service.
 * @param n last computed locations
 */
export declare function getLastLocations(n: number): Promise<[Location]>;
/**
 * Check location authorization for iOS.
 * To check for android just use AndroidPermissions
 */
export declare function checkIOSAuthorization(): Promise<boolean>;
/**
 * Request location authorization for iOS.
 * To request for android just use AndroidPermissions
 */
export declare function requestIOSAuthorization(): Promise<PermissionStatus>;
export declare const locationEmitter: NativeEventEmitter;
/**
 * A React Hook which updates when the location significantly changes.
 */
export declare function useLocation(): Location;
declare const _default: {
    configure: typeof configure;
    start: () => void;
    setTemporaryConfiguration: typeof setTemporaryConfiguration;
    revertTemporaryConfiguration: () => void;
    locationEmitter: NativeEventEmitter;
    getLastLocations: typeof getLastLocations;
    checkIOSAuthorization: typeof checkIOSAuthorization;
    requestIOSAuthorization: typeof requestIOSAuthorization;
};
export default _default;

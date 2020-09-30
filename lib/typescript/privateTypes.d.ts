/**
 * Copyright (c) Mobeye.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { EventSubscriptionVendor, PermissionStatus } from 'react-native';
import { LocationConfiguration } from './types';
export interface GeolocationNativeModule extends EventSubscriptionVendor {
    configure: (configuration: LocationConfiguration) => Promise<boolean>;
    start: () => void;
    getLastLocations: (number: number) => Promise<string>;
    setTemporaryConfiguration: (configuration: LocationConfiguration) => Promise<boolean>;
    revertTemporaryConfiguration: () => void;
    checkPermission: () => Promise<boolean>;
    askForPermission: () => Promise<PermissionStatus>;
}

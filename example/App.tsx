/**
 * Sample React Native App
 */

import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
    checkIOSLocationAuthorization,
    initiateLocation,
    requestIOSLocationAuthorizatrion,
} from 'react-native-mobeye-geolocation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default function App() {
    const [permission, setPermission] = useState(false);
    const prevPermission = useRef(false);

    useEffect(() => {
        checkIOSLocationAuthorization().then((res) => {
            setPermission(res);
        });
    }, []);

    useEffect(() => {
        if (!prevPermission.current && permission) {
            initiateLocation();
        }
        prevPermission.current = permission;
    }, [permission]);

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>☆MobeyeGeolocation example☆</Text>
            <Text style={styles.instructions}>Have geolocation permission: {String(permission)}</Text>
            <Button
                title={'Ask permission'}
                onPress={() => {
                    requestIOSLocationAuthorizatrion().then((res) => {
                        setPermission(res === 'granted');
                    });
                }}
            />
        </View>
    );
}

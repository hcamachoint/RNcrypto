import React from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
import {useFonts} from 'expo-font';

export default function Header() {
    const [loaded] = useFonts({
        QuicksandSemiBold: require('../assets/fonts/Quicksand-SemiBold.ttf'),
    });
    if (!loaded) {return null;}

    return (
        <Text style={styles.encabezado}>CryptoReactNative APP</Text>
    )
}

const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
        fontFamily: 'QuicksandSemiBold',
        backgroundColor: '#5E49E2',
        color: '#FFF',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        marginBottom: 10,
    }
})
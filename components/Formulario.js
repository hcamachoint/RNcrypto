import React, {useState, useEffect} from 'react'
import { Alert, StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import {useFonts} from 'expo-font';
import {Picker} from '@react-native-community/picker';
import axios from 'axios'

export default function Formulario({moneda, guardarMoneda, criptomoneda, guardarCriptomoneda, guardarConsultarAPI}) {
    
    const [criptomonedas, guardarCriptomonedas] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data)
            console.log(criptomonedas)
        }
        consultarAPI();
    }, []);

    const [loaded] = useFonts({
        QuicksandLight: require('../assets/fonts/Quicksand-Light.ttf'),
    });
    if (!loaded) {
        return null;
    }   
    

    const obtenerMoneda = moneda => {
        guardarMoneda(moneda)
    }

    const obtenerCriptomoneda = cripto => {
        guardarCriptomoneda(cripto)
    }

    const cotizarPrecio = () => {
        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            mostrarAlerta();
            return;
        }
        guardarConsultarAPI(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                {text: 'OK'}
            ]
        )
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker 
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
            >
                <Picker.Item label="Seleccion una opcion" value="" />
                <Picker.Item label="Dolar de Estados Unidos " value="USD" />
                <Picker.Item label="Peso Mexicano" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>

            <Text style={styles.label}>Cryptomoneda</Text>
            <Picker 
                selectedValue={criptomoneda}
                onValueChange={cripto => obtenerCriptomoneda(cripto)}
            >
                <Picker.Item label="Seleccion una opcion" value="" />
                { criptomonedas.map( (cripto, i) => (
                    <Picker.Item key={i} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>
            <TouchableHighlight style={styles.btnCotizar} onPress={() => cotizarPrecio()}>
                <Text style={styles.txtCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'QuicksandLight',
        textTransform: 'uppercase',
        fontSize: 18,
        marginVertical: 20,
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20
    },
    txtCotizar: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'QuicksandLight',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})

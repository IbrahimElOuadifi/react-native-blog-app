import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, StyleSheet, Image } from 'react-native'
import { Appbar, TextInput, Button, Text } from 'react-native-paper'
import { AuthAPI } from '../api';
import { authUser } from '../static/functions'

const App = () => {

    const dispatch = useDispatch()

    const [ fields, setFields ] = useState({ email: 'elouadifi.ibrahim@gmail.com', password: '123456' });
    const [error, setError] = useState('');
    const [isLoadin, setLoadin] = useState(false);

    const handleSubmit = () => {
        setLoadin(true)
        AuthAPI.login(fields, (userInfo, err) => {
            setLoadin(false)
            err ? setError(err) : authUser({ userInfo, dispatch })
        });
    }
    
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            paddingHorizontal: 8,
            justifyContent: 'center'
        },
        m: {
            margin: 8
        },
        Image: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24
        }
    })

    return(
        <>
        <Appbar.Header>
            <Appbar.Content title="LOGIN" />
        </Appbar.Header>
        <View style={styles.container}>
            <View style={styles.Image}>
                <Image source={ require('../assets/logo.png') } />
            </View>
            <TextInput value={fields.email} onChangeText={email => setFields({ ...fields, email })} style={styles.m} mode="outlined" label="UserName" />
            <TextInput value={fields.password} onChangeText={password => setFields({ ...fields, password })} secureTextEntry style={styles.m} mode="outlined" label="Password" />
            <Text style={{ color: 'red', textAlign: 'center', margin: 14 }}>{error}</Text>
            <Button disabled={isLoadin} loading={isLoadin} style={styles.m} mode="contained" onPress={handleSubmit}>LOGIN</Button>
            <Button style={styles.m} mode="text" onPress={() => dispatch({ type: 'SET_SCREEN', payload: { name: 'REGISTER', data: null } })}>Register</Button>
        </View>
        </>
    ); 
}

export default App;
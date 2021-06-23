import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Appbar, TextInput, Button, Text } from 'react-native-paper'
import { AuthAPI } from '../api';
import { authUser } from '../static/functions'

const App = () => {

    const dispatch = useDispatch()

    const [ fields, setFields ] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isLoadin, setLoadin] = useState(false);

    const handleSubmit = () => {
        setLoadin(true)
        AuthAPI.register(fields, (userInfo, err) => {
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
        }
    })

    return(
        <>
        <Appbar.Header>
            <Appbar.Content title="LOGIN" />
        </Appbar.Header>
        <View style={styles.container}>
            <TextInput value={fields.name} onChangeText={name => setFields({ ...fields, name })} style={styles.m} mode="outlined" label="Name" />
            <TextInput value={fields.email} onChangeText={email => setFields({ ...fields, email })} style={styles.m} mode="outlined" label="Email" />
            <TextInput value={fields.password} onChangeText={password => setFields({ ...fields, password })} secureTextEntry style={styles.m} mode="outlined" label="New Password" />
            <TextInput value={fields.confirmPassword} onChangeText={confirmPassword => setFields({ ...fields, confirmPassword })} secureTextEntry style={styles.m} mode="outlined" label="Confirm Password" />
            <Text style={{ color: 'red', textAlign: 'center', margin: 14 }}>{error}</Text>
            <Button disabled={isLoadin} loading={isLoadin} style={styles.m} mode="contained" onPress={handleSubmit}>REGISTER</Button>
            <Button style={styles.m} mode="text" onPress={() => dispatch({ type: 'SET_SCREEN', payload: { name: 'HOME', data: null } })}>LOGIN</Button>
        </View>
        </>
    ); 
}

export default App;
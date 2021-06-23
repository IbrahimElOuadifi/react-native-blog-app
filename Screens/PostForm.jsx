import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Image } from 'react-native'
import { Appbar, TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import ImgToBase64 from 'react-native-image-base64'
import { PostAPI } from '../api'

const App = () => {

    const dispatch = useDispatch()

    const creator = useSelector(state => state.user._id)
    const post = useSelector(state => state.screen.data)

    const [ fields, setfields ] = useState({ title: '', img: '', creator })
    const [ isLoading, setLoading ] = useState(false)

    const openImagePickerAsync = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
            if (permissionResult.granted === false) return alert("Permission to access camera roll is required!");
        
            const pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true });
            if(pickerResult.cancelled) return alert('Cancelled')
            console.log(pickerResult.base64);
            setfields({ ...fields, img: 'data:image/jpeg;base64,'+pickerResult.base64 })
        } catch (err) {
            console.log(err)
        }
      }

      const addPost = () => PostAPI.create(fields, () => {
        dispatch({ type: 'SET_SCREEN', payload: { name: 'HOME', data: null } })
        setLoading(false)
      })

      const updatePost = () => PostAPI.update(fields, () => {
        dispatch({ type: 'SET_SCREEN', payload: { name: 'HOME', data: null } })
        setLoading(false)
      })

      const handleSubmit = () => {
        if(!fields.img || !fields.title) return alert('Fields required!')
        setLoading(true)
        if(fields?._id) updatePost()
        else addPost()
      }

      useEffect(() => {
          if(post) setfields({ ...post })
      }, [])

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            // paddingTop: 24,
            paddingHorizontal: 8,
            justifyContent: 'center'
        },
        image: {
            margin: 8,
            alignItems: 'center'
        },
        m: {
            margin: 8
        }
    })

    return(
        <>
        <Appbar.Header>
            <Appbar.BackAction onPress={ () => dispatch({ type: 'SET_SCREEN', payload: { name: 'HOME', data: null } }) } />
            <Appbar.Content title={post ? 'Edit Post' : 'Create Post'} />
        </Appbar.Header>
        <View style={styles.container}>
            <TextInput value={fields.title} onChangeText={ title => setfields({ ...fields, title }) } style={styles.m} mode="outlined" label="Title" />
            <View style={styles.image}>
                <Button style={{ width: '100%' }} onPress={openImagePickerAsync}>Selet Image</Button>
                { fields.img.length !== 0 && (<Image style={{ width: 280, height: 280, margin: 8 }} source={{ uri: fields.img }} />) }
            </View>
            <Button disabled={isLoading} loading={isLoading} style={styles.m} mode="contained" onPress={handleSubmit}>{post ? 'UPDATE' : 'POST'}</Button>
        </View>
        </>
    ); 
}

export default App;
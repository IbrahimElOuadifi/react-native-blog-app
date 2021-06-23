import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { UserAPI, CommentAPI } from '../api'

const App = ({ id, text, fromUser, creatorId, getComments }) => {

    const user = useSelector(state => state.user)
    const [name, setName] = useState('');

    useEffect(()=> {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUser = () => UserAPI.getById(fromUser, userInfo => setName(userInfo.name));

    const deleteComment = () => CommentAPI.delete(id, () => getComments());

    const styles = StyleSheet.create({
        flex: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            alignItems: 'center',
            flexDirection: 'row'
        }
    })

    return (
        <View style={styles.flex}>
            <Text style={{ flex: 1 }}>{name}: {text}</Text>
            {(creatorId === user._id || fromUser === user._id) && <IconButton icon="close" size={18} color="red" onPress={deleteComment} />}
        </View>
    )
}

export default App

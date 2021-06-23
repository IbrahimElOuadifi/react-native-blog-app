import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { Appbar, FAB } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import Post from '../components/Post'
import { PostAPI, AuthAPI } from '../api';

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [posts, setPosts] = useState([]);

  const getPosts = () => PostAPI.getAll(data => setPosts(data));

  const deleteById = id => PostAPI.delete(id, () => getPosts());

  const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      right: 24,
      bottom: 24
    }
  })

  useEffect(() => {
    getPosts();
    // AuthAPI.getPass(user._id, (pass, err) => err ? console.error(err) : !pass && push('/set'));
}, []);

  return(
    <View style={{ height: '100%' }}>
      <Appbar.Header>
          <Appbar.Content title={`Home - ${user.name}`}></Appbar.Content>
          <Appbar.Action icon="account" onPress={() => dispatch({ type: 'SET_SCREEN', payload: { name: 'PROFILE', data: user } })} />
          <Appbar.Action icon="logout" onPress={() => dispatch({ type: 'SET_USER', payload: null })} />
      </Appbar.Header>
      <ScrollView>
        { posts.map(post => <Post key={post._id} post={post} deleteById={deleteById} />) }
      </ScrollView>
      <FAB style={styles.fab} icon="plus" onPress={ () => dispatch({ type: 'SET_SCREEN', payload: { name: 'FORM_POST', data: null } }) } />
    </View>
  );
}
  
export default App

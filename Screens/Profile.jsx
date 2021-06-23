import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Appbar, Text, Avatar, Title } from 'react-native-paper'
import { Post } from '../components'
import { PostAPI, FollowAPI } from '../api'

const App = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const data = useSelector(state => state.screen.data)
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: 100
        }
    })
    
    const getFollowers = following => FollowAPI.get({ following }, data => setFollowers(data.length));

    const getFollowing = follower => FollowAPI.get({ follower }, data => setFollowing(data.length));

    const getPosts = creator => PostAPI.getByUserId(creator, data => {
        setPosts(data)
        setPostCount(data?.length);
    });

    const deleteById = id => PostAPI.delete(id, () => getPosts());
    
    useEffect(() => setProfile(data || user), [])
    
    useEffect(() => {
        getPosts(profile?._id);
        getFollowers(profile?._id);
        getFollowing(profile?._id);
    }, [profile])

    return(
        <View style={{ height: '100%' }}>
            <Appbar.Header>
            <Appbar.BackAction onPress={ () => dispatch({ type: 'SET_SCREEN', payload: { name: 'HOME', data: null } }) } />
                <Appbar.Content title={`Profile`} />
            </Appbar.Header>
            <View style={styles.container}>
                <Avatar.Image source={{ uri: profile?.urlPic }} />
                <View style={styles.container}>
                    <View style={{ width: 80, alignItems: 'center' }}>
                        <Title>{postCount}</Title>
                        <Text>Count</Text>
                    </View>
                    <View style={{ width: 80, alignItems: 'center' }}>
                        <Title>{followers}</Title>
                        <Text>Followers</Text>
                    </View>
                    <View style={{ width: 80, alignItems: 'center' }}>
                        <Title>{following}</Title>
                        <Text>Folloing</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                {posts.map(post => <Post key={post._id} post={post} deleteById={deleteById} />)}
            </ScrollView>
        </View>
    )
}

export default App;
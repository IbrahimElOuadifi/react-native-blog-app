import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, TextInput } from 'react-native'
import { Button, Card, Title, Avatar, IconButton, Text } from 'react-native-paper'
import Comment from './comment'
import { UserAPI, FollowAPI, CommentAPI, LikeAPI, SaveAPI } from '../api';

const App = ({ post, deleteById }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [saves, setSaves] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [urlPic, setPic] = useState(null);
    const [isFollowing, setFollow] = useState(false);

    useEffect(() => {
        getUser();
        getFollow();
        getComments();
        getLikes();
        getSaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    const HandelSubmit = () => {
        createComment();
        setText('');
    };

    const getUser = () => UserAPI.getById(post?.creator, userInfo => { setName(userInfo.name);  setPic(userInfo.urlPic); });

    const getComments = () => CommentAPI.get(post?._id, post => setComments(post));

    const createComment = () => CommentAPI.create({ fromUser: user._id, toPost: post?._id, text }, () => getComments());

    const getFollow = () => FollowAPI.get({ follower: user._id, following: post?.creator }, post => post?.length ? setFollow(true) : setFollow(false));

    const handleFollow = () => FollowAPI.update({ follower: user._id, following: post?.creator }, () => getFollow());

    const getLikes = () => LikeAPI.get(post?._id, (post, err) => setLikes(post));

    const handleLike = () => LikeAPI.update({ fromUser: user._id, toPost: post?._id }, (post, err) => getLikes());

    const getSaves = () => SaveAPI.get(post?._id, post => setSaves(post));

    const handleSave = () => SaveAPI.update({ fromUser: user._id, toPost: post?._id }, () => getSaves());

    const getDate = () => `${post?.createAt.split('T')[0]} - ${post?.createAt.split('T')[1].split('.')[0]}`;

    const FolowBtn = props => {
        if(post?.creator === user._id) return <IconButton {...props} icon="dots-vertical" onPress={ () => dispatch({ type: 'SET_SCREEN', payload: { name: 'FORM_POST', data: { ...post } } }) } />
        return <Button mode="text" color={isFollowing && 'red'} onPress={handleFollow}>{isFollowing ? 'Unfolow' : 'Folow'}</Button>
    }

    const styles = StyleSheet.create({
        space_beteen: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        flex: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
        }
    })

    return(
        <Card>
            <Card.Title 
                title={name}
                subtitle={getDate()} 
                left={ props => <Avatar.Image {...props} source={{ uri: urlPic }} /> } 
                right={FolowBtn}
            />
            <Card.Cover source={{ uri: post?.img  }} />
            <Card.Actions style={styles.space_beteen}>
                <View style={styles.flex}>
                    {likes.some(({ fromUser, toPost }) => fromUser === user._id && toPost === post?._id) ? <IconButton icon="heart" color="red" onPress={handleLike} /> : <IconButton icon="heart-outline" onPress={handleLike} /> }
                    <Text>{likes.length > 0 && likes.length + (likes.length > 1 ? ' likes' : ' like')}</Text>
                    <IconButton icon="share-outline" onPress={ () => alert(`Share\n${post?._id}`) } />
                </View>
                <View style={styles.flex}>
                    {
                        post?.creator === user._id &&
                        (
                            <IconButton icon="delete" color="red" onPress={deleteById?.bind(this, post?._id)} />
                        )
                    }
                    {/* <IconButton icon="delete" color="red" onPress={deleteById?.bind(this, post?._id)} /> */}
                    {saves.some(({ fromUser, toPost }) => fromUser === user._id && toPost === post?._id) ? <IconButton icon="bookmark" onPress={handleSave} /> : <IconButton icon="bookmark-outline" onPress={handleSave} /> }
                </View>
            </Card.Actions>
            <Card.Content>
                <Title>{post?.title}</Title>
            </Card.Content>
            <Card.Content>
                {comments.map(({ _id, fromUser, text }) => <Comment key={_id} id={_id} text={text} fromUser={fromUser} creatorId={post?.creator} getComments={getComments} />)}
                <View style={styles.flex}>
                    <TextInput style={{ flex: 1 }} mode="outlined" placeholder="Type a comment..." value={text} onChangeText={ txt => setText(txt) } />
                    <Button onPress={HandelSubmit}>Post</Button>
                </View>
            </Card.Content>
        </Card>
    )
}

export default App;
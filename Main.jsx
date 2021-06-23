import React from 'react'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import {  LogIn, Register, Home, Profile, PostForm } from './Screens'

const App = () => {

  const user = useSelector(state => state.user)
  const { name } = useSelector(state => state.screen)

  if(!user) return name === 'REGISTER' ? <Register /> : <LogIn />

  switch(name) {
    case 'HOME': return <Home />
    case 'PROFILE': return <Profile />
    case 'FORM_POST': return <PostForm />
    default: return <Home />
  }
}

export default App
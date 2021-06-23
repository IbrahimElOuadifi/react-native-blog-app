export const reducer = (state = { user: null, screen: { name: 'HOME', data: null } }, action) => {
    console.log(action)
    switch(action.type) {
        case 'SET_USER':
            state.user = action.payload
            break
        case 'SET_SCREEN':
            state.screen = action.payload
            break
        default: state.user = null
    }
    console.log(state)
    return state
}
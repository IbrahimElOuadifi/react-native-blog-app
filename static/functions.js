export const authUser = ({ userInfo, dispatch }) => {
    console.log({ userInfo, dispatch })
    dispatch({ type: 'SET_USER', payload: userInfo })
};
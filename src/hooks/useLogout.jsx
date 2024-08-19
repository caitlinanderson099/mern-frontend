import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext();

    const logout = () => {
        // this is to remove the user from the local storage
        localStorage.removeItem('user');

        // dispatch -- logout
        dispatch({type: 'LOGOUT'});
    }
    return {logout};
}
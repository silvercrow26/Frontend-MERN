import { useDispatch, useSelector } from "react-redux"
import { eventsApi } from "../api";
import { onChecking, onClearErrorMessage, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());

        try {

            const { data } = await eventsApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas.'));
            setTimeout(() => {
                dispatch(onClearErrorMessage())
            }, 10);
        }

    }

    const startRegister = async ({ email, password, name }) => {
        dispatch(onChecking());
        try {
            const { data } = await eventsApi.post('/auth/new', { email, password, name });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch( onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch( onClearErrorMessage() );
            }, 10);
        }
    }

    //Funcion que llamaré manualmente en un punto determinado, no ponerla en un useeffect
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch( onLogout() );

        try {
            const {data} = await eventsApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        //Props
        status,
        user,
        errorMessage,

        //Method
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}

import { fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types';
import Swal from 'sweetalert2';



export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );//FETCH
        const body = await resp.json();

        if( body.ok ) { //SUCCESS also we can use resp.ok
            localStorage.setItem('token', body.token );//Save TOken en localStorage
            localStorage.setItem('token-init-date', new Date().getTime() ); //time when was create the token 

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
        

    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const baseUrl = process.env.REACT_APP_API_URL; //server


//Without token
const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {//POST/DELETE/PUT
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify( data )
        });
    }
}

//with Tokens
const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || ''; //get token from localStorage

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'x-token': token ,
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}



export {
    fetchSinToken,
    fetchConToken
}
const baseUrl = process.env.REACT_APP_API_URL; //server

console.log(process.env);
console.log(baseUrl)
//Without token
const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {//POST/DELETE/PUT
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}



export {
    fetchSinToken
}
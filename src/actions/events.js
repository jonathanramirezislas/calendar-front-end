import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';


export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {
        //getSatate to get data from storage(redux)
        const { uid, name } = getState().auth;

        try {
                                            //endpoint,parms/Method
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();


            if ( body.ok ) {
                event.id = body.evento.id;
                //add data from user to event
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch( eventAddNew( event ) );
            }


        } catch (error) {
            console.log(error);
        }

        

    }
}



const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});




export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
     type: types.eventClearActiveEvent 
});

export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});


export const eventDeleted = () => ({
     type: types.eventDeleted 
});



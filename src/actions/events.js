import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';


        /****       ADD NEW EVENT         ****/

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

            /** GET EVENTS FROM DATABASE**/

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken( 'events' );
            const body = await resp.json();

                            //CHANGE string date to date 
            const events = prepareEvents( body.eventos );


            dispatch( eventLoaded( events ) );

        } catch (error) {
            console.log(error)
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

            /** UPDATE EVENTS**/

export const eventStartUpdate = ( event ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`events/${ event.id }`, event, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
     type: types.eventClearActiveEvent 
});


export const eventDeleted = () => ({
     type: types.eventDeleted 
});



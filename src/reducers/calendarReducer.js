import { types } from '../types/types';

// {
//     id: 'askdjhaksdjas',
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Jonathan'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
};


export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,//previous events
                    action.payload //new event
                ]
            }
    
        //deactivate the active note
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }


        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }
        
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id )//delete by active note 
                ),
                activeEvent: null //due to was activated
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload ] //..spread all events
            }
        
        
        case types.eventLogout:
            return {
                ...initialState //CLEAN EVENTS GO TO THE DEFAULT STATE  ↑
            }


        default:
            return state;
    }


}

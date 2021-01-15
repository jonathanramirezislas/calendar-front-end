import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';

//Combine reducers
export const rootReducer = combineReducers({
    ui: uiReducer,
    // TODO: AuthReducer
    // TODO: CalendarReducer
})


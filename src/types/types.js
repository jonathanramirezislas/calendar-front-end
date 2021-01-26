export const types = {

    //MODAL
    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',

    //EVENT TO SHOW
    eventSetActive: '[event] Set Active',
    
    eventLogout: '[event] Logout event',
    
    //CRUD
    eventLoaded: '[event] Events loaded', //read
    evetStartAddNew: '[event] Start add new',//create
    eventAddNew: '[event] Add new',
    eventUpdated: '[event] Event updated',//update
    eventDeleted: '[event] Event deleted',//delete

    //auth
    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start Register',
    authStartStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',
    eventClearActiveEvent: '[event] Clear active event',//CLEAN EVENS FROM STORE
    

}
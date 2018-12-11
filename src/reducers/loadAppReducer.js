import { LOAD_APP,LOAD_APP_REQ,LOAD_APP_SUCCESS,LOAD_APP_FAILURE } from '../actions/actionTypes';
/**
 * loadAppReducer.js
 * 
 * @abstract reducer inits/changes loadApp state, routes for loadAppSaga
 * @author Chase
 */
const INIT_STATE = {
    showSpinner : true,
    hideForInit : true
};

const _loadAppReducer = ( state = INIT_STATE, action) => {
    switch ( action.type) {
        case LOAD_APP:
            return Object.assign( {}, state, { showSpinner : true });
        case LOAD_APP_REQ:
            return Object.assign( {}, state, { showSpinner : true });
        case LOAD_APP_SUCCESS:
            return Object.assign( {}, { showSpinner : false, hideForInit : false });
        case LOAD_APP_FAILURE:
            return Object.assign( {}, { showSpinner : false, hideForInit : true, 
                                              error : action.error });
        default:
            return state;
    }
};

export default _loadAppReducer;
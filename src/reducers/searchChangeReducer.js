import { SEARCH_CHANGE, SEARCH_CHANGE_SUCCESS,
         SEARCH_CHANGE_FAILURE } from '../actions/actionTypes';
/**
 * searchChangeReducer.js
 * 
 * @abstract reducer inits/changes searchChange state, routes for searchChangeSaga
 * @author Chase
 */
const INIT_STATE = {
    location : '',
locationName : '',
    rightNow : '',
     current : {
            name : '',
            temp : '',
        detailed : '',
            icon : ''
    }, 
     outlook : []
};

const _searchChangeReducer = ( state = INIT_STATE, action) => {
    switch ( action.type) {
        case SEARCH_CHANGE:
            return Object.assign( {}, state, { location : action.payload });
        case SEARCH_CHANGE_SUCCESS:
            return Object.assign( {}, state, action.payload);
        case SEARCH_CHANGE_FAILURE :
            return Object.assign( {}, state, action.error);
        default:
            return state;
    }
};

export default _searchChangeReducer;
import { EXTENDED_SEARCH, EXTENDED_SEARCH_SUCCESS,
         EXTENDED_CLOSE } from '../actions/actionTypes';
/**
 * extendedSearchReducer.js
 * 
 * @abstract reducer inits/changes extended state, routes for extendedSearchSaga
 * @author Chase
 */
const INIT_STATE = {
    hasData : false,
   extended : [] };

const _extendedSearchReducer = ( state = INIT_STATE, action) => {
    switch ( action.type) {
        case EXTENDED_SEARCH:
            return Object.assign( {}, state);
        case EXTENDED_SEARCH_SUCCESS:
            return Object.assign( {}, state, { hasData : true, extended : action.payload });
        case EXTENDED_CLOSE:
            return Object.assign( {}, state, { hasData : false, extended : [] });
        default:
            return state;
    }
};

export default _extendedSearchReducer;
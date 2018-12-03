import { HOURLY_SEARCH, HOURLY_SEARCH_SUCCESS,
         HOURLY_CLOSE } from '../actions/actionTypes';
/**
 * hourlySearchReducer.js
 * 
 * @abstract reducer inits/changes hourly state, routes for hourlySearchSaga
 * @author Chase
 */
const INIT_STATE = {
       show : false,
    hasData : false,
     hourly : [] };

const _hourlySearchReducer = ( state = INIT_STATE, action) => {
    switch ( action.type) {
        case HOURLY_SEARCH:
            return Object.assign( {}, state);
        case HOURLY_SEARCH_SUCCESS:
            return Object.assign( {}, state, { hasData : true, show : true, hourly : action.payload });
        case HOURLY_CLOSE:
            return Object.assign( {}, state, { hasData : false, show : false, hourly : [] });
        default:
            return state;
    }
};

export default _hourlySearchReducer;
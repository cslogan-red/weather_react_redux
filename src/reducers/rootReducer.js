import { combineReducers } from 'redux';
import _loadAppReducer from './loadAppReducer';
import _searchChangeReducer from './searchChangeReducer';
import _extendedSearchReducer from './extendedSearchReducer';
import _hourlySearchReducer from './hourlySearchReducer';
/**
 * rootReducer.js
 * 
 * @abstract combined base reducer with all individual actionType reducers
 * @author Chase
 */
const rootReducer = combineReducers( {
        loadApp : _loadAppReducer, 
   searchChange : _searchChangeReducer, 
       extended : _extendedSearchReducer,
         hourly : _hourlySearchReducer
});

export default rootReducer;
import { all, takeEvery } from 'redux-saga/effects';
import { _loadApp } from './loadAppSaga';
import { _searchChange } from './searchChangeSaga';
import { _extendedSearch } from './extendedSearchSaga';
import { _hourlySearch } from './hourlySearchSaga';
import { LOAD_APP, SEARCH_CHANGE, EXTENDED_SEARCH, HOURLY_SEARCH } from '../actions/actionTypes';
/**
 * @abstract root saga to be bound to saga middleware, watching for any of the specified
 * actionType's to be dispatched
 * 
 * @author Chase
 */
export function* rootSaga() {
    
    yield all([
        takeEvery( LOAD_APP, _loadApp),
        takeEvery( SEARCH_CHANGE, _searchChange),
        takeEvery( EXTENDED_SEARCH, _extendedSearch),
        takeEvery( HOURLY_SEARCH, _hourlySearch)
    ]);
}

export default rootSaga;
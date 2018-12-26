import { call, put } from 'redux-saga/effects';
import DataService from '../services/DataService';
import { SEARCH_CHANGE, SEARCH_CHANGE_SUCCESS, 
        SEARCH_CHANGE_INIT, LOAD_APP_SUCCESS } from '../actions/actionTypes';
/**
 * loadAppSaga.js
 * 
 * @abstract saga represents initial app load, store init
 * @author Chase
 */
export function* _loadApp() {

    try {
        // lookup device Id and device document
        const USER_KEY = yield call( new DataService()._getUserIdAsync);
        const USER_DOC = yield call( new DataService()._getDocument, USER_KEY),
           EXP_SESSION = 300000;
        if ( USER_DOC && USER_DOC.location) { 
            // if cached data exists, check if session has expired
            if ( USER_DOC.timeStamp && Date.now() - USER_DOC.timeStamp > EXP_SESSION) {
                yield put( { type : SEARCH_CHANGE, payload : USER_DOC.location });
            } else {
                yield put( { type : SEARCH_CHANGE_SUCCESS, 
                          payload : _buildCacheResult( USER_DOC) });
                yield put( { type : LOAD_APP_SUCCESS });
            }
        } else {
            // re-init the app in this case
            yield put( { type : LOAD_APP_SUCCESS });
            yield put( { type : SEARCH_CHANGE_INIT });
        }
    } catch ( error) {
        // re-init the app in this case
        yield put( { type : LOAD_APP_SUCCESS });
        yield put( { type : SEARCH_CHANGE_INIT });
    }
}

// construct state from cache
const _buildCacheResult = ( cacheObj) => {
    let retObj = {};

    if ( cacheObj) {
        retObj = {
            location : cacheObj.location,
        locationName : cacheObj.locationName,
            rightNow : cacheObj.rightNow,
           timeStamp : cacheObj.timeStamp,
             current : cacheObj.current,
             outlook : cacheObj.outlook
        }
    }
    return retObj;
}
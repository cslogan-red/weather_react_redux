import { call, put } from 'redux-saga/effects';
import DataService from '../services/DataService'
import { HOURLY_SEARCH_SUCCESS, HOURLY_CLOSE,
         LOAD_APP_REQ, LOAD_APP_SUCCESS } from '../actions/actionTypes';
/**
 * hourlySearchSaga.js
 * 
 * @abstract saga represents a triggered hourly search
 * @author Chase
 */

 // hourly search via api layer
export function* _hourlySearch() {

    try {
        // lookup device Id and device document
        yield put( { type : LOAD_APP_REQ });
        const USER_KEY = yield call( new DataService()._getUserId);
        const USER_DOC = yield call( new DataService()._getDocument, USER_KEY);
        yield put( { type : HOURLY_SEARCH_SUCCESS, payload : USER_DOC.hourly });
        yield put( { type : LOAD_APP_SUCCESS });
    } catch ( error) {
        yield put( { type : HOURLY_CLOSE, error : error.message });
    }
}
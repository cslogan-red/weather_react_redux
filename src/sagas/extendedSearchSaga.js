import { call, put } from 'redux-saga/effects';
import DataService from '../services/DataService'
import { EXTENDED_SEARCH_SUCCESS, EXTENDED_CLOSE, 
         LOAD_APP_REQ, LOAD_APP_SUCCESS } from '../actions/actionTypes';
/**
 * extendedSearchSaga.js
 * 
 * @abstract saga represents a triggered extended search
 * @author Chase
 */

 // extended search via api layer
export function* _extendedSearch() {

    try {
        // lookup device Id and device document
        yield put( { type : LOAD_APP_REQ });
        const USER_KEY = yield call( new DataService()._getUserIdAsync);
        const USER_DOC = yield call( new DataService()._getDocument, USER_KEY);
        yield put( { type : EXTENDED_SEARCH_SUCCESS, payload : USER_DOC.extended });
        yield put( { type : LOAD_APP_SUCCESS });
    } catch ( error) {
        yield put( { type : EXTENDED_CLOSE, error : error.message });
    }
}
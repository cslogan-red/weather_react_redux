/**
 * actionTypes.js
 * 
 * @abstract all valid redux action types that can be dispatched, grouped by
 * reducer/saga
 * @author Chase
 */
export const LOAD_APP = 'LOAD_APP';
export const LOAD_APP_REQ = 'LOAD_APP_REQ';
export const LOAD_APP_SUCCESS = 'LOAD_APP_SUCCESS';
export const LOAD_APP_FAILURE = 'LOAD_APP_FAILURE';

export const SEARCH_CHANGE = 'SEARCH_CHANGE';
export const SEARCH_CHANGE_SUCCESS = 'SEARCH_CHANGE_SUCCESS';
export const SEARCH_CHANGE_FAILURE = 'SEARCH_CHANGE_FAILURE';

export const EXTENDED_SEARCH = 'SEXTENDED_SEARCH';
export const EXTENDED_SEARCH_SUCCESS = 'EXTENDED_SEARCH_SUCCESS';
export const EXTENDED_CLOSE = 'EXTENDED_CLOSE';
 
export const HOURLY_SEARCH = 'HOURLY_SEARCH';
export const HOURLY_SEARCH_SUCCESS = 'HOURLY_SEARCH_SUCCESS';
export const HOURLY_CLOSE = 'HOURLY_CLOSE';

export default actionTypes => {

    return { LOAD_APP, LOAD_APP_REQ, LOAD_APP_SUCCESS, LOAD_APP_FAILURE,
             SEARCH_CHANGE, SEARCH_CHANGE_SUCCESS, SEARCH_CHANGE_FAILURE,
             EXTENDED_SEARCH, EXTENDED_SEARCH_SUCCESS, EXTENDED_CLOSE,
             HOURLY_SEARCH, HOURLY_SEARCH_SUCCESS, HOURLY_CLOSE };
};

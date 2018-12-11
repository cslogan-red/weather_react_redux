import Cookies from 'universal-cookie';

/**
 * @abstract Service class handling async data layer API calls
 * 
 * @author Chase
 */
class DataService {

    // persist a document to api layer for backend handling by key
    _persistDocument = async ( key, documentObj) => {
        const WEATHER_API_PATH = '/api/v1/weather/', 
                           URI = WEATHER_API_PATH + key;
        const retObj = { status : '', message : '' };
        return await fetch( URI, { method : 'post', 
                               body : JSON.stringify( documentObj, null, '\t')})
        .then( res => res.json())
        .then( ( result) => {
            retObj.status = 'success';
            return retObj;
        }, ( error) => {
            retObj.status = 'failed';
           retObj.message = error;
            return retObj;
        });
    };

    // gets a document from api layer by key
    _getDocument = async ( key) => {
        const WEATHER_API_PATH = '/api/v1/weather/', 
                           URI = WEATHER_API_PATH + key;
        let retObj = {};
        return await fetch( URI, { method : 'get'})
        .then( res => res.json())
        .then( ( result) => {
            retObj = result;
            return retObj;
        }, ( error) => {
            return retObj;
        });
    };

    // init client device id as cookie, used as key for api layer
    _initCookies() {

        const KEY = window.btoa('' + Math.random() * Math.random() * Math.random() * Math.PI),
           COOKIE = new Cookies(),
           PREFIX = 'default-wid';
        // expire cookie a month from now
        let expDate = new Date( Date.now());
        expDate.setDate( expDate.getDate() + 30);
        COOKIE.set( PREFIX, KEY, { path : '/', expires : expDate });
    }

    // check if user already has cookie present on device, return if so, init if not
    _getUserIdAsync = async () => {

        const COOKIE = new Cookies(),
              PREFIX = 'default-wid';
           const UID = await COOKIE.get( PREFIX);
        if ( UID) {
            return UID;
        } else {
            this._initCookies();
            return await COOKIE.get( PREFIX);
        }
    }
}

export default DataService;
import { call, put, select } from 'redux-saga/effects';
import LocationService from '../services/LocationService';
import WeatherService from '../services/WeatherService';
import DataService from '../services/DataService';
import {  SEARCH_CHANGE_SUCCESS, SEARCH_CHANGE_INIT,
          LOAD_APP_SUCCESS, LOAD_APP_REQ, EXTENDED_CLOSE,
          HOURLY_CLOSE } from '../actions/actionTypes';
/**
 * searchChangeSaga.js
 * 
 * @abstract saga represents a triggered search
 * @author Chase
 */

const _getLocation = state => state.searchChange.location;

 // lookup geocoords based on current state location, retrieve weather details
export function* _searchChange() {

    try {
        yield put( { type : LOAD_APP_REQ});
        yield put( { type : EXTENDED_CLOSE});
        yield put( { type : HOURLY_CLOSE});
        const LOC = yield select( _getLocation);
        if ( LOC && LOC !== '') {
            const GEO = 
                yield call( new LocationService()._geocodeLocationAsync, LOC),
                 GRID = 
                yield call( new WeatherService()._getGridResultAsync, GEO.lat, GEO.lng);
            const [FORECAST, CURRENT, HOURLY, KEY] =
                yield [call( new WeatherService()._getForecastDataAsync, GRID.forecastURL),
                       call( new WeatherService()._getCurrentStationAsync, GRID.stationsURL),
                       call( new WeatherService()._getHourlyForecastDataAsync, GRID.hourlyURL),
                       call( new DataService()._getUserId)];
            const LOCATION = GRID.locationName;
            const SEARCH_OBJ = {
                    locationText : LOC,
                    locationName : LOCATION,
                   currentResult : CURRENT,
                      periodData : FORECAST.periods,
                hourlyPeriodData : HOURLY.periods
            },
            RESULT = _buildSearchResult( SEARCH_OBJ);
            yield call( new DataService()._persistDocument, KEY, {
                locationName : RESULT.locationName,	
                    location : RESULT.location,
                    rightNow : RESULT.rightNow,
                     current : RESULT.current,
                     outlook : RESULT.outlook, 
                    extended : RESULT.extended,
                      hourly : RESULT.hourly,
                   timeStamp : Date.now()
            });
            yield put( { type : SEARCH_CHANGE_SUCCESS, 
                payload : {
                locationName : RESULT.locationName,	
                    location : RESULT.location,
                    rightNow : RESULT.rightNow,
                     current : RESULT.current,
                     outlook : RESULT.outlook, 
                } 
            });
        } else {
            yield put( { type : SEARCH_CHANGE_INIT});
        }
        yield put( { type : LOAD_APP_SUCCESS });
    } catch ( error) {
        // re-init the app in this case
        yield put( { type : LOAD_APP_SUCCESS});
        yield put( { type : SEARCH_CHANGE_INIT});
    }
}

// construct combined search result for eventual state persistence
const _buildSearchResult = ( searchObj) => {
    let retObj = {};

    if ( searchObj && searchObj.locationText && searchObj.locationName && 
         searchObj.currentResult && searchObj.periodData) {
        const TODAY = searchObj.periodData[0],
           ICON_SFX = '=large';
        let outlookArr = [],
           extendedArr = [],
             hourlyArr = [];
        // eslint-disable-next-line
        searchObj.periodData.map( ( item, index) => {
            let itemIcon = item.icon.substring( 0, item.icon.indexOf( '='));
            itemIcon = itemIcon + ICON_SFX;
            if ( index > 0 && index < 7) {
                let outlook = {
                    name : item.name,
                    temp : item.temperature + item.temperatureUnit,
                detailed : item.shortForecast,
                    icon : itemIcon
                }
                outlookArr.push( outlook);
            }
            let localDate = new Date( item.startTime);
            extendedArr.push( {
                name : item.name + ' (' + localDate.toLocaleDateString() + ')',
                temp : item.temperature + item.temperatureUnit,
            detailed : item.shortForecast,
                icon : itemIcon
            });
        });
        // eslint-disable-next-line
        searchObj.hourlyPeriodData.map( ( item, index) => {
            if ( index >= 0 && index < 12) {
                let localTime = '' + new Date( item.startTime).toLocaleTimeString();
                let localHour = 
                    localTime.substring( 0, localTime.indexOf( ':')) +
                    localTime.substring( localTime.indexOf( ' ') + 1);
                hourlyArr.push( {
                    hour : localHour,
                    temp : item.temperature + item.temperatureUnit,
                    icon : item.icon
                });
            }
        });
        let todayIcon = TODAY.icon.substring( 0, TODAY.icon.indexOf( '='));
            todayIcon = todayIcon + ICON_SFX;
        retObj = {
                location : searchObj.locationText,
            locationName : searchObj.locationName,
                rightNow : searchObj.currentResult.temperature + ' and ' + 
                           searchObj.currentResult.rightNow,
                 current : {
                    name : TODAY.name,
                    temp : TODAY.temperature + TODAY.temperatureUnit,
                detailed : TODAY.detailedForecast,
                    icon : todayIcon
                },
                outlook : outlookArr,
               extended : extendedArr,
                 hourly : hourlyArr
        }
    }
    return retObj;
}
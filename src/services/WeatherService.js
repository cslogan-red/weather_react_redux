/**
 * @abstract Service class handling async weather related API calls
 * 
 * @author Chase
 */
class WeatherService {

    // lookup local grid information based on lat & lng
    _getGridResultAsync = async ( lat, lng) => {
        const WEATHER_API_PREFIX = 'https://api.weather.gov/points/', 
                             URI = WEATHER_API_PREFIX + lat + ',' + lng,
                      ERR_PREFIX = ':::LOG:::WeatherService._getGridResultAsync(), message: ';
        let retObj = { locationName : '', forecastURL : '', stationsURL : '' };
        return fetch( URI)
        .then( res => res.json())
        .then( ( result) => {
            if ( result.properties && result.properties.forecast) {
                 retObj = {
                   locationName : result.properties.relativeLocation.properties.city + ', ' +
                                  result.properties.relativeLocation.properties.state,
                    forecastURL : result.properties.forecast,
                    stationsURL : result.properties.observationStations,
                      hourlyURL : result.properties.forecastHourly,
                        gridURL : result.properties.forecastGridData
                 }
            } 
            return retObj;
        }, ( error) => {
            console.log( ERR_PREFIX + error);
            return retObj;
        });
    };

    // lookup current stations for a given grid lookup result, 
    // then retrieve closest station latest observations
    _getCurrentStationAsync = async ( stationURL) => {
        const URI = stationURL,
       ERR_PREFIX = ':::LOG:::WeatherService._getCurrentStationAsync(), message: ';
       let retObj = { temperature : '', tempRealNumber : 0, rightNow : '', icon : '' };
        const STATIONS_RESULT = await fetch( URI)
        .then( res => res.json())
        .then( ( result) => {
            return result;
        }, ( error) => {
            console.log( ERR_PREFIX + error);
            return retObj;
        });
        if ( STATIONS_RESULT.observationStations && 
             STATIONS_RESULT.observationStations.length > 0) {
            const STATION_URI = STATIONS_RESULT.observationStations[0] + 
                                '/observations/latest';
            return fetch( STATION_URI)
            .then( res => res.json())
            .then( ( result) => {
                if ( result.properties) {
                    retObj = {
                        temperature : this._toFahrenheit( 
                                      result.properties.temperature.value, true),
                     tempRealNumber : this._toFahrenheit( 
                                      result.properties.temperature.value, false),
                          windSpeed : this._toMPH( 
                                      result.properties.windSpeed.value),
                           rightNow : result.properties.textDescription,
                               icon : result.properties.icon
                    }
                    return retObj;
                }
            }, ( error) => {
                console.log( ERR_PREFIX + error);
                return retObj;
            });
        } else {
            return retObj;
        }
    };

    // lookup current grid forecast information (windchill, relative humidity, etc)
    // for a given grid lookup result
    _getCurrentGridForecastAsync = async ( gridURL) => {
        const URI = gridURL,
       ERR_PREFIX = ':::LOG:::WeatherService._getCurrentGridForecastAsync(), message: ';
       let retObj = { windchill : '', relativeHumidity : '' };
        const GRID_RESULT = await fetch( URI)
        .then( res => res.json())
        .then( ( result) => {
            return result;
        }, ( error) => {
            console.log( ERR_PREFIX + error);
            return retObj;
        });
        if ( GRID_RESULT.properties.windChill && 
             GRID_RESULT.properties.relativeHumidity) {
                let windChill = GRID_RESULT.properties.windChill.values[0].value;
                Math.sign( windChill) === -1 
                    ? windChill = Math.round( windChill * -1) : windChill = 0;
                retObj = {
                    windChill : windChill,
             relativeHumidity : GRID_RESULT.properties.relativeHumidity.values[0].value
                }
        } 
        return retObj;
    };

    // lookup forecast data based on grid lookup result
    _getForecastDataAsync = async ( forecastURL) => {
        const URI = forecastURL,
       ERR_PREFIX = ':::LOG:::WeatherService._getForecastDataAsync(), message: ';
       let retObj = { periods : '' };
        return fetch( URI)
        .then( res => res.json())
        .then( ( result) => {
            if ( result.properties && result.properties.periods) {
                retObj.periods = result.properties.periods;
            }
            return retObj;
        }, ( error) => {
            console.log( ERR_PREFIX + error);
            return retObj;
        });
    };

    // lookup houlry forecast data based on grid lookup result
    _getHourlyForecastDataAsync = async ( forecastURL) => {
        const URI = forecastURL,
       ERR_PREFIX = ':::LOG:::WeatherService._getHourlyForecastDataAsync(), message: ';
       let retObj = { periods : '' };
        return fetch( URI)
        .then( res => res.json())
        .then( ( result) => {
            if ( result.properties && result.properties.periods) {
                retObj.periods = result.properties.periods;
            }
            return retObj;
        }, ( error) => {
            console.log( ERR_PREFIX + error);
            return retObj;
        });
    };

    // converts a given celcius temp to fahrenheit
    _toFahrenheit( tempCelcius, applyF) {
        let retVal = '';
        if ( tempCelcius) {
            let raw = ( tempCelcius * 9 / 5) + 32;
            retVal = applyF 
                ? Math.round( raw) + 'F'
                : Math.round( raw);
        }
        return retVal;
    }

    // converts meters per second to miles per hour
    _toMPH( metersPS) {
        let retVal = 0;
        if ( metersPS && metersPS !== 0) retVal = Math.round( metersPS * 2.237);
        return retVal;
    }
}

export default WeatherService;

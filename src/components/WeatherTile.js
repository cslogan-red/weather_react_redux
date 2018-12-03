import React, { Component } from 'react';
import './WeatherTile.css';
import HourlyOutlook from './HourlyOutlook';

class WeatherTile extends Component {

    constructor( props) {
        
        super( props);
        this._handleTileClick = this._handleTileClick.bind( this);
    }
    
    // tile click/touch event handler, managed via parent
    _handleTileClick() {
        
        if ( this.props.showHourly && this.props.onHourlyHide) {
            this.props.onHourlyHide();
        } else if ( !this.props.showHourly && this.props.onHourlyShow) {
            this.props.onHourlyShow();
        }
    }

    // render implementation
    render() {

        const name = this.props.conditions ? this.props.conditions.name : '',
              temp = this.props.conditions ? this.props.conditions.temp : '',
          detailed = this.props.conditions ? this.props.conditions.detailed : '',
            imgSrc = this.props.conditions ? this.props.conditions.icon : '',
            hourly = this.props.hourly ? this.props.hourly : [],
        showHourly = this.props.showHourly,
         isCurrent = this.props.isCurrent;
        return(
            <div>
                <div className="tile__wrapper" onClick={this._handleTileClick}>
                    <div className="tile__container">
                        <div className="tile__header">
                            <span>{name}</span>
                        </div>
                        <div className="tile__detail">
                            <span>{temp}</span>
                            <span>{detailed}</span>
                        </div>
                    </div>
                    <div className="tile__img--container">
                        {isCurrent ? (
                            <img className="tile__img" src={imgSrc} 
                                alt="weather-icon"
                                height="90px" width="90px"></img>
                        ) : (
                            <img className="tile__img" src={imgSrc} 
                                alt="weather-icon"
                                height="60px" width="60px"></img>
                        )}
                    </div>
                </div>
                { showHourly ? (
                    <div className="tile__hourly--wrapper">
                        {hourly.map( (item, i) => 
                            <HourlyOutlook key={i} 
                                          icon={item.icon} 
                                          hour={item.hour} 
                                          temp={item.temp}/>)}
                    </div>
                ) : ('')}
            </div>
        );
    }
}

export default WeatherTile;
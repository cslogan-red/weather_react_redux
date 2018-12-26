import React, { Component } from 'react';
import './CurrentConditions.css';
import HourlyOutlook from './HourlyOutlook';

class CurrentConditions extends Component {

    constructor( props) {
        
        super( props);
        this._handleCurrentClick = this._handleCurrentClick.bind( this);
    }
    
    // right now click/touch event handler, managed via parent
    _handleCurrentClick() {
        
        if ( this.props.showHourly && this.props.onHourlyHide) {
            this.props.onHourlyHide();
        } else if ( !this.props.showHourly && this.props.onHourlyShow) {
            this.props.onHourlyShow();
        }
    }

    // render implementation
    render() {
        
        const { location, rightNow, locationName,
                hourly, showHourly } = this.props;
        return(
            <div>
                { location ? (
                    <div className="current__container" onClick={this._handleCurrentClick}>
                        <div className="current__header--label">
                            <span>{locationName}</span>
                        </div>
                        <div className="current__rightNow">
                            <div className="current__rightNow--label">Right Now</div>
                            <div>{rightNow.temp} <span>(feels like {rightNow.realTemp}F)</span></div>
                            <div>Relative humidity is {rightNow.humidity}</div>
                            <div>Wind is {rightNow.wind}MPH</div>
                        </div>
                        { showHourly ? (
                            <div className="current__hourly--wrapper">
                                {hourly.map( (item, i) => 
                                    <HourlyOutlook 
                                        key={i} 
                                        icon={item.icon} 
                                        hour={item.hour} 
                                        temp={item.temp}/>)}
                            </div>
                        ) : ('')}
                    </div>
                ) : ('')}
            </div>
        );
    }
}

export default CurrentConditions;
import React, { Component } from 'react';
import './WeatherTile.css';

class WeatherTile extends Component {

    // render implementation
    render() {

        const name = this.props.conditions ? this.props.conditions.name : '',
              temp = this.props.conditions ? this.props.conditions.temp : '',
          detailed = this.props.conditions ? this.props.conditions.detailed : '',
            imgSrc = this.props.conditions ? this.props.conditions.icon : '';
        return(
            <div>
                <div className="tile__wrapper">
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
                        <img className="tile__img" src={imgSrc} 
                             alt="weather-icon"
                             height="60px" width="60px"></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherTile;
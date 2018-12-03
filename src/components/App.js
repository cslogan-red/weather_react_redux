import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import CurrentCondtions from './CurrentConditions';
import ThreeDayOutlook from './ThreeDayOutlook';
import SearchBar from './SearchBar';
import ExtendedOutlook from './ExtendedOutlook';
import LoadingSpinner from './LoadingSpinner';
import { LOAD_APP, SEARCH_CHANGE, 
		 EXTENDED_SEARCH, EXTENDED_CLOSE,
		 HOURLY_SEARCH, HOURLY_CLOSE } from '../actions/actionTypes';
/**
 * @abstract State to props mounting point for Weather App via redux store, 
 * API layer access is triggered via event handlers exposed here that dispatch
 * proper actions to the store - state is managed entirely via redux-sagas and
 * reflected back here via updated props which are pushed back down the tree
 * @author Chase
 */
class App extends Component {

	constructor( props) {

		super( props);
		this._handleSearchChange = this._handleSearchChange.bind( this);
		this._handleExtendedSearch = this._handleExtendedSearch.bind( this);
		this._handleExtendedCollapse = this._handleExtendedCollapse.bind( this);
		this._handleHourlySearch = this._handleHourlySearch.bind( this);
		this._handleHourlyCollapse = this._handleHourlyCollapse.bind( this);
	}

	// handle app initialization
	componentDidMount() {

		// check for existing user action
		this.props._checkForExistingUser();
	}

	// SearchBar change event handler
    _handleSearchChange( locationText) {
		
		// search change action
		this.props._handleSearchChange( locationText);
	}

	// extended outlook event handler
	_handleExtendedSearch() {

		// extended search action
		this.props._handleExtendedSearch();
	}

	// extended collpase event handler
	_handleExtendedCollapse() {

		// extended collapse action
		this.props._handleExtendedCollapse();
	}

	// hourly event handler
	_handleHourlySearch() {

		// hourly search action
		this.props._handleHourlySearch();
	}

	// hourly collpase event handler
	_handleHourlyCollapse() {

		// hourly collapse action
		this.props._handleHourlyCollapse();
	}

	// render implementation
	render() {
		
		const { location, locationName, rightNow, outlook, current, 
				extended, hourly, showHourly, showSpinner,
		     	hideForInit } = this.props;
		return (
			<div>
				{ hideForInit ? (
					<div className="app__container">
						<div className="app__loading--container">
							<LoadingSpinner showSpinner={showSpinner} />
						</div>
					</div>
				) : (
					<div className="app__container">
						{ !locationName ? (
							<div className="app__search">
								<SearchBar
									showSpinner={showSpinner}
									location={location}
									onSearchChange={this._handleSearchChange} />
							</div>
						) : (
						<div>
							<div className="app__fixed--menu">
								<SearchBar
									showSpinner={showSpinner}
									location={location}
									onSearchChange={this._handleSearchChange} />
							</div>
							<div className="app__weather--container">
								<CurrentCondtions 
									location={location}
									locationName={locationName}
									rightNow={rightNow}
									current={current}
									hourly={hourly}
									showHourly={showHourly}
									onHourlyShow={this._handleHourlySearch}
									onHourlyHide={this._handleHourlyCollapse} />
								<ThreeDayOutlook 
									outlook={outlook} />
								<ExtendedOutlook
									location={location}
									extended={extended}
									onExtendedSearch={this._handleExtendedSearch}
									onCollapse={this._handleExtendedCollapse} />
							</div>
						</div>
						) }
					</div>
				) }
			</div>
		);
	}
}
// mapStateToProps redux implementation
const mapStateToProps = ( state) => ({
	location : state.searchChange.location,
locationName : state.searchChange.locationName,
	rightNow : state.searchChange.rightNow,
	 current : state.searchChange.current, 
	 outlook : state.searchChange.outlook,
	extended : state.extended.extended,
	  hourly : state.hourly.hourly,
  showHourly : state.hourly.show,
 showSpinner : state.loadApp.showSpinner,
 hideForInit : state.loadApp.hideForInit,
 	   error : state.loadApp.error
});
// mapDispatchToProps redux implementaion, handles firing actions
// to the redux store for state update
const mapDispatchToProps = ( dispatch) => {
	return {
		_checkForExistingUser : () => dispatch({
			type : LOAD_APP
		}),
		_handleSearchChange : ( locationText) => dispatch({
			type : SEARCH_CHANGE,
		 payload : locationText
		}),
		_handleExtendedSearch : () => dispatch({
			type : EXTENDED_SEARCH
		}),
		_handleExtendedCollapse : () => dispatch({
			type : EXTENDED_CLOSE
		}),
		_handleHourlySearch : () => dispatch({
			type : HOURLY_SEARCH
		}),
		_handleHourlyCollapse: () => dispatch({
			type : HOURLY_CLOSE
		})
	};
}

export default connect( mapStateToProps,mapDispatchToProps)(App);
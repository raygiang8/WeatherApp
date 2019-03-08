import React, { Component } from 'react';

class Forecast extends Component {
	constructor(props) {
		super(props);

		this.state = {
			forecast: []
		}
	}

	getWeatherInfo = () => {
		var apiURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bc1b05cbe478a373668b696090e9ad51/${this.props.latitude},${this.props.longitude}`;
		axios.get(apiURL)
			.then(response => (
				this.mapWeather(response.data)
			));
	}

	mapWeather = (data) => {
		let dailyData = data.daily.data;

		let forecast = dailyData.map(weather => 
			<div>{weather.summary}</div>
		);

		this.setState({
			forecast: forecast
		});

		this.shouldComponentUpdate();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (JSON.stringify(this.state.forecast) !== JSON.stringify(nextState.forecast));
	}

	render() {
		console.log("rendered");
		this.getWeatherInfo();

		return (
			<div>{this.state.forecast}</div>
		);
	}
}

export default Forecast;
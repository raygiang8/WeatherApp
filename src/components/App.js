import React, { Component } from 'react';
import './App.css';
import CurrentWeatherCard from './CurrentWeatherCard';
import DailyWeatherCard from './DailyWeatherCard';
import LocationSearch from './LocationSearch';

import axios from 'axios';
import Nominatim from 'nominatim-geocoder';

const geocoder = new Nominatim();

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForecast: [],
      dailyForecast: []
    };

    this.currentLocation = '';
    this.latitude = 0;
    this.longitude = 0;
    this.results = null;
  }

  getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = "You are viewing the weather for your current location";
          this.latitude = position.coords.latitude.toFixed(4);
          this.longitude = position.coords.longitude.toFixed(4);
          this.getWeatherInfo();
        },
        function error(error_message) {
          console.error('An error has occured while retrieving location', 
            error_message);
        });
    }
    else {
        console.log('geolocation is not enabled on this browser')
    }
  }

  getLocation = (newLoc) => {
    geocoder.search( { q: newLoc } )
    .then((response) => {
      this.currentLocation = "You are viewing the weather for: " + response[0].display_name;
      this.latitude = response[0].lat;
      this.longitude = response[0].lon;
      this.getWeatherInfo();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  getWeatherInfo = () => {
    var apiURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bc1b05cbe478a373668b696090e9ad51/${this.latitude},${this.longitude}?units=ca`;
    axios.get(apiURL)
      .then(response => (
        this.mapWeather(response.data)
      ));
  }

  mapWeather = (data) => {
    let dailyData = data.daily.data;
    let keyCounter = 0;

    let dailyForecast = dailyData.map(weather => 
      <DailyWeatherCard key={keyCounter} index={keyCounter++} dailyForecast={dailyData} />
    );

    this.results = dailyForecast;

    this.setState({
      currentForecast: data.currently
    });

    this.setState({
      dailyForecast: dailyData
    });
  }

  render() {
    console.log("I HAVE RENDERED!!!");
    return(
      <div>
        <h1>Wind Gusts</h1>
        <h2>{this.currentLocation}</h2>
        <LocationSearch changeLoc={this.getLocation} />
        <CurrentWeatherCard currentForecast={this.state.currentForecast} />
        <div>{this.results ? this.results : <div>Loading...</div>}</div>
      </div>
    );
  }
}

export default WeatherApp;
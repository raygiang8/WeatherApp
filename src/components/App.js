import React, { Component } from 'react';
import './App.css';
import CurrentWeatherPanel from './CurrentWeatherPanel';
import DailyWeatherCard from './DailyWeatherCard';
import LocationSearch from './LocationSearch';
import SearchResults from './SearchResults';

import axios from 'axios';
import Nominatim from 'nominatim-geocoder';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const geocoder = new Nominatim();

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForecast: [],
      unit: "si",
      searchResults: null,
      backgroundImage: null
    };

    this.currentLocation = '';
    this.latitude = 0;
    this.longitude = 0;
    this.results = null;
    this.currentSelection = null;
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
    geocoder.search({ q: newLoc })
      .then((response) => {
        this.setState({
          searchResults: response,
        });
        this.currentSelection = 0;
        this.currentLocation = "You are viewing the weather for: " + this.state.searchResults[0].display_name;
        this.latitude = this.state.searchResults[0].lat;
        this.longitude = this.state.searchResults[0].lon;
        this.getWeatherInfo();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  locChange = (index, lat, lon, locName) => {
    this.currentSelection = index;
    this.currentLocation = "You are viewing the weather for: " + locName;
    this.latitude = lat;
    this.longitude = lon;
    this.getWeatherInfo();
  }

  //----function to toggle between units----//
  handleUnit = () => {
    if (this.state.unit === "si") {
      this.setState({
        unit: "us"
      },
        () => this.getWeatherInfo());
    }
    else {
      this.setState({
        unit: "si"
      },
        () => this.getWeatherInfo());
    }
  }

  getWeatherInfo = () => {
    let apiURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_API_KEY}/${this.latitude},${this.longitude}?units=${this.state.unit}&time=${Date.now()}`;
    axios.get(apiURL)
      .then(response => (
        this.mapWeather(response.data)
      ));
    console.log("got api info");
  }

  mapWeather = (data) => {
    let dailyData = data.daily;

    let dailyForecast = dailyData.data.map((weather, index) =>
      <Col xs={3} key={index} >
        <DailyWeatherCard index={index} dailyForecast={dailyData} />
      </Col>
    );

    this.results = dailyForecast;

    this.setState({
      currentForecast: data.currently
    });

    let pexelsURL = `https://api.pexels.com/v1/search?query=${data.currently.summary}&per_page=30&page=1`;
    let reqConfig = {
      headers: {
        authorization: process.env.REACT_APP_PEXELS_API_KEY
      }
    }
    axios.get(pexelsURL, reqConfig)
      .then(response => (
        this.getRandomPhoto(response.data.photos)
      ));
  }

  getRandomPhoto = (photos) => {
    let randomIndex = Math.floor(Math.random() * (photos.length));
    this.setState({
      backgroundImage: photos[randomIndex].src.original
    });
  }

  componentDidMount = () => {
    this.getCurrentLocation();
  };

  render() {
    console.log("I HAVE RENDERED!!!");
    return (
      <div className="m-5">
        <Row>
          <Col xs={3}>
            <h1>Hell0 there.</h1>
            <button onClick={this.handleUnit}>Toggle Unit</button>
            <h2>{this.currentLocation}</h2>
            <CurrentWeatherPanel currentForecast={this.state.currentForecast} />
          </Col>
          <Col xs={9}>
            <LocationSearch changeLoc={this.getLocation} />
            <SearchResults
              currentSelection={this.currentSelection}
              searchResults={this.state.searchResults}
              locChange={this.locChange}
            />
            <Row>
              {this.results ? this.results : <div>Loading...</div>}
            </Row>
          </Col>
        </Row>
        <img src={this.state.backgroundImage} width="500px" />
      </div>
    );
  }
}

export default WeatherApp;
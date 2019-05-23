import React from 'react';

const CurrentWeatherCard = (props) => {
  if (props.currentForecast === []) {
    return (<div>Loading...</div>);
  }

  return (
    <fieldset>
      <legend>Current Weather</legend>
      <div>Temperature: {props.currentForecast.temperature}{this.props.si ? "&#8451;" : "F"}</div>
      <div>Summary: {props.currentForecast.summary}</div>
      <div>UV Index: {props.currentForecast.uvIndex}</div>
      <div>Chance of Precipiation: {props.currentForecast.precipProbability}</div>
    </fieldset>
  );
}

export default CurrentWeatherCard;
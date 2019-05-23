import React from 'react';

const DailyWeatherCard = (props) => {
  if (props.dailyForecast === []) {
    return (<div>Loading...</div>);
  }

  const getDate = () => {
    let date = new Date(props.dailyForecast.data[props.index].time * 1000);
    // date = date.split(' ')[0];
    return date.toDateString();
  }

  return (
      <div className="mt-4 dailyCards">
        <h6><strong>{getDate()}</strong></h6>
        <div>Max Temp: {props.dailyForecast.data[props.index].temperatureHigh}{props.si ? <span>&#8451;</span> : <span>&#8457;</span>}</div>
        <div>Min Temp: {props.dailyForecast.data[props.index].temperatureLow}{props.si ? <span>&#8451;</span> : <span>&#8457;</span>}</div>
        <div className="mt-3">Precipiation: {Math.round(parseFloat(props.dailyForecast.data[props.index].precipProbability) * 100, 0) + "%"}</div>
        <div className="mt-3">{props.dailyForecast.data[props.index].summary}</div>
      </div>
  );
}

export default DailyWeatherCard;
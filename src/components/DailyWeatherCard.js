import React from 'react';

const DailyWeatherCard = (props) => {
  if(props.forecast === []) {
    return (<div>Loading...</div>);
  }

  const getDate = () => {
    let date = new Date(props.dailyForecast[props.index].time * 1000);
    return date.toString();
  }

  return (
    <div>
      <h3>{getDate()}</h3>
      <div>Wind Gust: {props.dailyForecast[props.index].windGust}</div>
      <div>Ozone: {props.dailyForecast[props.index].ozone}</div>
      <div>Moon Phase: {props.dailyForecast[props.index].moonPhase}</div>
      <div>Dew Point: {props.dailyForecast[props.index].dewPoint}</div>
    </div>
  );
}

export default DailyWeatherCard;
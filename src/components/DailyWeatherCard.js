import React from 'react';

const DailyWeatherCard = (props) => {
  if(props.dailyForecast === []) {
    return (<div>Loading...</div>);
  }

  const getDate = () => {
    let date = new Date(props.dailyForecast.data[props.index].time * 1000);
    return date.toString();
  }

  return (
    <div className="mt-4">
      <h6>{getDate()}</h6>
      <div>Wind Gust: {props.dailyForecast.data[props.index].windGust}</div>
      <div>Ozone: {props.dailyForecast.data[props.index].ozone}</div>
      <div>Moon Phase: {props.dailyForecast.data[props.index].moonPhase}</div>
      <div>Dew Point: {props.dailyForecast.data[props.index].dewPoint}</div>
    </div>
  );
}

export default DailyWeatherCard;
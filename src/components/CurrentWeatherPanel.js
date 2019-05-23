import React from 'react';

const CurrentWeatherCard = (props) => {
    if (props.currentForecast === []) {
        return (<div>Loading...</div>);
    }

    var date = new Date();
    return (
        <>
            <fieldset>
                <legend>Current Weather</legend>
                <div>{date.toDateString('en-US')}</div>

                <img src={'img/' + props.currentForecast.icon + ".svg"} width="150" alt={props.currentForecast.icon} />
                <div><span className="currWeather__temp">{Math.round(props.currentForecast.temperature)}{props.si ? <span>&#8451;</span> : <span>&#8457;</span>}</span></div>
                <div>{props.currentForecast.summary}</div>
                <div>Probability of Precipitation: {props.currentForecast.precipProbability}%</div>
            </fieldset>
        </>
    );
}

export default CurrentWeatherCard;
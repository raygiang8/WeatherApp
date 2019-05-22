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

                {/*<img src={'img/' + props.currentForecast.icon + ".svg"} width="150" alt={props.currentForecast.icon} />*/}
                
                <div className={props.currentForecast.icon} width="150"></div>

                <div>{Math.round(props.currentForecast.temperature)}&#8451;</div>
                <div>{props.currentForecast.summary}</div>
                <div>Probability of Precipitation: {props.currentForecast.precipProbability}%</div>
            </fieldset>
        </>
    );
}

export default CurrentWeatherCard;
import React from 'react';
import "./sass/mystyles.scss";


function WeatherCard(props){
  return(
    <div className="tile is-child is-2 box">
      <p className="has-text-centered"><span className="is-size-1">{props.day}</span><br /> {props.date}</p>
        <div className="has-text-centered weatherIcon">
          <i className={`wi ${props.icon} is-size-1`}></i>
        </div>
      <p className="subtitle has-text-centered"><span className="has-text-darker">{props.tempHi}°C</span>&nbsp;<span className="has-text-grey-light">{props.tempLo}°C</span></p>

    </div>
  )
}

export default WeatherCard;

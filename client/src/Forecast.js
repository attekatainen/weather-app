import React from 'react'
import './App.css';

export default function Forecast(props) {
  return (
    <div className="weather-item">
      <div className="item">
        <h4>{props.day}</h4>
      </div>
      <div className="item">
        <h4>-10°</h4>
      </div>
    </div>
  )
}

import React from 'react'
import './App.css';
import { BsFillCloudsFill as Cloudy} from "react-icons/bs"
import { WiStrongWind as Wind} from "react-icons/wi"
import { BsFillPersonFill as Person} from "react-icons/bs"

export default function WeatherElement(props) {

  const kmhtoms = (kmh) => {
    let newNumber = 0.277778 * kmh;
    newNumber = Math.round(newNumber);
    return newNumber;
  }

  const getTime = (date) => {
    const newDate = new Date(date);
    let hours = newDate.getHours();
    if (hours < 10) {
      hours = "0" + hours
    }
    return hours;
  }

  return (
    <div className="weather-item">
      <div className="item">
        <h4>{getTime(props.time)}</h4>
      </div>
      <div className="item">
        <img src={props.icon} className="condition" alt="condition"/>
      </div>
      <div className="item">
        <h4>{props.roundNumber(props.temp)}°</h4>
      </div>
      <div className="item">
        <Person/>
  	    <h4 style={{paddingLeft: "3px"}}>{props.roundNumber(props.feelslike)}°</h4>
      </div>
      <div className="item">
        <Wind/>
        <h4 style={{paddingLeft: "3px"}}>{kmhtoms(props.wind)}m/s</h4>
      </div>
    </div>
  )
}

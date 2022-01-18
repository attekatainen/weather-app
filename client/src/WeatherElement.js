import React from 'react'
import './App.css';
import { BsFillCloudsFill as Cloudy} from "react-icons/bs"
import { WiStrongWind as Wind} from "react-icons/wi"
import { BsFillPersonFill as Person} from "react-icons/bs"

export default function WeatherElement(props) {
  return (
    <div className="weather-item">
			<div className="item">
				<h4>{props.clock}</h4>
			</div>
			<div className="item">
				<h4>-10°</h4>
			</div>
			<div className="item">
				<Cloudy/>
			</div>
			<div className="item">
				<Wind/>
				<h4 style={{paddingLeft: "3px"}}>7m/s</h4>
			</div>
			<div className="item">
				<Person/>
				<h4 style={{paddingLeft: "3px"}}>-15°</h4>
			</div>
    </div>
  )
}

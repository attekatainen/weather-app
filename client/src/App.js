import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';
import WeatherElement from './WeatherElement';
import Geocode from "react-geocode";
Geocode.setApiKey("");

function App() {
  const [today, setToday] = useState(true);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [forecast, setForecast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecastToday, setforecastToday] = useState([]);
  const [forecastTomorrow, setforecastTomorrow] = useState([]);

  const handleToday = () => {
    setToday(true);
    setForecast(false);
  }

  const handleForecast = () => {
    setToday(false);
    setForecast(true);
  }

  const roundNumber = (number) => {
    const newNumber = Math.round(number);
    return newNumber;
  }

  const getDifferenceInTime = (date) => {
    const todayDate = new Date();
    const targetDate = new Date(date);
    let Difference_In_Time = targetDate.getTime() - todayDate.getTime();
    Difference_In_Time = Difference_In_Time / (1000 * 3600);
    if (Difference_In_Time > -1) {
      return true;
    } else {
      return false;
    }
  }

  const getData = () => {
    let city, country;
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function(position) {
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
          (response) => {
            for (let i = 0; i < response.results[0].address_components.length; i++) {
              for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                switch (response.results[0].address_components[i].types[j]) {
                  case "locality":
                    city = response.results[0].address_components[i].long_name;
                    setCity(city);
                    break;
                  case "country":
                    country = response.results[0].address_components[i].long_name;
                    setCountry(country);
                    break;
                }
              }
            }
            axios
            .get("http://localhost:5000/current-weather/" + city)
            .then(function (response) {
              setCurrentWeather(response.data[0]);
              setforecastToday(response.data[1]);
              setforecastTomorrow(response.data[2]);
              setLoading(false);
            })
            .catch((err) => console.error(err));
          },
          (error) => {
            console.error(error);
          }
        );
      });
    } else {
      console.log("Not Available");
    }
  }

  useEffect(() => {
    getData();
  }, [])

  if (loading) {
  return (
    <div className="spinner-div">
      <CircularProgress className="spinner"/>
    </div>
  );
  } else {
  return (
    <div>
      <div className="current-weather">
        <h4>{currentWeather.city}, {currentWeather.country}</h4>
        <h2>{currentWeather.condition}</h2>
        <h1>{roundNumber(currentWeather.temp)}°</h1>
      </div>
      <div className="navigation">
        <div className={today ? "nav-item active" : "nav-item"} onClick={handleToday}>
          <h4>Today</h4>
        </div>
        <div className={forecast ? "nav-item active" : "nav-item"} onClick={handleForecast}>
          <h4>Tomorrow</h4>
        </div>
      </div>
      {today ?
      <div className="weather-today">
        {forecastToday.map((item, index) => {
          if (getDifferenceInTime(item.time)) {
            return <WeatherElement key={index} time={item.time} temp={item.temp} condition={item.condition} wind={item.wind} feelslike={item.feelslike} icon={item.conditionicon} roundNumber={roundNumber}/>
          }
        })}
      </div>
      :
      <div className="weather-today">
        {forecastTomorrow.map((item, index) => {
          if (getDifferenceInTime(item.time)) {
            return <WeatherElement key={index} time={item.time} temp={item.temp} condition={item.condition} wind={item.wind} feelslike={item.feelslike} icon={item.conditionicon} roundNumber={roundNumber}/>
          }
        })}
      </div>
      }
    </div>
  );}
}

export default App;

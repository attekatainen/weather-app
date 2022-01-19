import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';
import WeatherElement from './WeatherElement';
import Forecast from './Forecast';

function App() {
  const [today, setToday] = useState(true);
  const [forecast, setForecast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecastOne, setforecastOne] = useState([]);

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

  const getData = async () => {
    await axios
    .get("http://localhost:5000/current-weather")
    .then(function (response) {
      setCurrentWeather(response.data[0]);
      setforecastOne(response.data[1]);
      setLoading(false);
    })
    .catch((err) => console.error(err));
  }

  useEffect(() => {
    getData();
  }, [])

  if (loading) {
  return (
    <CircularProgress className="spinner"/>
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
          <h4>Tänään</h4>
        </div>
        <div className={forecast ? "nav-item active" : "nav-item"} onClick={handleForecast}>
          <h4>5 päivän sääennuste</h4>
        </div>
      </div>
      {today ?
      <div className="weather-today">
        {forecastOne.map((item, index) => {
          const showElement = getDifferenceInTime(item.time);
          if (showElement) {
            return <WeatherElement key={index} time={item.time} temp={item.temp} condition={item.condition} wind={item.wind} feelslike={item.feelslike} roundNumber={roundNumber}/>
          }
        })}
      </div>
      :
      <div className="weather-today">
        <Forecast day="Keskiviikko, 19.1.2022"/>
        <Forecast day="torstai, 20.1.2022"/>
        <Forecast day="Perjantai, 21.1.2022"/>
        <Forecast day="Lauantai, 21.1.2022"/>
        <Forecast day="Sunnuntai, 21.1.2022"/>
      </div>
      }
    </div>
  );}
}

export default App;

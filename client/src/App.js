import { useState } from 'react';
import './App.css';
import WeatherElement from './WeatherElement';
import Forecast from './Forecast';

function App() {
  const [today, setToday] = useState(true)
  const [forecast, setForecast] = useState(false)

  const handleToday = () => {
    setToday(true);
    setForecast(false);
  }

  const handleForecast = () => {
    setToday(false);
    setForecast(true);
  }
  
  return (
    <div>
      <div className="current-weather">
        <h4>Joensuu, Finland</h4>
        <h2>Pilvinen</h2>
        <h1>-19°</h1>
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
        <WeatherElement clock="12:00"/>
        <WeatherElement clock="13:00"/>
        <WeatherElement clock="14:00"/>
        <WeatherElement clock="15:00"/>
        <WeatherElement clock="16:00"/>
        <WeatherElement clock="17:00"/>
        <WeatherElement clock="18:00"/>
        <WeatherElement clock="19:00"/>
        <WeatherElement clock="20:00"/>
        <WeatherElement clock="21:00"/>
        <WeatherElement clock="22:00"/>
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
  );
}

export default App;

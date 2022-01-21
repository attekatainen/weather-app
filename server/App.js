const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const axios = require('axios');

app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("Rest Api");
});

app.get("/current-weather/:city", (req, res) => {
  const city = req.params.city
    var options = {
        method: 'GET',
        url: '',
        params: {q: city, days: '2'},
        headers: {
          'x-rapidapi-host': '',
          'x-rapidapi-key': ''
        }
      };
      
      axios.request(options).then(function (response) {
          let data = [];
          let forecast_today = [];
          let forecast_tomorrow = [];
          const weather_object = {};
          weather_object.city = response.data.location.name;
          weather_object.country = response.data.location.country;
          weather_object.temp = response.data.current.temp_c;
          weather_object.feelslike = response.data.current.feelslike_c;
          weather_object.sunrise = response.data.forecast.forecastday[0].astro.sunrise;
          weather_object.sunset = response.data.forecast.forecastday[0].astro.sunset;
          weather_object.isday = response.data.current.is_day;
          weather_object.condition = response.data.current.condition.text;
          weather_object.conditionicon = response.data.current.condition.icon;
          weather_object.wind = response.data.current.wind_kph;
          weather_object.lastupdated = response.data.current.last_updated;

          response.data.forecast.forecastday[0].hour.map((item) => {
            const forecast_object = {};
            forecast_object.time = item.time;
            forecast_object.temp = item.temp_c;
            forecast_object.condition = item.condition.text;
            forecast_object.conditionicon = item.condition.icon;
            forecast_object.wind = item.wind_kph;
            forecast_object.feelslike = item.feelslike_c;
            forecast_today.push(forecast_object);
          });

          response.data.forecast.forecastday[1].hour.map((item) => {
            const forecast_object = {};
            forecast_object.time = item.time;
            forecast_object.temp = item.temp_c;
            forecast_object.condition = item.condition.text;
            forecast_object.conditionicon = item.condition.icon;
            forecast_object.wind = item.wind_kph;
            forecast_object.feelslike = item.feelslike_c;
            forecast_tomorrow.push(forecast_object);
          });

          data.push(weather_object);
          data.push(forecast_today);
          data.push(forecast_tomorrow);
          res.status(200).send(data)
      }).catch(function (error) {
          console.error(error);
      });
});

app.listen(port, () => {
    console.log(`Server listening on port 5000`);
});
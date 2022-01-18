const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const axios = require('axios');

app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("Rest Api");
});

app.get("/current-weather", (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: ''},
        headers: {
          'x-rapidapi-host': '',
          'x-rapidapi-key': ''
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
});

app.listen(port, () => {
    console.log(`Server listening on port 5000`);
});
const axios = require('axios');
const { API_KEY } = process.env;
const url = (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;


module.exports = (city) => {
    return axios.get(url(city));
}


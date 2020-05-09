const got = require('got');
const { API_KEY } = process.env;


module.exports = (city) => {
    const searchParams = new URLSearchParams([['q', city], ['units', 'metric'], ['appid', API_KEY]])

    return got('http://api.openweathermap.org/data/2.5/weather', { responseType: 'json', searchParams })
        .then(r => r.body)
        .catch(err => {
            console.log(err)
        })
}


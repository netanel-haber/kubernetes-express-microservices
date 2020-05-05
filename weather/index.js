require('dotenv').config();
const app = require('express')();

const api = require('./openWeatherApi');
const mong = require('./mongodbConnection');
const axios = require('axios');


app.get('/:city', async ({ params: { city } }, res) => {
    try {
        const { data } = await api(city);
        return res.json(data);
    }
    catch (ex) {
        return res.json(ex)
    }
})




const port = 5000;
app.listen(port, () => {
    console.log(`weather app listening on port ${port}.`);
})
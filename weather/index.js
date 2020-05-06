require('dotenv').config();
const app = require('express')();
const use = require('./utilities/userWeatherSchema');

const api = require('./openWeatherApi');
const mong = require('./mongodbConnection');
const axios = require('axios');
const authUrl = `http://${process.env.AUTH_URL}`;


const verifyToken = async ({ headers: { authorization } }) => {
    try {
        const { data: { payload: { username } } } = await axios({
            method: 'post',
            url: `${authUrl}/verify-token`,
            headers: {
                authorization
            }
        })
        return username;
    }
    catch (ex) { }
}


app.get('/', (req, res) => {
    res.send("hello weather");
})

app.get('/city/:city', async (req, res) => {
    try {
        const { params: { city } } = req;
        const { data } = await api(city);
        const username = await verifyToken(req);
        if(username!==undefined){

            console.log("authenticated")
        }
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
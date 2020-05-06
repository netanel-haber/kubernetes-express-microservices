require('dotenv').config();

const app = require('express')();
const { updateFeelings, updateHistory } = require('./utilities/userWeatherSchema');
const extractUsernameFromToken = require('./utilities/verifyToken')
const api = require('./openWeatherApi');
const mong = require('./mongodbConnection');



app.get('/', (req, res) => {
    res.send("hello weather");
})


app.get('/city/:city', async (req, res) => {
    try {
        const { params: { city } } = req;
        const { data } = await api(city);
        const username = await extractUsernameFromToken(req);
        if (username !== undefined) {
            await updateHistory(username, city);
        }
        return res.json(data);
    }
    catch (ex) {
        return res.status(500).end();
    }
})

app.get('/feelings/', async (req, res) => {
    try {
        const {} = req.body;
    }
    catch (ex) {

    }
})




const port = 5000;
app.listen(port, () => {
    console.log(`weather app listening on port ${port}.`);
})
require('dotenv').config();

const app = require('express')();
app.use(require('body-parser').json());
const { updateFeelings, updateHistory } = require('./utilities/userWeatherSchema');
const extractUsernameFromToken = require('./utilities/verifyToken')
const api = require('./openWeatherApi');



app.get('/', (req, res) => {
    res.send("hello weather");
})


app.get('/:city', async (req, res) => {
    try {
        const { params: { city } } = req;
        const { data } = await api(city);
        const username = await extractUsernameFromToken(req);
        if (username !== undefined)
            await updateHistory(username, city);

        return res.json(data);
    }
    catch (ex) {
        return res.status(500).end();
    }
})

app.post('/feelings/:city', async (req, res) => {
    try {
        const username = await extractUsernameFromToken(req);
        const { city } = req.params;
        const { feeling } = req.body;
        if (!city || !feeling || username === undefined) 
            return res.status(400).end();
        await updateFeelings(username, city, feeling);
        res.end();
    }
    catch (ex) {
        return res.status(500).end();
    }
})




const port = 5000;
app.listen(port, () => {
    console.log(`weather app listening on port ${port}.`);
})
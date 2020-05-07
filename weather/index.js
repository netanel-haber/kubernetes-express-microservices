require('dotenv').config();

const app = require('express')();
app.
    use(require('body-parser').json()).
    get('/history', require('./routes/getSearchHistoy')).
    get('/:city', require('./routes/getCity')).
    post('/:city', require('./routes/postFeelings'));



const port = process.env.WEATHER_PORT;
app.listen(port, () => {
    console.log(`weather app listening on port ${port}.`);
})
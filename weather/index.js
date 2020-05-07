require('dotenv').config();

const app = require('express')();
app.
    use(require('body-parser').json()).
    get('/', (req, res) => res.send("hello weather")).
    get('/:city', require('./routes/getCity')).
    post('/:city', require('./routes/postFeelings'));


const port = 5000;
app.listen(port, () => {
    console.log(`weather app listening on port ${port}.`);
})
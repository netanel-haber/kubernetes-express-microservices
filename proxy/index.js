require('dotenv').config();
const app = require('express')();
app.use(require('body-parser').json());
require('./utilities/prepRes')(app);

const axios = require('axios');
const services = { weather: 3000, auth: 5000 };


app.use('/:service/:query', (req, res) => {
    try {
        const { service, query } = req.params;
        
        if (!Object.keys(services).includes(service))
            return res.prepRes(401, false);
        
        
    }
    catch (ex) {
        return res.prepRes(500, false);
    }
})



const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`proxy running on port ${port}`);
})



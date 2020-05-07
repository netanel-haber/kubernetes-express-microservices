require('dotenv').config();
const app = require('express')();
app.use(require('body-parser').json());
require('./utilities/prepRes')(app);

const axios = require('axios');
const services = { weather: 5000, auth: 3000 };



app.use(async (req, res) => {
    try {
        const [, service, ...actualQuery] = req.originalUrl.split('/')
        const { method, body } = req;
        const { authorization } = req.headers;
        if (!Object.keys(services).includes(service))
            return res.prepRes(404, false);

        const port = services[service];
        return axios({
            method,
            url: `http://${service}:${port}/${actualQuery.join('/')}`,
            headers: { ...(authorization && { authorization }) },
            data: body
        })
            .then(({ status, data }) => res.prepRes(status, true, data && data))
            .catch((err) => res.prepRes(err.response.status, false))

    }
    catch (ex) {
        return res.prepRes(500, false);
    }
})



const port = 8080;
app.listen(port, () => {
    console.log(`proxy running on port ${port}`);
})



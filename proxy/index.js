require('dotenv').config();
const app = require('express')();
app.use(require('body-parser').json());
require('./utilities/prepRes')(app);

const axios = require('axios');
const services = { weather: process.env.WEATHER_PORT, auth: process.env.AUTH_PORT };
const url = require('url');

app.use('/:service/:actualQuery', async (req, res) => {
    try {
        const { service, actualQuery } = req.params;
        const qs = url.parse(req.url).query;
        const { method, body } = req;
        const { authorization } = req.headers;
        if (!Object.keys(services).includes(service))
            return res.prepRes(404, false);
        const port = services[service];
        console.log(`http://${service}:${port}/${actualQuery}${qs ? '?' + qs : ''}`);
        console.log({ service, port, actualQuery });
        return axios({
            method,
            url: `http://${service}:${port}/${actualQuery}${qs ? '?' + qs : ''}`,
            headers: { ...(authorization && { authorization }) },
            data: body
        })
            .then(({ status, data }) => res.prepRes(status, true, data && data))
            .catch((err) => res.prepRes(err.response.status, false))

    }
    catch (ex) {
        console.log({ ex });
        return res.prepRes(500, false, ex);
    }
})



const port = process.env.PROXY_PORT || 8080;
app.listen(port, () => {
    console.log(`proxy running on port ${port}`);
})



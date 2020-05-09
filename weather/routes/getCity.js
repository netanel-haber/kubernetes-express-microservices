const { updateHistory } = require('../utilities/userWeatherSchema');
const extractUsernameFromToken = require('../utilities/verifyToken');
const weatherApi = require('../utilities/openWeatherApi');

module.exports = async (req, res) => {
    try {
        const { params: { city } } = req;
        const weather = await weatherApi(city);
        const username = await extractUsernameFromToken(req);
        if (username !== undefined)
            await updateHistory(username, city);
        return res.json(weather);
    }
    catch (ex) {
        console.log({ ex });
        return res.status(500).end();
    }
}


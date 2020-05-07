const { updateHistory } = require('../utilities/userWeatherSchema');
const extractUsernameFromToken = require('../utilities/verifyToken');
const weatherApi = require('../utilities/openWeatherApi');

module.exports = async (req, res) => {
    try {
        const { params: { city } } = req;
        const { data } = await weatherApi(city);
        const username = await extractUsernameFromToken(req);
        if (username !== undefined)
            await updateHistory(username, city);
        return res.json(data);
    }
    catch (ex) {
        return res.status(500).end();
    }
}
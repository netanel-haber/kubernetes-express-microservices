const extractUsernameFromToken = require('../utilities/verifyToken');
const { getSearchHistory } = require('../utilities/userWeatherSchema');

module.exports = async (req, res) => {
    try {
        const username = await extractUsernameFromToken(req);
        if (username === undefined)
            return res.status(401).end();
        return res.json(await getSearchHistory(username));
    }
    catch (ex) {
        return res.status(500).end();
    }
}
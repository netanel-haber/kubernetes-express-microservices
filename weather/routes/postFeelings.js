const { updateFeelings } = require('../utilities/userWeatherSchema');
const extractUsernameFromToken = require('../utilities/verifyToken')


module.exports = async (req, res) => {
    try {
        const username = await extractUsernameFromToken(req);
        const { city } = req.params;
        const { feeling } = req.query;
        if (!username)
            return res.status(401).end();
        if (!city || !feeling)
            return res.status(400).end();
        await updateFeelings(username, city, feeling);
        res.end();
    }
    catch (ex) {
        return res.status(500).end();
    }
};
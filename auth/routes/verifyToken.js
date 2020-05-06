const { verifyToken } = require('../utilities/jwt');

module.exports = async ({ headers: { authorization } }, res) => {
    try {
        if (!authorization)
            return res.status(403).end();
        const [bearer, token] = authorization.split(' ');
        const decoded = await verifyToken(token);
        return res.json(decoded);
    }
    catch (ex) {
        res.status(500).end();
    }
}
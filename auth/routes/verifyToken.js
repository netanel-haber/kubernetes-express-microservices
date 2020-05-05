const { verifyToken } = require('../utilities/jwt');

module.exports = async ({ headers: { authorization } }, res) => {
    try {
        if (!authorization)
            return res.status(403).end();
        const [bearer, token] = authorization.split(' ');
        if (!await verifyToken(token))
            return res.status(403).end();
        return res.status(200).end()
    }
    catch (ex) {
        res.status(500).end();
    }
}
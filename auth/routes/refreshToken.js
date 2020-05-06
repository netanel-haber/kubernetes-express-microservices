const { verifyToken } = require('../utilities/jwt');
const { genToken } = require('../utilities/jwt');

module.exports = async ({ headers: { authorization } }, res) => {
    try {
        if (!authorization)
            return res.status(403).end();
        const [bearer, token] = authorization.split(' ');
        return verifyToken(token)
            .then(({ payload: { username } }) => genToken(username, '15m'))
            .then(token => res.json({ token }))
            .catch(ex => res.status(403).end())
    }
    catch (ex) {
        return res.status(500).end();
    }
}
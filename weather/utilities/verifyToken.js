const axios = require('axios');
const verifyToken = async ({ headers: { authorization } }) => {
    try {
        const { data: { payload: { username } } } = await axios({
            method: 'post',
            url: `http://${process.env.AUTH_URL || 'localhost'}:${process.env.AUTH_PORT}/verify-token`,
            headers: {
                authorization
            }
        })
        return username;
    }
    catch (ex) { }
}

module.exports = verifyToken;
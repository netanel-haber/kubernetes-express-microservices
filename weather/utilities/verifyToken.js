const axios = require('axios');
const verifyToken = async ({ headers: { authorization } }) => {
    try {
        const { data: { payload: { username } } } = await axios({
            method: 'post',
            url: `http://auth:${process.env.AUTH_PORT}/verify-token`,
            headers: {
                authorization
            }
        })
        return username;
    }
    catch (ex) { }
}

module.exports = verifyToken;
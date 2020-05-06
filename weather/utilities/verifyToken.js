const axios = require('axios');

const verifyToken = async ({ headers: { authorization } }) => {
    try {
        const { data: { payload: { username } } } = await axios({
            method: 'post',
            url: `${authUrl}/verify-token`,
            headers: {
                authorization
            }
        })
        return username;
    }
    catch (ex) { }
}

module.exports = verifyToken;
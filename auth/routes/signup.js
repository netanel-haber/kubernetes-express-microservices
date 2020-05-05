const query = require('../connection');
const { genHash, genSalt } = require('../utilities/hash_salt');
const { genToken } = require('../utilities/jwt');


module.exports = async ({ body: { username, password } }, res) => {
    try {
        const salt = genSalt();
        const hash = genHash(password + salt);
        await query('INSERT INTO `users` SET ?', { username, salt, hash });
        return res.status(200).json({ token: await genToken({ username }, '15m') });
    }
    catch (ex) {
        return res.status(500).end();
    }
}
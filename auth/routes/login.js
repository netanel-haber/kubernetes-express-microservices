const query = require('../connection');
const { genHash } = require('../utilities/hash_salt');
const { genToken } = require('../utilities/jwt');

module.exports = async ({ body: { username, password } }, res) => {
    try {
        const [user] = await query("SELECT * FROM `users` WHERE ?;", { username });
        if (!user)
            return res.status(404).end();

        const { hash, salt } = user;
        if (genHash(password + salt) !== hash)
            return res.status(403).end();

        return res.status(200).json({ token: await genToken({ username }, '15m') });
    }
    catch (ex) {
        return res.status(500).end();
    }
}
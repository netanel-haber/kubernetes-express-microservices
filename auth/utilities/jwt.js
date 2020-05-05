const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

function genToken(payload, expiresIn) {
    return new Promise((res, rej) => {
        jwt.sign({ payload }, SECRET, { expiresIn }, (err, token) => {
            (err) ? rej(err) : res(token);
        });
    })
}

function verifyToken(token) {
    return new Promise((res, rej) => {
        jwt.verify(token, SECRET, (err, decoded) => {
            (err) ? rej(err) : res(decoded)
        });
    })
}

module.exports = { genToken, verifyToken }
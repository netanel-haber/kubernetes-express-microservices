const mysql = require('mysql');

const { SQL_HOST, SQL_USER, SQL_PASSWORD, SQL_DB } = process.env;
const connectionConfig = {
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DB
};

module.exports = (...q) => new Promise((res, rej) => {
    const connection = mysql.createConnection(connectionConfig);
    connection.connect();
    connection.query(...q, function (error, results, fields) {
        connection.end();
        if (error) rej(error)
        if (results) res(results);
    });
});
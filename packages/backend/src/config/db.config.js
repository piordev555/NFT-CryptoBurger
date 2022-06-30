// const dotenv = require('dotenv').config({path: '../../.env'}).parsed;

let dbName;
if (process.env.ENVIRONMENT === 'development') {
    dbName = 'cryptoburgers-dev';
} else if (process.env.ENVIRONMENT === 'production') {
    dbName = 'cryptoburgers';
}

module.exports = {
    HOST: "localhost",
    PORT: 27017,
    DB: dbName
};
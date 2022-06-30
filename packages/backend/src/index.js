const express = require('./services/express')
const routes = require('./routes')
const {appConfig} = require('./config')
const app = express(routes)
const wss = require('./services/socketServer');
const mongoose = require('./services/mongoose');
require('./services/web3.service');

app.listen(appConfig.APP_PORT, () => {
  console.log(
    'Express server listening on %d, in %s mode',
    appConfig.APP_PORT,
    appConfig.ENV,
  )
})

module.exports = app

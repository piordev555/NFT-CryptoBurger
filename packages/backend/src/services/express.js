const fs = require('fs')
const resolvePath = require('path').resolve
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const queryErrorHandler = require('querymen').errorHandler
const bodyErrorHandler = require('bodymen').errorHandler

module.exports = function expressApp(routes) {
  const app = express()

  app.use(cors())
  app.use(function (req, res, next) {
      res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
      );
      next();
  });

  app.use(compression())
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(express.static(resolvePath(__dirname, '../../build')))
  app.use(routes)
  app.get('/*', (req, res) => {
    const contents = fs.readFileSync(
      resolvePath(__dirname, '../../build/index.html'),
      'utf8',
    )
    res.send(contents)
  })
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}

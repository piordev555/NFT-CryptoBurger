
const apiRouter = require('./api.route');
const assetRouter = require('./asset.route');
const Router = require('express').Router;
const router = new Router();

router.use('/api', apiRouter);
router.use('/assets', assetRouter);

module.exports =  router;

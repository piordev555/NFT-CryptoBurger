
const {assetController} = require("../controllers");
const Router = require('express').Router;
const router = new Router();

router.get(
    "/:dirName/:fileName",
    assetController.getStaticFiles
);

module.exports = router;
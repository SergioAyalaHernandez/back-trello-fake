var express = require("express");
var refreshTokenController = require("../controllers/refreshTokenController");

var router = express.Router();
router.post('/', refreshTokenController.refreshToken);


module.exports = router;
var express = require("express");
var admController = require("../controllers/admController");

var router = express.Router();

router.get("/Countries",admController.getCountries);
router.get("/States",admController.getStates);
router.get("/Cities",admController.getCities);


module.exports = router;
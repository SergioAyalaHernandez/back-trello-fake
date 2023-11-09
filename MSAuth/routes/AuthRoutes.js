var express = require("express");
var userController = require("../controllers/authController");

var router = express.Router();
router.post('/', userController.authentication);
router.use((req, res, next) => {
    const errorResponse = {
        status: 405,
        message: 'HTTP method not allowed on this route',
    };
    console.log(`${req.method} method not allowed on this route`);
    res.status(errorResponse.status).json(errorResponse);
});

module.exports = router;
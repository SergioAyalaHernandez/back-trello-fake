var express = require("express");
var profilesController = require("../controller/profileController");

var router = express.Router();
router.get('/', profilesController.getProfiles);
router.post('/', profilesController.createProfiles);
router.patch('/:id', profilesController.updateProfile);
router.use((req, res, next) => {
    const errorResponse = {
        status: 405,
        message: 'HTTP method not allowed on this route',
    };
    console.log(`${req.method} method not allowed on this route`);
    res.status(errorResponse.status).json(errorResponse);
});
module.exports = router;
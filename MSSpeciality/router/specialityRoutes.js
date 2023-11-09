var express = require("express");
var specialityController = require("../controller/specialityController");

var router = express.Router();
router.get('/', specialityController.getSpeciality);
router.post('/', specialityController.createSpeciality);
router.patch('/:id', specialityController.updateSpeciality);
router.use((req, res, next) => {
    const errorResponse = {
        status: 405,
        message: 'HTTP method not allowed on this route',
    };
    console.log(`${req.method} method not allowed on this route`);
    res.status(errorResponse.status).json(errorResponse);
});
module.exports = router;
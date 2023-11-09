var express = require("express");
var officeController = require("../controller/officeController");

var router = express.Router();
router.get('/', officeController.getOffice);
router.post('/', officeController.createOffice);
router.patch('/:id', officeController.updateOffice);
router.use((req, res, next) => {
    const errorResponse = {
        status: 405,
        message: 'HTTP method not allowed on this route',
    };
    console.log(`${req.method} method not allowed on this route`);
    res.status(errorResponse.status).json(errorResponse);
});

module.exports = router;
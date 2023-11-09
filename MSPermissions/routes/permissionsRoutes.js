var express = require("express");
var permissionsController = require("../controller/permissionsController");

var router = express.Router();
router.get('/', permissionsController.getPermissions);
router.post('/', permissionsController.createPermissions);
router.patch('/:id', permissionsController.updatePermission);
router.use((req, res, next) => {
    const errorResponse = {
        status: 405,
        message: 'HTTP method not allowed on this route',
    };
    console.log(`${req.method} method not allowed on this route`);
    res.status(errorResponse.status).json(errorResponse);
});

module.exports = router;
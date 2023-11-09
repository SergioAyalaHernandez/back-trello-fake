var express = require("express");
var courtRoomsController = require("../controller/courtRoomsController");

var router = express.Router();
router.get('/', courtRoomsController.getCourtRooms);
router.post('/', courtRoomsController.createCourtRooms);
router.patch('/:id', courtRoomsController.updateCourtRooms);
router.use((req, res, next) => {
    const errorResponse = {
        status: 405,
        message: 'HTTP method not allowed on this route',
    };
    console.log(`${req.method} method not allowed on this route`);
    res.status(errorResponse.status).json(errorResponse);
});
module.exports = router;
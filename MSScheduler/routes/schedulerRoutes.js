var express = require("express");
var schedulerController = require("../controllers/schedulerController");

var router = express.Router();
router.get("/",schedulerController.getSchedulers);
router.get("/findById/:id",schedulerController.getSchedulersById);
router.post('/', schedulerController.createScheduler);
router.patch('/:id', schedulerController.updateScheduler);

router.use((req, res, next) => {
    const errorResponse = {
        status: 405,
        message: 'HTTP method not allowed on this route',
    };
    console.log(`${req.method} method not allowed on this route`);
    res.status(errorResponse.status).json(errorResponse);
});
module.exports = router;
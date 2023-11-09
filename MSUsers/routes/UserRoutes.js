var express = require("express");
var userController = require("../controllers/userController");

var router = express.Router();
router.get("/getById/:id",userController.getUserProfile);
router.get("/",userController.getUsers);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.post("/reset", userController.resetPasswordUser);
router.post('/login', userController.loginUser);

router.use((req, res, next) => {
    const errorResponse = {
        status: 405,
        message: 'HTTP method not allowed on this route',
    };
    console.log(`${req.method} method not allowed on this route`);
    res.status(errorResponse.status).json(errorResponse);
});
module.exports = router;
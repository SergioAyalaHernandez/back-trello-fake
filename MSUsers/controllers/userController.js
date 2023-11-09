const userService = require('../services/userServices');

const { validateTokenMiddleware } = require("../services/authMiddleware");

exports.getUserProfile = [validateTokenMiddleware, async (req, res) => {
  try {
    console.log("Start get User by id");
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: "Error obtaining users" });
  }
}];

exports.getUsers = [validateTokenMiddleware, async (req, res) => {
  console.log("Start get users");
  try {
    const user = await userService.getAllUsers();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error obtaining users:', error);
    res.status(404).json({ error: 'Error obtaining users' });
  }
}];

exports.createUser = [validateTokenMiddleware, async (req, res) => {
  try {
    console.log("Start to create User");
    var userData = req.body;
    var result = await userService.createUser(userData);

    if (result === 'Name or Mail already exists') {
      console.log(`the mail ${userData.email} or user ${userData.name} already registered`);
      res.status(400).json({
        success: false,
        message: `the email ${userData.email} or user ${userData.name} already registered`,
      });
    } else {
      console.log(`User successfully created with id: ${result}`);
      res.status(201).json({
        success: true,
        message: 'User successfully created',
        userId: result,
      });
    }
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(500).json({ error: error.message });
  }
}];


exports.loginUser = [validateTokenMiddleware, async (req, res) => {
  try {
    const { email, password, loginFlag } = req.body;
    console.log(`start login User whith email ${email}`);
    const user = await userService.validateUserPassword(email, password, loginFlag);
    res.status(202).json(user);
  } catch (error) {
    console.error(`Error when searching for user: ${error.message}`);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}];


exports.updateUser = [validateTokenMiddleware, async (req, res) => {
  console.log("Start update user");
  var userId = req.params.id;
  const updatedUserData = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, updatedUserData);
    res.json(updatedUser);
  } catch (error) {
    console.log(`error: ${error} with user ${userId}`);
    res.status(500).json({ error: 'Error updating user' });
  }
}];

exports.resetPasswordUser = [validateTokenMiddleware, async (req, res) => {
  console.log("Start reset password user");
  const resetPasswordData = req.body;
  try {
    const result = await userService.resetPassword(resetPasswordData);
    if (result.status === 'Success') {
      res.json({ status: 'Success', userId: result.userId });
    } else if (result.status === 'EmailNotExists') {
      res.status(404).json({ status: 'EmailNotExists' });
    } else {
      res.status(500).json({ status: 'ServerError' });
    }
  } catch (error) {
    console.log(`error: ${error} with email ${resetPasswordData.email}`);
    res.status(500).json({ error: 'Error reset password email' });
  }
}];

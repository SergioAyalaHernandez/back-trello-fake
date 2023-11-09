const authServices = require('../services/authServices');

exports.authentication = async (req, res) => {
  try {
    const { userId, clientSecret } = req.body;
    console.log(`Start generate token with user ${userId} and password ${clientSecret}`);
    const token = await authServices.validateUserPassword(userId, clientSecret, "token");
    const refreshToken = await authServices.validateUserPassword(userId, clientSecret, "refreshToken");
    res.status(200).header('authorization').json({
      message: 'authorized user',
      access_token: token,
      refresh_token: refreshToken
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


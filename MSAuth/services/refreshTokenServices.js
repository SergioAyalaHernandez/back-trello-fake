
const User = require('../model/user');
const jwt = require("jsonwebtoken");
const authServices = require("./authServices");


exports.validateRefreshToken = async (userId, clientSecret, refreshToken) => {
  try {
    const result = {
      success: false,
      error: null,
      data: null
    };
    var userFound = await User.findOne({ userId: userId }).exec();
    if (!userFound || userFound.clientSecret !== clientSecret || userFound.refreshToken !== refreshToken) {
      result.error = "Usuario, contraseña o Refresh Token inválidos";
      return result;
    } else {
      var newToken = await authServices.validateUserPassword(userId, clientSecret, "token");
      result.success = true;
      result.data = newToken;
      return result;
    }
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    throw error;
  }
};
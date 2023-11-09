
const User = require('../model/user');
const jwt = require("jsonwebtoken");


exports.validateUserPassword = async (userId, clientSecret, type) => {
  try {
    const userFound = await User.findOne({ userId: userId }).select('userId clientId clientSecret createdAd').exec();
    if (!userFound) return "Usuario no encontrado";
    if (userFound.clientSecret !== clientSecret) return "Contraseña inválida";
    if (type === "token") {
      return createToken(userFound);
    }
    if (type === "refreshToken") {
      return createRefreshToken(userFound);
    }

  } catch (error) {
    console.error('Error al buscar usuario:', error);
    throw error;
  }
};


function createToken(userFound) {
  return jwt.sign(
    { User: userFound },
    process.env.SECRET_KEY,
    { expiresIn: process.env.EXPIRES_TOKEN }
  );
}

function createRefreshToken(userFound) {
  const refreshToken = jwt.sign(
    { User: userFound },
    process.env.SECRET_KEY,
    { expiresIn: process.env.EXPIRES_REFRESH_TOKEN }
  );
  return User.findOneAndUpdate(
    { clientId: userFound.clientId },
    { refreshToken: refreshToken },
    { new: true }
  )
    .then(() => {
      return refreshToken;
    })
    .catch((error) => {
      throw error;
    });
}
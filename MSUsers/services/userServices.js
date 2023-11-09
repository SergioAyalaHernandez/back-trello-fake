const User = require('../model/user');
var validator = require("validator");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const { use } = require('../routes/UserRoutes');

exports.getUserById = async (userId) => {
  console.log(`find user with id: ${userId}`);
  return await User.findById(userId);
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Error getting users in the service');
  }
};

exports.createUser = async (userData) => {
  let email = userData.email;
  let name = userData.name;
  if (!validatefields(userData)) {
    throw new Error('There are missing parameters in the JSON. Please provide all required fields.');
  }
  var userExists = await valideExistUserEmail(name, email);
  console.log(userExists);
  if (userExists) {
    return "Name or Mail already exists";
  }
  var newUser = new User(userData);
  var savedUser = await newUser.save();
  console.log(savedUser._id);
  return savedUser._id;
};


exports.validateUserPassword = async (email, password, loginFlag) => {
  try {
    var userFound = await User.findOne({ email: email }).exec();
    if (!userFound) return "User not found";
    if (loginFlag) {
      if (userFound.passwordTemporaly !== password) {
        throw { statusCode: 401, message: "Temporary password invalid" };
      }
      updatedRandomPassword(userFound);
    } else {
      if (userFound.password !== password) {
        throw { statusCode: 401, message: "Password invalid" };
      }
    }
    return userFound;
  } catch (error) {
    console.error('Error when searching for user:', error);
    throw error;
  }
};



exports.validateToken = async (authorization) => {
  try {
    var payload = jwt.verify(authorization, process.env.SECRET_KEY);
    return { success: true, payload };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { success: false, error: 'Token expired' };
    } else if (error.name === 'JsonWebTokenError') {
      return { success: false, error: 'Invalid token' };
    } else {
      return { success: false, error: 'Error in the token' };
    }
  }
}


exports.updateUser = async (userId, updatedUserData) => {
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }
    for (const key in updatedUserData) {
      if (key !== 'name' && key !== 'email' && key !== '_id' && key in existingUser) {
        existingUser[key] = updatedUserData[key];
      }
    }
    const updatedUser = await existingUser.save();
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

exports.resetPassword = async (resetPasswordData) => {
  try {
    var emailExists = await validateEmail(resetPasswordData.email);
    if (!emailExists) {
      return "Email does not exist in database";
    } else {
      var userFound = await User.findOne({ email: resetPasswordData.email }).exec();
      var userNewPass = await updatedRandomPassword(userFound);
      sendEmailNewPassword(userFound.email, userNewPass.passwordTemporaly);
      return { status: 'Success', userId: userNewPass._id };
    }
  } catch {
    console.error('Error resetPassword user:', error);
    throw error;
  }
};

async function updatedRandomPassword(userFound) {
  console.log("Start update random password");
  var resetPassword = await setRandomPassword();
  const updatedUserDataNewPAss = {
    passwordTemporaly: resetPassword
  };
  var userNewPass = await exports.updateUser(userFound._id, updatedUserDataNewPAss);
  return userNewPass;
};

async function setRandomPassword() {
  const characters = process.env.CHARACTERS;
  return Array.from({ length: 15 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
};

async function validatefields(objeto) {
  console.log("start validate inputs");
  for (const propiedad in objeto) {
    if (!objeto[propiedad]) {
      return false;
    }
  }
  return true;
}

async function sendEmailNewPassword(addressee, mensaje) {
  const apiUrl = process.env.API_URL
  const token = process.env.TOKEN_API;
  const data = {
    session: { TokenId: token },
    Content: {
      from: 'notifix@axede.app',
      subject: 'email from notifix',
      text: `Su contraseña temporal es: ${mensaje}`
    },
    recipients: [{ address: addressee }],
  };
  try {
    const response = await axios.post(apiUrl, data, { headers: { 'Content-Type': 'application/json' } });
    if (response.status === 200) console.log('Mail sent successfully');
    else console.error('Error sending mail:', response.status, response.statusText);
  } catch (error) {
    console.error('Error sending mail:', error.message);
  }
};


async function valideExistUserEmail(email, name) {
  try {
    console.log(email, name);
    var userFound = await User.findOne({
      $or: [
        { name: { $regex: name, $options: 'i' } },
        { email: { $regex: email, $options: 'i' } }
      ]
    }).exec();
    return userFound !== null;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
}


async function validateEmail(email) {
  try {
    var userFound = await User.findOne({ email: email }).exec();
    if (!userFound) return false;
    return true;
  } catch (error) {
    console.error('Error when searching for emails user:', error);
    throw error;
  }
};


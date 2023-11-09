const Scheduler = require('../model/scheduler');
var validator = require("validator");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const { use } = require('../routes/schedulerRoutes');

exports.getSchedulerById = async (schedulerId) => {
  console.log(`find scheduler with id: ${schedulerId}`);
  return await Scheduler.findById(schedulerId);
};

exports.getAllSchedulers = async () => {
  try {
    const scheduler = await Scheduler.find();
    return scheduler;
  } catch (error) {
    throw new Error('Error getting scheduler in the service');
  }
};

exports.createScheduler = async (schedulerData) => {
  let processNumber = schedulerData.processNumber;
  if (!validatefields(schedulerData)) {
    throw new Error('There are missing parameters in the JSON. Please provide all required fields.');
  }
  var schedulerExists = await valideExistProcessNumber(processNumber);
  if (schedulerExists) {
    return "process number already exists";
  }
  var newScheduler = new Scheduler(schedulerData);
  var savedScheduler = await newScheduler.save();
  console.log(savedScheduler._id);
  return savedScheduler._id;
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


exports.updateScheduler = async (userId, updatedUserData) => {
  try {
    const existingUser = await Scheduler.findById(userId);
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


async function validatefields(objeto) {
  console.log("start validate inputs");
  for (const propiedad in objeto) {
    if (!objeto[propiedad]) {
      return false;
    }
  }
  return true;
};

async function valideExistProcessNumber(processNumber) {
  try {
    console.log(processNumber);
    var processNumberFound = await Scheduler.findOne({
      processNumber: { $regex: processNumber, $options: 'i' }
    }).exec();
    console.log(processNumberFound);
    return processNumberFound !== null;
  } catch (error) {
    console.error("Error in the database query", error);
    throw error;
  }
};




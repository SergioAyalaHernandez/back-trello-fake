const Speciality = require('../model/speciality');
const jwt = require("jsonwebtoken");

exports.getAllspeciality = async () => {
  try {
    const profiles = await Speciality.find();
    return profiles;
  } catch (error) {
    throw new Error('Error obtaining speciality in the service');
  }
};

exports.createSpeciality = async (specialityData) => {
  let nameFound = specialityData.name;
  let codeFound = specialityData.code;
  if (!validatefields(specialityData)) {
    throw new Error('There are missing parameters in the JSON. Please provide all required fields.');
  }
  var specialityExists = await valideExistSpeciality(nameFound,codeFound);
  if (specialityExists) {
    return "Speciality already exists";
  }
  var specialityExists = new Speciality(specialityData);
  var savedSpeciality = await specialityExists.save();
  console.log(`id new Speciality: ${savedSpeciality._id}`);
  return savedSpeciality._id;
};

exports.updatedSpeciality = async (specialityId, updatedspecialityData) => {
  try {
    const existingSpeciality = await Speciality.findById(specialityId);
    if (!existingSpeciality) {
      throw new Error('Speciality not found');
    }
    for (const key in updatedspecialityData) {
      if (key !== '_id' && key in existingSpeciality) {
        existingSpeciality[key] = updatedspecialityData[key];
      }
    }
    const updatedSpeciality = await existingSpeciality.save();
    return updatedSpeciality;
  } catch (error) {
    console.error('Error updating Speciality:', error);
    throw error;
  }
};

exports.validateToken = async (authorization) => {
  try {
    const payload = jwt.verify(authorization, process.env.SECRET_KEY);
    return { success: true, payload };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { success: false, error: 'Token expired' };
    } else if (error.name === 'JsonWebTokenError') {
      return { success: false, error: 'Token no válido' };
    } else {
      return { success: false, error: 'Error en el token' };
    }
  }
};

async function valideExistSpeciality(name, code) {
  try {
    var specialityFound = await Speciality.findOne({
      $or: [
        { name: { $regex: name, $options: 'i' } },
        { code: { $regex: code, $options: 'i' } }
      ]
    }).exec();
    return !!specialityFound;
  } catch (error) {
    console.error("Error in database query:", error);
    throw error;
  }
};


function validatefields(objeto) {
  console.log("start validate inputs");
  for (const propiedad in objeto) {
    if (!objeto[propiedad]) {
      return false;
    }
  }
  return true;
};
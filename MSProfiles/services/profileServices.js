const profile = require('../model/profile');
const jwt = require("jsonwebtoken");

exports.getAllProfiles = async () => {
  try {
    const profiles = await profile.find();
    return profiles;
  } catch (error) {
    throw new Error('Error obtaining permissions in the service');
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
}

exports.createProfiles = async (profileData) => {
  let nameFound = profileData.name;
  if (!validatefields(profileData)) {
    throw new Error('There are missing parameters in the JSON. Please provide all required fields.');
  }
  var profilesExists = await valideExistPermission(nameFound);
  if (profilesExists) {
    return "Profile already exists";
  }
  var profileExists = new profile(profileData);
  var savedProfile = await profileExists.save();
  console.log(`id new profile: ${savedProfile._id}`);
  return savedProfile._id;
};

exports.updatedProfile = async (profileId, updatedProfileData) => {
  try {
    const existingProfile = await profile.findById(profileId);
    if (!existingProfile) {
      throw new Error('Profile not found');
    }
    for (const key in updatedProfileData) {
      if (key !== '_id' && key in existingProfile) {
        existingProfile[key] = updatedProfileData[key];
      }
    }
    const updatedProfile = await existingProfile.save();
    return updatedProfile;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};


async function valideExistPermission(nameFound) {
  try {
    var nameFound = await profile.findOne({
      name: nameFound
    }
    ).exec();
    return !!nameFound;
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
const CourtRooms = require('../model/courtRooms');
const jwt = require("jsonwebtoken");

exports.getAllCourtRooms = async () => {
  try {
    const courtRooms = await CourtRooms.find();
    return courtRooms;
  } catch (error) {
    throw new Error('Error obtaining court rooms in the service');
  }
};

exports.createCourtRooms = async (courtRoomsData) => {
  let nameFound = courtRoomsData.name;
  if (!validatefields(courtRoomsData)) {
    throw new Error('There are missing parameters in the JSON. Please provide all required fields.');
  }
  var courtRoomExists = await valideExistCourtRooms(nameFound);
  if (courtRoomExists) {
    return "Speciality already exists";
  }
  var courtRoomExists = new CourtRooms(courtRoomsData);
  var savedcourtRoom = await courtRoomExists.save();
  console.log(`id new court room: ${savedcourtRoom._id}`);
  return savedcourtRoom._id;
};

exports.updatedCourtRooms = async (courtRoomsId, updatedCourtRoomsData) => {
  try {
    const existingCourtRooms = await CourtRooms.findById(courtRoomsId);
    if (!existingCourtRooms) {
      throw new Error('Court Room not found');
    }
    for (const key in updatedCourtRoomsData) {
      if (key !== 'name' && key !== '_id' && key in existingCourtRooms) {
        existingCourtRooms[key] = updatedCourtRoomsData[key];
      }
    }
    const updatedCourtRoom = await existingCourtRooms.save();
    return updatedCourtRoom;
  } catch (error) {
    console.error('Error updating profile:', error);
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

async function valideExistCourtRooms(nameCourtRooms) {
  try {
    var nameCourtRooms = await CourtRooms.findOne({
      name: nameCourtRooms
    }).exec();
    return !!nameCourtRooms;
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
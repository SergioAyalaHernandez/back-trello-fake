const Office = require('../model/office');
const jwt = require("jsonwebtoken");

exports.getAllOffice = async () => {
    try {
        const office = await Office.find();
        return office;
    } catch (error) {
        throw new Error('Error obtaining office in the service');
    }
};

exports.createOffice = async (officeData) => {
    let nameFound = officeData.name;
    if (!validatefields(officeData)) {
        throw new Error('There are missing parameters in the JSON. Please provide all required fields.');
    }
    var officeExists = await valideExistOffice(nameFound);
    if (officeExists) {
        return "office already exists";
    }
    var officeExists = new Office(officeData);
    var savedOffice = await officeExists.save();
    console.log(`id new office: ${savedOffice._id}`);
    return savedOffice._id;
};

exports.updateOffice = async (officeId, updatedOfficeData) => {
    try {
        const existingOffice = await Office.findById(officeId);
        if (!existingOffice) {
            throw new Error('Office not found');
        }
        for (const key in updatedOfficeData) {
            if (key !== '_id' && key in existingOffice) {
                existingOffice[key] = updatedOfficeData[key];
            }
        }
        const updatedUser = await existingOffice.save();
        return updatedUser;
    } catch (error) {
        console.error('Error updating permission:', error);
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
            return { success: false, error: 'Invalid token' };
        } else {
            return { success: false, error: 'Error in the token' };
        }
    }
}

async function valideExistOffice(nameFound) {
    try {
        var nameFound = await Office.findOne({
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
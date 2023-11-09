const permission = require('../model/permissions');
const jwt = require("jsonwebtoken");

exports.getAllPermissions = async () => {
    try {
        const permissions = await permission.find();
        return permissions;
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
            return { success: false, error: 'Invalid token' };
        } else {
            return { success: false, error: 'Error in the token' };
        }
    }
}

exports.createPermissions = async (permissionData) => {
    let nameFound = permissionData.name;
    if (!validatefields(permissionData)) {
        throw new Error('There are missing parameters in the JSON. Please provide all required fields.');
    }
    var permissionExists = await valideExistPermission(nameFound);
    if (permissionExists) {
        return "permissions already exists";
    }
    var permissionExists = new permission(permissionData);
    var savedPermission = await permissionExists.save();
    console.log(`id new permission: ${savedPermission._id}`);
    return savedPermission._id;
};


async function valideExistPermission(nameFound) {
    try {
        var nameFound = await permission.findOne({
            name: nameFound
        }
        ).exec();
        return !!nameFound;
    } catch (error) {
        console.error("Error en la consulta a la base de datos:", error);
        throw error;
    }
};

exports.updatePermission = async (permissionId, updatedPermissionData) => {
    try {
        const existingPermission = await permission.findById(permissionId);

        if (!existingPermission) {
            throw new Error('Permission not found');
        }
        for (const key in updatedPermissionData) {
            if (key !== '_id' && key in existingPermission) {
                existingPermission[key] = updatedPermissionData[key];
            }
        }
        const updatedUser = await existingPermission.save();
        return updatedUser;
    } catch (error) {
        console.error('Error updating permission:', error);
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
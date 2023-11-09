const jwt = require("jsonwebtoken");
const countries = require("../model/admCountries");
const states = require("../model/admStates");
const cities = require("../model/admCities");

exports.getAllCountries = async () => {
    console.log(`find countries`);
    return await countries.find();
};


exports.getAllStates = async () => {
    console.log(`find countries`);
    return await states.find();
};

exports.getAllCities = async () => {
    console.log(`find countries`);
    return await cities.find();
};

exports.validateToken = async (authorization) => {
    try {
        const payload = jwt.verify(authorization, process.env.SECRET_KEY);
        return { success: true, payload };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { success: false, error: 'Token expirado' };
        } else if (error.name === 'JsonWebTokenError') {
            return { success: false, error: 'Token no válido' };
        } else {
            return { success: false, error: 'Error en el token' };
        }
    }
}
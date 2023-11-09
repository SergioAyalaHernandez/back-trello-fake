const jwt = require("jsonwebtoken");
const { validateTokenMiddleware } = require("../services/authMiddleware");
const admServices = require("../services/admServices");

exports.getCountries = [validateTokenMiddleware, async (req, res) => {
    try {
        console.log("Start get all countries");
        const countries = await admServices.getAllCountries();
        res.status(200).json(countries);
    } catch (error) {
        console.log(error);
        res.status(204).json({error: "no content"});
    }
}];

exports.getStates = [validateTokenMiddleware, async (req, res) => {
    try {
        console.log("Start get all countries");
        const states = await admServices.getAllStates();
        res.status(200).json(states);
    } catch (error) {
        console.log(error);
        res.status(204).json({error: "no content"});
    }
}];

exports.getCities = [validateTokenMiddleware, async (req, res) => {
    try {
        console.log("Start get all cities");
        const states = await admServices.getAllCities();
        res.status(200).json(states);
    } catch (error) {
        console.log(error);
        res.status(204).json({error: "no content"});
    }
}];
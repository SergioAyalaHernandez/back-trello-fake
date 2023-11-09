const { validateTokenMiddleware } = require("../services/authMiddleware");
const specialityServices = require("../services/specialityServices");

exports.getSpeciality = [validateTokenMiddleware, async (req, res) => {
    console.log("Start get speciality");
    try {
        const speciality = await specialityServices.getAllspeciality();
        res.status(200).json(speciality);
    } catch (error) {
        console.error('Error receiving speciality:', error);
        res.status(404).json({ error: 'Error receiving speciality' });
    }
}];


exports.createSpeciality = [validateTokenMiddleware, async (req, res) => {
    try {
        console.log("Start to create Speciality");
        var specialityData = req.body;
        var result = await specialityServices.createSpeciality(specialityData);
        if (result === 'Speciality already exists') {
            console.log(`the Speciality "${specialityData.name}" or code "${specialityData.code}" already registered`);
            res.status(400).json({
                success: false,
                message: `the Speciality "${specialityData.name}" or code "${specialityData.code}" already registered`,
            });
        } else {
            console.log(`Speciality successfully created with id: ${result}`);
            res.status(201).json({
                success: true,
                message: 'Speciality successfully created',
                specialtyId: result,
            });
        }
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ error: error.message });
    }
}];

exports.updateSpeciality = [validateTokenMiddleware, async (req, res) => {
    console.log("Start update Speciality");
    var specialityId = req.params.id;
    const updatedSpecialityData = req.body;
    try {
        const SpecialityProfile = await specialityServices.updatedSpeciality(specialityId, updatedSpecialityData);
        res.status(200).json(SpecialityProfile);
    } catch (error) {
        console.log(`error: ${error} with Speciality: ${specialityId}`);
        res.status(500).json({ error: 'Error updating Speciality' });
    }
}];

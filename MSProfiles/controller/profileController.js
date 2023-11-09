const { validateTokenMiddleware } = require("../services/authMiddleware");
const profileServices = require("../services/profileServices");

exports.getProfiles = [validateTokenMiddleware, async (req, res) => {
    console.log("Start get profiles");
    try {
        const profiles = await profileServices.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        console.error('Error receiving permissions:', error);
        res.status(404).json({ error: 'Error receiving permissions' });
    }
}];


exports.createProfiles = [validateTokenMiddleware, async (req, res) => {
    try {
        console.log("Start to create Profile");
        var profileData = req.body;
        var result = await profileServices.createProfiles(profileData);
        if (result === 'Profile already exists') {
            console.log(`the profile ${profileData.name} already registered`);
            res.status(400).json({
                success: false,
                message: `the profile ${profileData.name} already registered`,
            });
        } else {
            console.log(`Profile successfully created with id: ${result}`);
            res.status(201).json({
                success: true,
                message: 'Profile successfully created',
                userId: result,
            });
        }
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ error: error.message });
    }
}];

exports.updateProfile = [validateTokenMiddleware, async (req, res) => {
    console.log("Start update profile");
    var profileId = req.params.id;
    const updatedProfileData = req.body;
    try {
        const updatedProfile = await profileServices.updatedProfile(profileId, updatedProfileData);
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.log(`error: ${error} with profile: ${profileId}`);
        res.status(500).json({ error: 'Error updating profile' });
    }
}];

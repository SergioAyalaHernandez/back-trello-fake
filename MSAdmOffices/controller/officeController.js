const { validateTokenMiddleware } = require("../services/authMiddleware");
const officeServices = require("../services/officeServices");

exports.getOffice = [validateTokenMiddleware, async (req, res) => {
    console.log("Start get users");
    try {
        const office = await officeServices.getAllOffice();
        res.status(200).json(office);
    } catch (error) {
        console.error('Error receiving permissions:', error);
        res.status(404).json({ error: 'Error receiving permissions' });
    }
}];

exports.createOffice = [validateTokenMiddleware, async (req, res) => {
    try {
        console.log("Start to create office");
        var officeData = req.body;
        var result = await officeServices.createOffice(officeData);
        if (result === 'office already exists') {
            console.log(`the office ${officeData.name} already registered`);
            res.status(400).json({
                success: false,
                message: `the office ${officeData.name} already registered`,
            });
        } else {
            console.log(`Office successfully created with id: ${result}`);
            res.status(201).json({
                success: true,
                message: 'Office successfully created',
                userId: result,
            });
        }
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ error: error.message });
    }
}];


exports.updateOffice = [validateTokenMiddleware, async (req, res) => {
    console.log("Start update office");
    var officeId = req.params.id;
    const updatedOfficeData = req.body;
    try {
        const updatedOffice = await officeServices.updateOffice(officeId, updatedOfficeData);
        res.status(200).json(updatedOffice);
    } catch (error) {
        console.log(`error: ${error} with office ${officeId}`);
        res.status(500).json({ error: 'Error updating office' });
    }
}];
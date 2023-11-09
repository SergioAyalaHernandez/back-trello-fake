const { validateTokenMiddleware } = require("../services/authMiddleware");
const courtRoomsServices = require("../services/courtRoomsServices");

exports.getCourtRooms = [validateTokenMiddleware, async (req, res) => {
    console.log("Start get court rooms");
    try {
        const courtRooms = await courtRoomsServices.getAllCourtRooms();
        res.status(200).json(courtRooms);
    } catch (error) {
        console.error('Error receiving court rooms:', error);
        res.status(404).json({ error: 'Error receiving court rooms' });
    }
}];


exports.createCourtRooms = [validateTokenMiddleware, async (req, res) => {
    try {
        console.log("Start to create court rooms");
        var courtRoomsData = req.body;
        var result = await courtRoomsServices.createCourtRooms(courtRoomsData);
        if (result === 'Court Room already exists') {
            console.log(`the court Room "${courtRoomsData.name}" already registered`);
            res.status(400).json({
                success: false,
                message: `the court room "${courtRoomsData.name}" already registered`,
            });
        } else {
            console.log(`Court Room successfully created with id: ${result}`);
            res.status(201).json({
                success: true,
                message: 'Court room successfully created',
                courtRoomId: result,
            });
        }
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ error: error.message });
    }
}];

exports.updateCourtRooms = [validateTokenMiddleware, async (req, res) => {
    console.log("Start update court rooms");
    var courtRoomsId = req.params.id;
    const updatedCourtRoomsData = req.body;
    try {
        const courtRoomsProfile = await courtRoomsServices.updatedCourtRooms(courtRoomsId, updatedCourtRoomsData);
        res.status(200).json(courtRoomsProfile);
    } catch (error) {
        console.log(`error: ${error} with court room: ${courtRoomsId}`);
        res.status(500).json({ error: 'Error updating court room' });
    }
}];

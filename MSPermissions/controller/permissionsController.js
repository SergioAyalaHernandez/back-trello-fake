const { validateTokenMiddleware } = require("../services/authMiddleware");
const permissionsServices = require("../services/permissionsServices");

exports.getPermissions = [validateTokenMiddleware, async (req, res) => {
    console.log("Start get users");
    try {
        const permissions = await permissionsServices.getAllPermissions();
        res.status(200).json(permissions);
    } catch (error) {
        console.error('Error receiving permissions:', error);
        res.status(404).json({ error: 'Error receiving permissions' });
    }
}];

exports.createPermissions = [validateTokenMiddleware, async (req, res) => {
    try {
        console.log("Start to create Permission");
        var permmisionData = req.body;
        var result = await permissionsServices.createPermissions(permmisionData);
        if (result === 'permissions already exists') {
            console.log(`the permission ${permmisionData.name} already registered`);
            res.status(400).json({
                success: false,
                message: `the permission ${permmisionData.name} already registered`,
            });
        } else {
            console.log(`Permission successfully created with id: ${result}`);
            res.status(201).json({
                success: true,
                message: 'Permission successfully created',
                userId: result,
            });
        }
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ error: error.message });
    }
}];

exports.updatePermission = [validateTokenMiddleware, async (req, res) => {
    console.log("Start update permission");
    var permissionId = req.params.id;
    const updatedPermissionData = req.body;
    try {
        const updatedPermission = await permissionsServices.updatePermission(permissionId, updatedPermissionData);
        res.status(200).json(updatedPermission);
    } catch (error) {
        console.log(`error: ${error} with permission ${permissionId}`);
        res.status(500).json({ error: 'Error updating permission' });
    }
}];
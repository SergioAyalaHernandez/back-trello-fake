const authServices = require('../services/authServices');
const refreshTokenServices = require('../services/refreshTokenServices');

exports.refreshToken = async (req, res) => {
    try {
        const { userId, clientSecret } = req.body;
        console.log(`Start generate Refreshtoken with user ${userId} and password ${clientSecret}`);
        const { authorization } = req.headers;
        const result = await refreshTokenServices.validateRefreshToken(userId, clientSecret, authorization);
        if (result.success) {
            const newRefreshToken = await authServices.validateUserPassword(userId, clientSecret, "refreshToken");
            return res.status(200).header('authorization').json({
                message: 'authorized user',
                access_token: result.data,
                refresh_token: newRefreshToken
            });
        } else {
            console.error('Error al buscar usuario en el controlador:', result.error);
            return res.status(401).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        throw error;
    }
};
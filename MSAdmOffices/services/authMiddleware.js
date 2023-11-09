const profileServices = require('../services/officeServices');

exports.validateTokenMiddleware = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        console.log("token must be provided");
        return res.status(401).json({ "unauthorized": "token must be provided" });
      }
      const validateToken = await profileServices.validateToken(authorization);
      if (validateToken.success) {
        req.userId = validateToken.userId; 
        return next();
      } else {
        if (validateToken.error === 'Token expired') {
            console.log("Token expired");
          return res.status(401).json({ error: 'Token expired' });
        } else if (validateToken.error === 'Invalid token') {
            console.log("Invalid token");
          return res.status(401).json({ error: 'Invalid token' });
        } else {
            console.log("Error in the token");
          return res.status(401).json({ error: 'Error in the token' });
        }
      }
    } catch (error) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  };
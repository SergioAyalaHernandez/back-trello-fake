const profileServices = require('./specialityServices');

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
        } else if (validateToken.error === 'Token no válido') {
            console.log("Token no válido");
          return res.status(401).json({ error: 'Token no válido' });
        } else {
            console.log("Error en el token");
          return res.status(401).json({ error: 'Error en el token' });
        }
      }
    } catch (error) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  };
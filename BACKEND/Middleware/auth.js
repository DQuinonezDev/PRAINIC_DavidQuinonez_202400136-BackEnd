const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
   const token = req.header('x-token');
   

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token requerido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // ahora tenemos los datos del usuario en la request
        next();
    } catch (error) {
        return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = verificarToken;
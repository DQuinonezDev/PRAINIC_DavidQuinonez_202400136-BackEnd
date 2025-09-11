const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ mensaje: 'Token requerido' });

    const [bearer, token] = header.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ mensaje: 'Formato inválido del token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
}

module.exports = verificarToken;
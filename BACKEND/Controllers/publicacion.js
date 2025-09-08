const Publicacion = require('../Models/publicacion');

const crearPublicacion = async (req, res) => {
    try {
        const { id_usuario, id_curso, id_profesor, mensaje } = req.body;

        if (!id_usuario || !mensaje) {
            return res.status(400).json({ mensaje: 'Usuario y mensaje son obligatorios' });
        }

        if (!id_curso && !id_profesor) {
            return res.status(400).json({ mensaje: 'Debe seleccionar un curso o un profesor' });
        }

        const id = await Publicacion.crear({ id_usuario, id_curso, id_profesor, mensaje });

        res.status(201).json({ mensaje: 'Publicación creada correctamente', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.obtenerTodas();
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { crearPublicacion, obtenerPublicaciones };

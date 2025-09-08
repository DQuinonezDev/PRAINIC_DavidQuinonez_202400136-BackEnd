const Comentario = require('../Models/comentario');

const crearComentario = async (req, res) => {
    try {
        const { id_publicacion, id_usuario, mensaje } = req.body;

        if (!id_publicacion || !id_usuario || !mensaje) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        const id = await Comentario.crear({ id_publicacion, id_usuario, mensaje });

        res.status(201).json({ mensaje: 'Comentario agregado correctamente', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerComentarios = async (req, res) => {
    try {
        const { id_publicacion } = req.params;
        const comentarios = await Comentario.obtenerPorPublicacion(id_publicacion);
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { crearComentario, obtenerComentarios };

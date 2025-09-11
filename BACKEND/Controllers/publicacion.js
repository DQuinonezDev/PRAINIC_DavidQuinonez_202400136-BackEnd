const Publicacion = require('../Models/publicacion');

const crearPublicacion = async (req, res) => {
  try {
    const { id_curso = null, id_profesor = null, mensaje } = req.body;
    const { id_usuario } = req.usuario; // ahora sí viene del token

    if (!mensaje || mensaje.trim() === '') {
      return res.status(400).json({ mensaje: 'El mensaje es obligatorio' });
    }

    const id = await Publicacion.crear({
      id_usuario,
      id_curso: id_curso || null,
      id_profesor: id_profesor || null,
      mensaje
    });

    res.status(201).json({ mensaje: 'Publicación creada', id });
  } catch (error) {
    console.error("❌ Error en crearPublicacion:", error);
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

const actualizarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario, mensaje } = req.body;

        if (!id_usuario || !mensaje || !mensaje.trim()) {
            return res.status(400).json({ mensaje: 'id_usuario y mensaje son obligatorios' });
        }

        const esDueno = await Publicacion.perteneceAUsuario(id, id_usuario);
        if (!esDueno) return res.status(403).json({ mensaje: 'No autorizado para editar esta publicación' });

        const ok = await Publicacion.actualizar({ id_publicacion: id, mensaje: mensaje.trim() });
        if (!ok) return res.status(404).json({ mensaje: 'Publicación no encontrada' });

        res.json({ mensaje: 'Publicación actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario } = req.body;

        if (!id_usuario) return res.status(400).json({ mensaje: 'id_usuario es obligatorio' });

        const esDueno = await Publicacion.perteneceAUsuario(id, id_usuario);
        if (!esDueno) return res.status(403).json({ mensaje: 'No autorizado para eliminar esta publicación' });

        const ok = await Publicacion.eliminar({ id_publicacion: id });
        if (!ok) return res.status(404).json({ mensaje: 'Publicación no encontrada' });

        res.json({ mensaje: 'Publicación eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { crearPublicacion, obtenerPublicaciones, actualizarPublicacion, eliminarPublicacion };

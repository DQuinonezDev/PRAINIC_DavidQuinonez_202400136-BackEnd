const Curso = require('../Models/curso');
const Profesor = require('../Models/profesor');

const crearCurso = async (req, res) => {
    try {
        const { nombre, seccion, id_profesor } = req.body;

        if (!nombre || !seccion || !id_profesor) {
            return res.status(400).json({ mensaje: 'Nombre, sección e id_profesor son obligatorios' });
        }

        // Validar duplicados
        const yaExiste = await Curso.existe(nombre, seccion);
        if (yaExiste) {
            return res.status(400).json({ mensaje: 'El curso ya existe con esa sección' });
        }

        // Validar que el profesor exista
        const profesorValido = await Profesor.existePorId(id_profesor);
        if (!profesorValido) {
            return res.status(400).json({ mensaje: 'El profesor no existe' });
        }

        const id = await Curso.crear({ nombre, seccion, id_profesor });

        res.status(201).json({ mensaje: 'Curso creado correctamente', id });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerCursos = async (req, res) => {
    try {
        const cursos = await Curso.obtenerTodos();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { crearCurso, obtenerCursos };
const { dbmysql } = require('../Database/dbconection');

class Publicacion {
    static async crear({ id_usuario, id_curso, id_profesor, mensaje }) {
        const pool = await dbmysql();
        const [result] = await pool.query(
            `INSERT INTO publicaciones (id_usuario, id_curso, id_profesor, mensaje)
             VALUES (?, ?, ?, ?)`,
            [id_usuario, id_curso || null, id_profesor || null, mensaje]
        );
        return result.insertId;
    }

    static async obtenerTodas() {
        const pool = await dbmysql();
        const [rows] = await pool.query(`
            SELECT pub.id_publicacion, pub.mensaje, pub.fecha_creacion,
                u.nombres AS usuario_nombre, u.apellidos AS usuario_apellido,
                c.nombre AS curso_nombre, c.seccion,
                CONCAT(p.nombres, ' ', p.apellidos) AS profesor_nombre
            FROM publicaciones pub
            INNER JOIN usuarios u ON pub.id_usuario = u.id_usuario
            LEFT JOIN cursos c ON pub.id_curso = c.id_curso
            LEFT JOIN profesores p ON pub.id_profesor = p.id_profesor
            ORDER BY pub.fecha_creacion DESC
        `);
        return rows;
    }
}

module.exports = Publicacion;

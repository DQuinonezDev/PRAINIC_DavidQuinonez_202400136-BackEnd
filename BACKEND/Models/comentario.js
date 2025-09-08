const { dbmysql } = require('../Database/dbconection');

class Comentario {
    static async crear({ id_publicacion, id_usuario, mensaje }) {
        const pool = await dbmysql();
        const [result] = await pool.query(
            `INSERT INTO comentarios (id_publicacion, id_usuario, mensaje)
            VALUES (?, ?, ?)`,
            [id_publicacion, id_usuario, mensaje]
        );
        return result.insertId;
    }

    static async obtenerPorPublicacion(id_publicacion) {
        const pool = await dbmysql();
        const [rows] = await pool.query(`
            SELECT c.id_comentario, c.mensaje, c.fecha_creacion,
                u.nombres AS usuario_nombre, u.apellidos AS usuario_apellido
            FROM comentarios c
            INNER JOIN usuarios u ON c.id_usuario = u.id_usuario
            WHERE c.id_publicacion = ?
            ORDER BY c.fecha_creacion ASC
        `, [id_publicacion]);
        return rows;
    }
}

module.exports = Comentario;

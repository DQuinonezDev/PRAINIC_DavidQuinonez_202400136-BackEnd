const { dbmysql } = require('../Database/dbconection');

class Comentario {
    static async crear({ id_usuario, id_publicacion, mensaje }) {
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

    static async perteneceAUsuario(id_comentario, id_usuario) {
        const pool = await dbmysql();
        const [rows] = await pool.query(
            `SELECT 1 FROM comentarios WHERE id_comentario = ? AND id_usuario = ? LIMIT 1`,
            [id_comentario, id_usuario]
        );
        return rows.length > 0;
    }

    static async actualizar({ id_comentario, mensaje }) {
        const pool = await dbmysql();
        const [result] = await pool.query(
            `UPDATE comentarios SET mensaje = ? WHERE id_comentario = ?`,
            [mensaje, id_comentario]
        );
        return result.affectedRows > 0;
    }

    static async eliminar({ id_comentario }) {
        const pool = await dbmysql();
        const [result] = await pool.query(
            `DELETE FROM comentarios WHERE id_comentario = ?`,
            [id_comentario]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Comentario;

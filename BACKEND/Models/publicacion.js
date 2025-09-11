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
    SELECT 
      pub.id_publicacion,
      pub.mensaje,
      pub.fecha_creacion,
      pub.id_usuario,  -- 👈 ESTE CAMPO
      u.nombres AS usuario_nombre,
      u.apellidos AS usuario_apellido,
      c.nombre AS curso_nombre,
      c.seccion,
      CONCAT(p.nombres, ' ', p.apellidos) AS profesor_nombre
    FROM publicaciones pub
    INNER JOIN usuarios u ON pub.id_usuario = u.id_usuario
    LEFT JOIN cursos c ON pub.id_curso = c.id_curso
    LEFT JOIN profesores p ON pub.id_profesor = p.id_profesor
    ORDER BY pub.fecha_creacion DESC
  `);
        return rows;
    }




    static async perteneceAUsuario(id_publicacion, id_usuario) {
        const pool = await dbmysql();
        const [rows] = await pool.query(
            `SELECT 1 FROM publicaciones WHERE id_publicacion = ? AND id_usuario = ? LIMIT 1`,
            [id_publicacion, id_usuario]
        );
        return rows.length > 0;
    }

    static async actualizar({ id_publicacion, mensaje }) {
        const pool = await dbmysql();
        const [result] = await pool.query(
            `UPDATE publicaciones SET mensaje = ? WHERE id_publicacion = ?`,
            [mensaje, id_publicacion]
        );
        return result.affectedRows > 0;
    }

    static async eliminar({ id_publicacion }) {
        const pool = await dbmysql();
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // 1) Eliminar comentarios de esta publicación
            await conn.query(`DELETE FROM comentarios WHERE id_publicacion = ?`, [id_publicacion]);

            // 2) Eliminar publicación
            const [resPub] = await conn.query(
                `DELETE FROM publicaciones WHERE id_publicacion = ?`,
                [id_publicacion]
            );

            await conn.commit();
            return resPub.affectedRows > 0;
        } catch (e) {
            await conn.rollback();
            throw e;
        } finally {
            conn.release();
        }
    }
}

module.exports = Publicacion;

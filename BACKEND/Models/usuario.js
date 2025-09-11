const { dbmysql } = require('../Database/dbconection');

class Usuario {
    static async crear({ registro_academico, nombres, apellidos, correo, contrasena }) {
        const pool = await dbmysql();
        const [result] = await pool.query(
            `INSERT INTO usuarios (registro_academico, nombres, apellidos, correo, contrasena)
            VALUES (?, ?, ?, ?, ?)`,
            [registro_academico, nombres, apellidos, correo, contrasena]
        );
        return result.insertId;
    }

    //Validacion para comprobar si hay usuarios con el mismo carnet o correo
    static async existe(correo, registro_academico) {
        const pool = await dbmysql();
        const [rows] = await pool.query(
            `SELECT * FROM usuarios WHERE correo = ? OR registro_academico = ?`,
            [correo, registro_academico]
        );
        return rows.length > 0;
    }

    static async buscarPorCarnet(registro_academico) {
        const pool = await dbmysql();
        const [rows] = await pool.query(`SELECT * FROM usuarios WHERE registro_academico = ?`, [registro_academico]);
        return rows[0];
    }

    static async buscarPorId(id_usuario) {
        const pool = await dbmysql();
        const [rows] = await pool.query(`SELECT * FROM usuarios WHERE id_usuario = ?`, [id_usuario]);
        return rows[0];
    }

    static async obtenerTodos() {
        const pool = await dbmysql();
        const [rows] = await pool.query(`SELECT * FROM usuarios`);
        return rows;
    }
    static async obtenerPerfil(id_usuario) {
        const pool = await dbmysql();

        //  Datos del usuario
        const [uRows] = await pool.query(
            `SELECT id_usuario, registro_academico, nombres, apellidos, correo
        FROM usuarios
        WHERE id_usuario = ?`,
            [id_usuario]
        );
        if (uRows.length === 0) return null;
        const usuario = uRows[0];

        //  Cursos aprobados (con profesor)
        const [cursosAprobados] = await pool.query(
            `SELECT c.id_curso, c.nombre, c.seccion,
            CONCAT(p.nombres, ' ', p.apellidos) AS profesor
        FROM cursos_aprobados ca
        INNER JOIN cursos c ON ca.id_curso = c.id_curso
        LEFT JOIN profesores p ON c.id_profesor = p.id_profesor
        WHERE ca.id_usuario = ?`,
            [id_usuario]
        );

        // Publicaciones del usuario (con curso/profesor + #comentarios)
        const [publicaciones] = await pool.query(
            `SELECT pub.id_publicacion,
            pub.mensaje,
            pub.fecha_creacion,
            c.nombre          AS curso_nombre,
            c.seccion         AS curso_seccion,
            CONCAT(p.nombres, ' ', p.apellidos) AS profesor_nombre,
            (
                SELECT COUNT(*)
                FROM comentarios com
                WHERE com.id_publicacion = pub.id_publicacion
            ) AS cantidad_comentarios
        FROM publicaciones pub
        LEFT JOIN cursos c     ON pub.id_curso = c.id_curso
        LEFT JOIN profesores p ON pub.id_profesor = p.id_profesor
        WHERE pub.id_usuario = ?
        ORDER BY pub.fecha_creacion DESC`,
            [id_usuario]
        );

        return {
            usuario,
            cursosAprobados,
            publicaciones
        };
    }
    static async actualizarPerfil(id_usuario, data) {
        const pool = await dbmysql();

        
        const campos = [];
        const valores = [];

        for (const key in data) {
            campos.push(`${key} = ?`);
            valores.push(data[key]);
        }

        if (campos.length === 0) return false; 

        valores.push(id_usuario);

        const [result] = await pool.query(
            `UPDATE usuarios SET ${campos.join(', ')} WHERE id_usuario = ?`,
            valores
        );

        return result.affectedRows > 0;
    }

}

module.exports = Usuario;
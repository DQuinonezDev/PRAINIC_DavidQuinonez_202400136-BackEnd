const express = require('express');
const cors = require('cors');
const { dbmysql } = require('../Database/dbconection');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Rutas base
        this.paths = {
            usuarios: '/api/usuarios',
            profesores: '/api/profesores',
            cursos: '/api/cursos',
            publicaciones: '/api/publicaciones',
            comentarios: '/api/comentarios',
            cursosAprobados: '/api/cursos-aprobados'
        };

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();

        this.conectDB();

    }

    async conectDB() {
        this.pool = await dbmysql();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes() {
        this.app.use(this.paths.usuarios, require('../Routes/usuario'));
        this.app.use(this.paths.profesores, require('../Routes/profesor'));
        this.app.use(this.paths.cursos, require('../Routes/curso'));
        this.app.use(this.paths.publicaciones, require('../Routes/publicacion'));
        this.app.use(this.paths.comentarios, require('../Routes/comentario'));
        // this.app.use(this.paths.cursosAprobados, require('../routes/cursosAprobados'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(" Servidor corriendo en puerto:", this.port);
        });
    }
}

module.exports = Server;

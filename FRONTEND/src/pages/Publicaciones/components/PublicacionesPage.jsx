import { useEffect, useState } from 'react';
import {
    getPublicaciones,
    createPublicacion,
    updatePublicacion,
    deletePublicacion
} from '../api/PublicacionesApi';
import { apiClient } from '../../_apiClient';
import { ComentariosList } from "../../Comentarios/components/ComentariosList";

export function PublicacionesPage() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [editandoTexto, setEditandoTexto] = useState('');

    // modal crear publicación
    const [showModal, setShowModal] = useState(false);
    const [nuevoPost, setNuevoPost] = useState('');
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');
    const [profesorSeleccionado, setProfesorSeleccionado] = useState('');

    const [cursos, setCursos] = useState([]);
    const [profesores, setProfesores] = useState([]);

    // id del usuario logeado
    const idUsuarioActual = parseInt(localStorage.getItem('id_usuario'));
    useEffect(() => {
        fetchPublicaciones();
        fetchCursosYProfesores();

    }, []);

    const fetchPublicaciones = async () => {
        try {
            const data = await getPublicaciones();
            console.log("👉 Publicaciones recibidas:", data);
            setPublicaciones(data);
        } catch (error) {
            console.error('Error al obtener publicaciones:', error);
        }
    };

    const fetchCursosYProfesores = async () => {
        try {
            const cursosRes = await apiClient.get('/cursos');
            setCursos(cursosRes.data);

            const profRes = await apiClient.get('/profesores');
            setProfesores(profRes.data);
        } catch (err) {
            console.error('Error cargando cursos/profesores', err);
        }
    };

    const publicar = async () => {
        if (!nuevoPost.trim()) return;
        try {
            setLoading(true);
            await createPublicacion({
                mensaje: nuevoPost,
                id_curso: cursoSeleccionado || null,
                id_profesor: profesorSeleccionado || null,
            });

            setNuevoPost('');
            setCursoSeleccionado('');
            setProfesorSeleccionado('');
            setShowModal(false);

            fetchPublicaciones();
        } catch (error) {
            console.error('Error al crear publicación:', error);
        } finally {
            setLoading(false);
        }
    };

    const guardarEdicion = async (id) => {
        try {
            await updatePublicacion(id, { mensaje: editandoTexto });
            setEditandoId(null);
            setEditandoTexto('');
            fetchPublicaciones();
        } catch (error) {
            console.error('Error al actualizar publicación:', error);
        }
    };

    const eliminar = async (id) => {
        try {
            await deletePublicacion(id);
            fetchPublicaciones();
        } catch (error) {
            console.error('Error al eliminar publicación:', error);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {/* Botón abrir modal */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    ¿Qué estás pensando?
                </button>
            </div>

            {/* Lista de publicaciones */}
            {publicaciones.map((post) => {
                const esAutor = post.id_usuario === idUsuarioActual;

                return (
                    <div
                        key={post.id_publicacion}
                        className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
                    >
                        {/* Encabezado */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                                    {post.usuario_nombre?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {post.usuario_nombre} {post.usuario_apellido}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {new Date(post.fecha_creacion).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contenido */}
                        {esAutor && editandoId === post.id_publicacion ? (
                            <div className="mt-3">
                                <textarea
                                    className="w-full resize-none rounded-lg border border-gray-300 p-2"
                                    rows={3}
                                    value={editandoTexto}
                                    onChange={(e) => setEditandoTexto(e.target.value)}
                                />
                                <div className="flex justify-end mt-2 gap-2">
                                    <button
                                        onClick={() => guardarEdicion(post.id_publicacion)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={() => setEditandoId(null)}
                                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="mt-3 text-gray-700">{post.mensaje}</p>
                        )}

                        {/* Info adicional */}
                        {post.curso_nombre && (
                            <p className="text-sm text-indigo-600 mt-2">
                                📘 Curso: {post.curso_nombre} ({post.seccion})
                            </p>
                        )}
                        {post.profesor_nombre && (
                            <p className="text-sm text-gray-600">
                                👨‍🏫 Profesor: {post.profesor_nombre}
                            </p>
                        )}

                        {/* Acciones */}
                        <div className="flex gap-6 text-sm text-gray-600 mt-4 border-t pt-2">
                            <button className="hover:text-indigo-600">💬 Comentar</button>
                            {esAutor && (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditandoId(post.id_publicacion);
                                            setEditandoTexto(post.mensaje);
                                        }}
                                        className="hover:text-indigo-600"
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        onClick={() => eliminar(post.id_publicacion)}
                                        className="hover:text-red-600"
                                    >
                                        ❌ Eliminar
                                    </button>
                                </>
                            )}
                        </div>
                        {/* Lista de comentarios */}
                        <ComentariosList id_publicacion={post.id_publicacion} />
                        
                    </div>
                );
            })}

            {/* Modal crear publicación */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
                        <h2 className="text-lg font-bold">Crear publicación</h2>
                        <textarea
                            className="w-full resize-none rounded-lg border border-gray-300 p-2"
                            rows={3}
                            placeholder="¿Qué estás pensando?"
                            value={nuevoPost}
                            onChange={(e) => setNuevoPost(e.target.value)}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Curso (opcional)
                            </label>
                            <select
                                value={cursoSeleccionado}
                                onChange={(e) => setCursoSeleccionado(e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            >
                                <option value="">-- Selecciona un curso --</option>
                                {cursos.map((c) => (
                                    <option key={c.id_curso} value={c.id_curso}>
                                        {c.nombre} ({c.seccion})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Profesor (opcional)
                            </label>
                            <select
                                value={profesorSeleccionado}
                                onChange={(e) => setProfesorSeleccionado(e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            >
                                <option value="">-- Selecciona un profesor --</option>
                                {profesores.map((p) => (
                                    <option key={p.id_profesor} value={p.id_profesor}>
                                        {p.nombres} {p.apellidos}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={publicar}
                                disabled={loading}
                                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {loading ? 'Publicando...' : 'Publicar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

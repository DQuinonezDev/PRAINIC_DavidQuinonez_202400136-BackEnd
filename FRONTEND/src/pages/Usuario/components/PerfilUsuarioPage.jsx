import { useEffect, useState } from "react";
import { getPerfil, updatePerfil } from "../api/UsuarioApi";
import { useParams } from "react-router-dom";

export function PerfilUsuarioPage() {
    const { id } = useParams(); 
    const idUsuarioActual = localStorage.getItem("id_usuario"); 
    const idFinal = id ? id : idUsuarioActual;

    const [perfil, setPerfil] = useState(null);
    const [editando, setEditando] = useState(false);
    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
        correo: "",
        contrasena: "",
    });

    useEffect(() => {
        if (!idFinal) {
            console.error("❌ No hay id_usuario en localStorage ni en la URL");
            return;
        }
        fetchPerfil();
    }, [idFinal]);

    const fetchPerfil = async () => {
        try {
            const data = await getPerfil(idFinal);
            setPerfil(data);
            setForm({
                nombres: data.usuario.nombres,
                apellidos: data.usuario.apellidos,
                correo: data.usuario.correo,
                contrasena: "",
            });
        } catch (error) {
            console.error("❌ Error cargando perfil:", error);
        }
    };

    const guardarCambios = async () => {
        try {
            await updatePerfil(idFinal, form);
            setEditando(false);
            fetchPerfil();
        } catch (err) {
            console.error("❌ Error actualizando perfil:", err);
        }
    };

    if (!perfil) return <p className="p-6">Cargando...</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-4">Perfil de usuario</h2>

            <p className="text-sm text-gray-500 mb-2">
                Registro Académico: <strong>{perfil.usuario.registro_academico}</strong>
            </p>

            {editando ? (
                <>
                    <input
                        type="text"
                        value={form.nombres}
                        onChange={(e) => setForm({ ...form, nombres: e.target.value })}
                        className="w-full border rounded px-2 py-1 mb-2"
                    />
                    <input
                        type="text"
                        value={form.apellidos}
                        onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
                        className="w-full border rounded px-2 py-1 mb-2"
                    />
                    <input
                        type="email"
                        value={form.correo}
                        onChange={(e) => setForm({ ...form, correo: e.target.value })}
                        className="w-full border rounded px-2 py-1 mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={form.contrasena}
                        onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                        className="w-full border rounded px-2 py-1 mb-2"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={guardarCambios}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={() => setEditando(false)}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p><strong>Nombre:</strong> {perfil.usuario.nombres} {perfil.usuario.apellidos}</p>
                    <p><strong>Correo:</strong> {perfil.usuario.correo}</p>

                    {idUsuarioActual === idFinal && (
                        <button
                            onClick={() => setEditando(true)}
                            className="mt-4 bg-indigo-600 text-white px-3 py-1 rounded"
                        >
                            Editar perfil
                        </button>
                    )}
                </>
            )}

            {/* Cursos aprobados */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">📘 Cursos aprobados</h3>
                {perfil.cursosAprobados && perfil.cursosAprobados.length > 0 ? (
                    <table className="w-full border border-gray-200 text-sm rounded-lg overflow-hidden shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Código</th>
                                <th className="px-4 py-2 text-left">Nombre</th>
                                <th className="px-4 py-2 text-left">Sección</th>
                                <th className="px-4 py-2 text-left">Profesor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {perfil.cursosAprobados.map((curso) => (
                                <tr key={curso.id_curso} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{curso.id_curso}</td>
                                    <td className="px-4 py-2">{curso.nombre}</td>
                                    <td className="px-4 py-2">{curso.seccion}</td>
                                    <td className="px-4 py-2">{curso.profesor || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">Aún no tienes cursos aprobados.</p>
                )}
            </div>
        </div>
    );
}

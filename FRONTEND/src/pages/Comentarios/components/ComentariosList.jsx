import { useEffect, useState } from "react";
import {
  getComentarios,
  createComentario,
  updateComentario,
  deleteComentario,
} from "../api/ComentariosApi";

export function ComentariosList({ id_publicacion }) {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editandoTexto, setEditandoTexto] = useState("");

  const idUsuarioActual = parseInt(localStorage.getItem("id_usuario"), 10);

  useEffect(() => {
    fetchComentarios();
  }, []);

  const fetchComentarios = async () => {
    try {
      const data = await getComentarios(id_publicacion);
      setComentarios(data);
    } catch (err) {
      console.error("Error al obtener comentarios:", err);
    }
  };

  const comentar = async () => {
    if (!nuevoComentario.trim()) return;
    try {
      await createComentario({ id_publicacion, mensaje: nuevoComentario });
      setNuevoComentario("");
      fetchComentarios();
    } catch (err) {
      console.error("Error al comentar:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      await updateComentario(id, { mensaje: editandoTexto });
      setEditandoId(null);
      setEditandoTexto("");
      fetchComentarios();
    } catch (err) {
      console.error("Error al editar comentario:", err);
    }
  };

  const eliminar = async (id) => {
    try {
      await deleteComentario(id);
      fetchComentarios();
    } catch (err) {
      console.error("Error al eliminar comentario:", err);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      {comentarios.map((c) => {
        const esAutor = parseInt(c.id_usuario, 10) === idUsuarioActual;
        return (
          <div
            key={c.id_comentario}
            className="flex gap-3 bg-gray-50 p-2 rounded-lg"
          >
            <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded-full text-xs font-bold">
              {c.usuario_nombre?.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-700">
                {c.usuario_nombre} {c.usuario_apellido}
              </p>

              {editandoId === c.id_comentario ? (
                <div className="mt-1">
                  <textarea
                    value={editandoTexto}
                    onChange={(e) => setEditandoTexto(e.target.value)}
                    className="w-full border rounded p-1 text-sm"
                  />
                  <div className="flex gap-2 mt-1 text-xs">
                    <button
                      onClick={() => guardarEdicion(c.id_comentario)}
                      className="text-green-600 hover:underline"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditandoId(null)}
                      className="text-gray-500 hover:underline"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">{c.mensaje}</p>
              )}

              <p className="text-xs text-gray-400">
                {new Date(c.fecha_creacion).toLocaleString()}
              </p>

              {esAutor && (
                <div className="flex gap-2 text-xs mt-1">
                  <button
                    onClick={() => {
                      setEditandoId(c.id_comentario);
                      setEditandoTexto(c.mensaje);
                    }}
                    className="text-indigo-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminar(c.id_comentario)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Input de nuevo comentario */}
      <div className="flex gap-2 items-center mt-2">
        <input
          type="text"
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          placeholder="Escribe un comentario..."
          className="flex-1 border rounded px-3 py-1 text-sm"
        />
        <button
          onClick={comentar}
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

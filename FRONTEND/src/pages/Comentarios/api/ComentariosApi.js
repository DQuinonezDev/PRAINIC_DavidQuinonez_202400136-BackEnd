import { apiClient } from "../../_apiClient";

// Obtener comentarios de una publicación
export async function getComentarios(id_publicacion) {
  const { data } = await apiClient.get(`/comentarios/${id_publicacion}`);
  return data;
}

// Crear comentario
export async function createComentario({ id_publicacion, mensaje }) {
  const { data } = await apiClient.post(`/comentarios/crearComentario`, {
    id_publicacion,
    
    mensaje,
  });
  return data;
}

// Editar comentario
export async function updateComentario(id_comentario, { mensaje }) {
  const { data } = await apiClient.put(`/comentarios/editar/${id_comentario}`, {
    mensaje,
  });
  return data;
}

// Eliminar comentario
export async function deleteComentario(id_comentario) {
  const { data } = await apiClient.delete(`/comentarios/eliminar/${id_comentario}`);
  return data;
}

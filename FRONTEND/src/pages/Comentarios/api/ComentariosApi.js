import { apiClient } from '../../_apiClient';

export const getComentariosDePublicacion = async (id_publicacion) => {
    const { data } = await apiClient.get(`/comentarios/${id_publicacion}`);
    return data;
};

export const crearComentario = async (payload) => {
    const { data } = await apiClient.post('/comentarios/crearComentario', payload);
    return data;
};

export const editarComentario = async (id, payload) => {
    const { data } = await apiClient.put(`/comentarios/editar/${id}`, payload);
    return data;
};

export const eliminarComentario = async (id, payload) => {
    const { data } = await apiClient.delete(`/comentarios/eliminar/${id}`, { data: payload });
    return data;
};

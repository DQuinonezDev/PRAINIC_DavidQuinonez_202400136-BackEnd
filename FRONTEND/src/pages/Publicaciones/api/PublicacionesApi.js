import { apiClient } from '../../_apiClient';

export const getPublicaciones = async () => {
    const { data } = await apiClient.get('/publicaciones');
    return data;
};

export const crearPublicacion = async (payload) => {
    const { data } = await apiClient.post('/publicaciones/crearPublicacion', payload);
    return data;
};

export const editarPublicacion = async (id, payload) => {
    const { data } = await apiClient.put(`/publicaciones/editar/${id}`, payload);
    return data;
};

export const eliminarPublicacion = async (id, payload) => {
    const { data } = await apiClient.delete(`/publicaciones/eliminar/${id}`, { data: payload });
    return data;
};

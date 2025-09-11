import { apiClient } from '../../_apiClient';

// Obtener publicaciones
export async function getPublicaciones() {
    const { data } = await apiClient.get('/publicaciones');
    return data;
}

// Crear publicación
export async function createPublicacion(payload) {
    const { data } = await apiClient.post('/publicaciones/crearPublicacion', payload);
    return data;
}

// Editar publicación
export async function updatePublicacion(id, payload) {
    const { data } = await apiClient.put(`/publicaciones/editar/${id}`, payload);
    return data;
}

// Eliminar publicación
export async function deletePublicacion(id) {
    const { data } = await apiClient.delete(`/publicaciones/eliminar/${id}`);
    return data;
}

import { apiClient } from '../../_apiClient';

export const getUsuarios = async () => {
    const { data } = await apiClient.get('/usuarios');
    return data;
};

export async function getPerfil(id) {
    const token = localStorage.getItem("token");
    const { data } = await apiClient.get(`/usuarios/perfil/${id}`, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
    return data;
}

export async function updatePerfil(id, payload) {
    const { data } = await apiClient.put(`/usuarios/perfil/${id}`, payload);
    return data;
}
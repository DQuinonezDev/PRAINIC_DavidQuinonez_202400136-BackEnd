import { apiClient } from '../../_apiClient';

export const getUsuarios = async () => {
    const { data } = await apiClient.get('/usuarios');
    return data;
};

export const getPerfilUsuario = async (id) => {
    const { data } = await apiClient.get(`/usuarios/perfil/${id}`);
    return data;
};

// export const updateUsuario = async (id, payload) => {
//     const { data } = await apiClient.put(`/usuarios/${id}`, payload);
//     return data;
// };

import { apiClient } from '../../_apiClient';

export async function loginApi({ identificador, contrasena }) {
    const payload = identificador.includes('@')
        ? { correo: identificador, contrasena }
        : { registro_academico: identificador, contrasena };

    const { data } = await apiClient.post('/usuarios/login', payload);
    return data; // { mensaje, token }
}

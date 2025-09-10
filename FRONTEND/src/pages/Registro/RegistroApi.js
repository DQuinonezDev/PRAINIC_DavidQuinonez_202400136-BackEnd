import { apiClient } from '../../_apiClient';

const REGISTER_PATH = '/usuarios/registro';

export async function registerApi(payload) {
    const { data } = await apiClient.post(REGISTER_PATH, payload);
    return data; // { mensaje, id }
}

import { apiClient } from '../../_apiClient';

export const getProfesores = async () => {
    const { data } = await apiClient.get('/profesores');
    return data;
};

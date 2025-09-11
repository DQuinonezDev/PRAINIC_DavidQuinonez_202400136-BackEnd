import { apiClient } from '../../_apiClient';

export async function getCursosAprobados() {
    const { data } = await apiClient.get('/cursos-aprobados');
    return data;
}

export async function addCursoAprobado(id_curso) {
    const { data } = await apiClient.post('/cursos-aprobados/asignar', { id_curso });
    return data;
}

export async function deleteCursoAprobado(id_curso) {
    const { data } = await apiClient.delete(`/cursos-aprobados/${id_curso}`);
    return data;
}

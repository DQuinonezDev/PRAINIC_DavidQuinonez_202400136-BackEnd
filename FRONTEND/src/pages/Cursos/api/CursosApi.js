import { apiClient } from '../../_apiClient';

export const getCursos = async () => {
  const { data } = await apiClient.get('/cursos/');
  return data; //  id_curso, nombre, seccion, profesor 
};

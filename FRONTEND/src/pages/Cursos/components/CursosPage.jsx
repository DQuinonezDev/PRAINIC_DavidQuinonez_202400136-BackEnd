import { useEffect, useState } from 'react';
import { getCursos } from '../api/CursosApi';

export function CursosPage() {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getCursos();
                setCursos(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <div className="container">
            <h2>Cursos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Curso</th><th>Sección</th><th>Profesor</th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.map(c => (
                        <tr key={c.id_curso}>
                            <td>{c.id_curso}</td>
                            <td>{c.nombre}</td>
                            <td>{c.seccion}</td>
                            <td>{c.profesor ?? '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

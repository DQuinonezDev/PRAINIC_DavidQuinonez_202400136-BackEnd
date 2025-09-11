import { useEffect, useState } from 'react';
import { getProfesores } from '../api/ProfesoresApi';

export function ProfesoresPage() {
    const [profesores, setProfesores] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getProfesores();
                setProfesores(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <div className="container">
            <h2>Profesores</h2>
            <ul>
                {profesores.map(p => (
                    <li key={p.id_profesor}>{p.nombres} {p.apellidos}</li>
                ))}
            </ul>
        </div>
    );
}

// src/pages/Publicaciones/components/PublicacionesPage.jsx
import { useEffect, useState } from 'react';
import { getPublicaciones } from '../api/PublicacionesApi';

export function PublicacionesPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getPublicaciones();
                setItems(data);
            } catch (e) { console.error(e); }
        })();
    }, []);

    return (
        <div className="container">
            <h2>Publicaciones</h2>
            {items.map(p => (
                <div key={p.id_publicacion} className="card">
                    <div className="meta">
                        <strong>{p.usuario_nombre} {p.usuario_apellido}</strong> · {new Date(p.fecha_creacion).toLocaleString()}
                    </div>
                    <div>{p.mensaje}</div>
                    <div className="sub">
                        {p.curso_nombre ? <>Curso: <b>{p.curso_nombre} {p.seccion}</b></> : null}
                        {p.profesor_nombre ? <> · Profesor: <b>{p.profesor_nombre}</b></> : null}
                        {typeof p.cantidad_comentarios === 'number' ? <> · Comentarios: {p.cantidad_comentarios}</> : null}
                    </div>
                </div>
            ))}
        </div>
    );
}

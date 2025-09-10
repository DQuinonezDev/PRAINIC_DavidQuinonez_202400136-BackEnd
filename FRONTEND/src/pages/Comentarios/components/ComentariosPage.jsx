import { useEffect, useState } from 'react';
import { getComentariosDePublicacion } from '../api/ComentariosApi';

export function ComentariosPage() {
    const [comentarios, setComentarios] = useState([]);
    const [pubId, setPubId] = useState('');

    const cargar = async (id) => {
        if (!id) return;
        const data = await getComentariosDePublicacion(id);
        setComentarios(data);
    };

    useEffect(() => { }, []);

    return (
        <div className="container">
            <h2>Comentarios por publicación</h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <input value={pubId} onChange={e => setPubId(e.target.value)} placeholder="ID publicación" />
                <button onClick={() => cargar(pubId)}>Cargar</button>
            </div>

            <ul>
                {comentarios.map(c => (
                    <li key={c.id_comentario}>
                        <b>{c.usuario_nombre} {c.usuario_apellido}</b>: {c.mensaje}
                        <span> · {new Date(c.fecha_creacion).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

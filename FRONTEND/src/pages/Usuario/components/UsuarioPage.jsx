import { useEffect, useState } from 'react';
import { getUsuarios } from '../api/UsuarioApi';

export function UsuarioPage() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <div className="container">
            <h2>Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Registro</th><th>Nombres</th><th>Apellidos</th><th>Correo</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(u => (
                        <tr key={u.id_usuario}>
                            <td>{u.id_usuario}</td>
                            <td>{u.registro_academico}</td>
                            <td>{u.nombres}</td>
                            <td>{u.apellidos}</td>
                            <td>{u.correo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

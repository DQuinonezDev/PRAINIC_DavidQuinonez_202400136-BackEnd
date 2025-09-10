// src/routes/RoutesApp/RoutesApp.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '../Auths/PrivateRoute';
import { Login } from '../../pages/Login/components/Login';
import { UsuarioPage } from '../../pages/Usuario/components/UsuarioPage';
import { ProfesoresPage } from '../../pages/Profesores/components/ProfesoresPage';
import { CursosPage } from '../../pages/Cursos/components/CursosPage';
import { PublicacionesPage } from '../../pages/Publicaciones/components/PublicacionesPage';
import { ComentariosPage } from '../../pages/Comentarios/components/ComentariosPage';

export function RoutesApp() {
    return (
        
        <Routes>
            <Route path="/ping" element={<div style={{padding:20}}>Frontend OK</div>} />
            {/* Públicas */}
            <Route path="/login" element={<Login />} />

            {/* Privadas */}
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Navigate to="/cursos" replace />} />
                <Route path="/usuarios" element={<UsuarioPage />} />
                <Route path="/profesores" element={<ProfesoresPage />} />
                <Route path="/cursos" element={<CursosPage />} />
                <Route path="/publicaciones" element={<PublicacionesPage />} />
                <Route path="/comentarios" element={<ComentariosPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/cursos" replace />} />
        </Routes>
    );
}

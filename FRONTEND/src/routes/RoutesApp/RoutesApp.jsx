// src/routes/RoutesApp/RoutesApp.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '../Auths/PrivateRoute';
import { Login } from '../../pages/Login/components/Login';
import { UsuarioPage } from '../../pages/Usuario/components/UsuarioPage';
import { ProfesoresPage } from '../../pages/Profesores/components/ProfesoresPage';
import { CursosPage } from '../../pages/Cursos/components/CursosPage';
import { PublicacionesPage } from '../../pages/Publicaciones/components/PublicacionesPage';
import { ComentariosList } from '../../pages/Comentarios/components/ComentariosList';
import { Registro } from '../../pages/Registro/components/Registro';
import { AppLayout } from '../../layouts/AppLayout';
import { CursosAprobadosPage } from '../../pages/CursosAprobados/components/CursosAprobadosPage'; 
import { CursosAprobadosSinSeccion } from '../../pages/CursosAprobados/components/CursosAprobadosSinSeccion';
import { PerfilUsuarioPage } from '../../pages/Usuario/components/PerfilUsuarioPage';

export function RoutesApp() {
    return (

        <Routes>
            <Route path="/ping" element={<div style={{ padding: 20 }}>Frontend OK</div>} />
            {/* Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/* Privadas */}
            <Route element={<PrivateRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/publicaciones" replace />} />
                    <Route path="/cursos" element={<CursosPage />} />
                    <Route path="/profesores" element={<ProfesoresPage />} />
                    <Route path="/publicaciones" element={<PublicacionesPage />} />
                    <Route path="/comentarios" element={<ComentariosList />} />
                    <Route path="/perfil" element={<PerfilUsuarioPage />} />
                    <Route path="/cursos-aprobados" element={<CursosAprobadosPage />} />
                    <Route path="/cursos-aprobados-sinseccion" element={<CursosAprobadosSinSeccion />} />
                </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/publicaciones" replace />} />
        </Routes>
    );
}

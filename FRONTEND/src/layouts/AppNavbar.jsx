import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image.png';
import { useState } from "react";

export function AppNavbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const [registro, setRegistro] = useState("");

    const buscar = () => {
        if (!registro.trim()) return;
        navigate(`/usuarios/buscar/${registro}`);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

                {/* Izquierda - Logo + Nombre */}
                <div className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="USAC"
                        className="h-8 w-8 object-contain rounded-full"
                    />
                    <span className="hidden sm:block font-semibold text-gray-800">
                        USAC Ingeniería
                    </span>
                </div>

                {/* Centro - Navegación */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar por registro..."
                        value={registro}
                        onChange={(e) => setRegistro(e.target.value)}
                        className="border rounded px-2 py-1"
                    />
                    <button
                        onClick={buscar}
                        className="bg-indigo-600 text-white px-3 py-1 rounded"
                    >
                        Buscar
                    </button>
                </div>
                <nav className="flex items-center gap-10 text-sm font-medium text-gray-600">
                    <Link
                        to="/cursos"
                        className="hover:text-indigo-600 transition"
                    >
                        Cursos
                    </Link>
                    <Link to="/cursos-aprobados" className="hover:text-indigo-600">Cursos Aprobados</Link>
                    <Link
                        to="/publicaciones"
                        className="hover:text-indigo-600 transition"
                    >
                        Publicaciones
                    </Link>
                </nav>

                {/* Derecha - Perfil + Logout */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/perfil')}
                        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
                    >
                        <span className="w-7 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-full text-sm font-bold">
                            U
                        </span>
                        <span className="hidden sm:block text-sm font-medium text-gray-700">
                            Perfil
                        </span>
                    </button>
                    <button
                        onClick={logout}
                        className="text-sm text-gray-500 hover:text-red-600 transition"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </header>
    );
}

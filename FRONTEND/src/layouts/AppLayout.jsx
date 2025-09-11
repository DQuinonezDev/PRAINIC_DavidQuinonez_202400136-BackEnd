import { Outlet, Link } from 'react-router-dom';
import { AppNavbar } from './AppNavbar';

export function AppLayout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <AppNavbar />

            <main className="max-w-6xl mx-auto mt-4 flex gap-6 px-4">
                {/* Sidebar Izquierdo */}
                <aside className="hidden md:block w-56 text-sm text-gray-700">
                    <nav className="space-y-2 sticky top-16">
                        <Link to="/cursos-aprobados-sinseccion" className="block px-2 py-1 hover:bg-gray-200 rounded">
                            📘 Cursos Por Aprobar Sin Seccion
                        </Link>
                        <Link to="/profesores" className="block px-2 py-1 hover:bg-gray-200 rounded">
                            👨‍🏫 Profesores
                        </Link>
                        <Link to="/perfil" className="block px-2 py-1 hover:bg-gray-200 rounded">
                            🙋‍♂️ Mi Perfil
                        </Link>
                    </nav>
                </aside>

                {/* Feed Central */}
                <section className="flex-1 max-w-2xl">
                    <Outlet />
                </section>

                {/* Derecha libre (para futuro) */}
                <aside className="hidden lg:block w-64 text-gray-500 text-sm">
                    <div className="sticky top-16">
                        <p>Cursos destacados, anuncios o nada por ahora 🚀</p>
                    </div>
                </aside>
            </main>
        </div>
    );
}

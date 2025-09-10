import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '../api/LoginApi';
import logo from '../../../assets/logo-usac.png';

export function Login() {
    const [identificador, setIdentificador] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [recordar, setRecordar] = useState(false);
    const [mostrarPass, setMostrarPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = localStorage.getItem('remember_user');
        if (saved) {
            setIdentificador(saved);
            setRecordar(true);
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!identificador.trim() || !contrasena.trim()) {
            setError('Completa todos los campos.');
            return;
        }
        try {
            setLoading(true);
            const { token } = await loginApi({ identificador, contrasena });
            localStorage.setItem('token', token);
            if (recordar) localStorage.setItem('remember_user', identificador);
            else localStorage.removeItem('remember_user');
            navigate('/cursos');
        } catch (err) {
            setError(err?.response?.data?.mensaje || 'No se pudo iniciar sesión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-white px-4 overflow-hidden">
            {/* Fondo profesional: aurora sutil + malla */}
            <div className="absolute inset-0 pointer-events-none">
                {/* malla muy tenue */}
                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
                        backgroundSize: '22px 22px'
                    }}
                />
                {/* aurora */}
                <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-indigo-200/35 blur-3xl rounded-full" />
                <div className="absolute -bottom-48 -right-48 w-[32rem] h-[32rem] bg-sky-200/35 blur-3xl rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] bg-indigo-100/40 blur-[120px] rounded-full" />
            </div>

            {/* Tarjeta */}
            <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-8">
                <div className="flex flex-col items-center gap-3 mb-4">
                    <img
                        src={logo}
                        alt="Facultad de Ingeniería - USAC"
                        className="h-20 w-200 object-contain drop-shadow"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    
                </div>

                <h1 className="text-center text-lg font-semibold tracking-wide text-gray-900">
                    INICIAR SESIÓN INGENIERÍA USAC
                </h1>

                <form onSubmit={onSubmit} className="mt-6 space-y-5">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            CUI / REGISTRO ACADÉMICO / REGISTRO PERSONAL
                        </label>
                        <input
                            type="text"
                            value={identificador}
                            onChange={(e) => setIdentificador(e.target.value)}
                            placeholder="Ej. 202400123 o usuario@usac.edu.gt"
                            autoComplete="username"
                            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Contraseña</label>
                        <div className="relative flex">
                            <input
                                type={mostrarPass ? 'text' : 'password'}
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarPass(!mostrarPass)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-indigo-600 transition"
                            >
                                {mostrarPass ? 'Ocultar' : 'Mostrar'}
                            </button>
                        </div>
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={recordar}
                            onChange={(e) => setRecordar(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        Recordar mi usuario
                    </label>

                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !identificador.trim() || !contrasena.trim()}
                        className={`w-full rounded-xl py-2.5 font-semibold text-white shadow-lg transition
              ${loading || !identificador.trim() || !contrasena.trim()
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[.99]'
                            }`}
                    >
                        {loading ? 'INICIANDO…' : 'INICIAR SESIÓN'}
                    </button>

                    <div className="text-center text-sm mt-2 flex items-center justify-center gap-1 text-gray-600">
                        ¿No tienes cuenta?
                        <Link to="/registro" className="text-indigo-600 hover:underline">
                            Regístrate
                        </Link>
                    </div>

                    <div className="text-center text-sm">
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-indigo-600 hover:underline transition">
                            ¿Olvidó su contraseña?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

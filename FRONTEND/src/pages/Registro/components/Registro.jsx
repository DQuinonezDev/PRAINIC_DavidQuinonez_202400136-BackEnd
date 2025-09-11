import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../api/RegistroApi';

export function Registro() {
    const [form, setForm] = useState({
        registro_academico: '',
        nombres: '',
        apellidos: '',
        correo: '',
        contrasena: '',
        confirm: ''
    });
    const [mostrarPass, setMostrarPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErr(''); setMsg('');
    };

    const valid =
        form.registro_academico.trim() &&
        form.nombres.trim() &&
        form.apellidos.trim() &&
        /\S+@\S+\.\S+/.test(form.correo) &&
        form.contrasena.length >= 6 &&
        form.contrasena === form.confirm;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!valid) return;
        try {
            setLoading(true);
            await registerApi({
                registro_academico: form.registro_academico.trim(),
                nombres: form.nombres.trim(),
                apellidos: form.apellidos.trim(),
                correo: form.correo.trim(),
                contrasena: form.contrasena
            });
            setMsg('Cuenta creada correctamente. Ahora puedes iniciar sesión.');
            setTimeout(() => navigate('/login'), 800);
        } catch (error) {
            setErr(error?.response?.data?.mensaje || 'No se pudo registrar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-white px-4 overflow-hidden">
            {/* mismo fondo que login */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
                        backgroundSize: '22px 22px'
                    }}
                />
                <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-indigo-200/35 blur-3xl rounded-full" />
                <div className="absolute -bottom-48 -right-48 w-[32rem] h-[32rem] bg-sky-200/35 blur-3xl rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] bg-indigo-100/40 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-8">
                <h1 className="text-center text-xl font-semibold tracking-wide text-gray-900">Crear Cuenta</h1>

                <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Registro Académico</label>
                        <input
                            name="registro_academico"
                            value={form.registro_academico}
                            onChange={onChange}
                            placeholder="Ej. 202400123"
                            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                        <input
                            name="nombres"
                            value={form.nombres}
                            onChange={onChange}
                            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                        <input
                            name="apellidos"
                            value={form.apellidos}
                            onChange={onChange}
                            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                        <input
                            type="email"
                            name="correo"
                            value={form.correo}
                            onChange={onChange}
                            placeholder="usuario@usac.edu.gt"
                            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type={mostrarPass ? 'text' : 'password'}
                            name="contrasena"
                            value={form.contrasena}
                            onChange={onChange}
                            placeholder="Mínimo 6 caracteres"
                            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                        <div className="relative">
                            <input
                                type={mostrarPass ? 'text' : 'password'}
                                name="confirm"
                                value={form.confirm}
                                onChange={onChange}
                                className="w-full rounded-xl border border-gray-300 px-3 py-2.5 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarPass((v) => !v)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-indigo-600"
                            >
                                {mostrarPass ? 'Ocultar' : 'Mostrar'}
                            </button>
                        </div>
                    </div>

                    {/* mensajes */}
                    {err && <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">{err}</div>}
                    {msg && <div className="md:col-span-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700 text-sm">{msg}</div>}

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={!valid || loading}
                            className={`w-full rounded-xl py-2.5 font-semibold text-white shadow-lg transition
                ${!valid || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[.99]'}`}
                        >
                            {loading ? 'Creando…' : 'Crear cuenta'}
                        </button>
                    </div>

                    <div className="md:col-span-2 text-center text-sm text-gray-600">
                        ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-600 hover:underline">Inicia sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

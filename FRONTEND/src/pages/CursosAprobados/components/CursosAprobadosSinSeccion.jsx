import { useEffect, useState } from "react";
import {
    getCursosAprobados,
    addCursoAprobado,
    deleteCursoAprobado,
} from "../api/CursosAprobados";
import { apiClient } from "../../_apiClient";

export function CursosAprobadosSinSeccion() {
    const [cursosAprobados, setCursosAprobados] = useState([]);
    const [cursosDisponibles, setCursosDisponibles] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const aprobados = await getCursosAprobados();
            setCursosAprobados(aprobados);

            const res = await apiClient.get("/cursos");
            const disponibles = res.data.filter(
                (c) => !aprobados.some((a) => a.nombre === c.nombre) 
            );

            const unicos = [];
            const nombresSet = new Set();

            for (const c of disponibles) {
                if (!nombresSet.has(c.nombre)) {
                    unicos.push(c);
                    nombresSet.add(c.nombre);
                }
            }

            setCursosDisponibles(unicos);
        } catch (error) {
            console.error("❌ Error cargando datos:", error);
        }
    };

    const aprobar = async (curso) => {
        try {
            await addCursoAprobado(curso.id_curso);
            fetchData();
        } catch (err) {
            console.error("❌ Error al aprobar curso:", err);
        }
    };

    const desaprobar = async (curso) => {
        try {
            await deleteCursoAprobado(curso.id_curso);
            fetchData();
        } catch (err) {
            console.error("❌ Error al desaprobar curso:", err);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-6">
            {/* Cursos por aprobar */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold text-gray-700 mb-4">
                    📋 Cursos por aprobar
                </h2>
                <ul className="space-y-3">
                    {cursosDisponibles.map((c) => (
                        <li
                            key={c.id_curso}
                            className="flex justify-between items-center bg-white p-3 rounded shadow-sm border"
                        >
                            <div>
                                <p className="font-medium">{c.nombre}</p>
                            </div>
                            <button
                                onClick={() => aprobar(c)}
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                                Aprobar
                            </button>
                        </li>
                    ))}
                    {cursosDisponibles.length === 0 && (
                        <p className="text-sm text-gray-500">No hay cursos pendientes</p>
                    )}
                </ul>
            </div>

            {/* Cursos aprobados */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold text-gray-700 mb-4">
                    ✅ Cursos aprobados
                </h2>
                <ul className="space-y-3">
                    {cursosAprobados.map((c) => (
                        <li
                            key={c.id_curso}
                            className="flex justify-between items-center bg-white p-3 rounded shadow-sm border"
                        >
                            <div>
                                <p className="font-medium">{c.nombre}</p>
                                <p className="text-sm text-gray-500">
                                    👨‍🏫 {c.profesor || "Sin profesor asignado"}
                                </p>
                            </div>
                            <button
                                onClick={() => desaprobar(c)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Quitar
                            </button>
                        </li>
                    ))}
                    {cursosAprobados.length === 0 && (
                        <p className="text-sm text-gray-500">No hay cursos aprobados aún</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

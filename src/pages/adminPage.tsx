import { useState, useEffect } from "react";
import { FiShield, FiAlertTriangle, FiActivity, FiFilter, FiX } from "react-icons/fi";
import { reportService } from "../services/reportService";
import { moderationLogService } from "../services/moderationLogService";
import type { Report, ModerationLog } from "../types";
import StateMessage from "../components/ui/StateMessage";

export default function AdminPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [reportsLoading, setReportsLoading] = useState(true);

    const [logs, setLogs] = useState<ModerationLog[]>([]);
    const [logsLoading, setLogsLoading] = useState(true);

    const [filterRole, setFilterRole] = useState("");
    const [filterAction, setFilterAction] = useState("");
    const [filterCode, setFilterCode] = useState("");

    const [activeTab, setActiveTab] = useState<"reports" | "logs">("reports");

    // Carga reportes pendientes
    useEffect(() => {
        reportService.getAllReports()
            .then((data) => setReports(data.filter(r => r.status === "Pendiente")))
            .catch(() => setReports([]))
            .finally(() => setReportsLoading(false));
    }, []);

    // Carga logs con filtros
    useEffect(() => {
        setLogsLoading(true);
        moderationLogService.getAll(filterRole, filterAction, filterCode)
            .then((data) => setLogs(data))
            .catch(() => setLogs([]))
            .finally(() => setLogsLoading(false));
    }, [filterRole, filterAction, filterCode]);

    const handleResolve = async (reportId: string, status: number) => {
        try {
            await reportService.resolveReport(reportId, status);
            // Quita el reporte resuelto de la lista
            setReports(prev => prev.filter(r => r.reportId !== reportId));
        } catch (err) {
            console.error("Error al resolver reporte:", err);
        }
    };

    const clearFilters = () => {
        setFilterRole("");
        setFilterAction("");
        setFilterCode("");
    };

    const hasFilters = filterRole || filterAction || filterCode;

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-eia-azul mb-6 flex items-center gap-2">
                <FiShield /> Panel de Administración
            </h1>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border">
                <button
                    onClick={() => setActiveTab("reports")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-b-2 ${activeTab === "reports"
                        ? "border-eia-azul-claro text-eia-azul-claro"
                        : "border-transparent text-muted hover:text-text"}`}
                >
                    <FiAlertTriangle />
                    Reportes pendientes
                    {reports.length > 0 && (
                        <span className="bg-danger text-white text-xs px-2 py-0.5 rounded-full">
                            {reports.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("logs")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-b-2 ${activeTab === "logs"
                        ? "border-eia-azul-claro text-eia-azul-claro"
                        : "border-transparent text-muted hover:text-text"}`}
                >
                    <FiActivity />
                    Moderation Logs
                </button>
            </div>

            {/* Seccion de reportes */}
            {activeTab === "reports" && (
                <>
                    {reportsLoading ? (
                        <StateMessage type="loading" title="Cargando reportes" />
                    ) : reports.length === 0 ? (
                        <StateMessage
                            type="empty"
                            title="No hay reportes pendientes"
                            description="Todos los reportes han sido atendidos."
                        />
                    ) : (
                        <section className="flex flex-col gap-3">
                            {reports.map((report) => (
                                <div key={report.reportId}
                                    className="bg-white rounded-2xl border border-border p-4 shadow-sm">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex flex-col gap-1">
                                            {/* Quién reportó */}
                                            <p className="text-sm font-semibold text-eia-azul">
                                                Reportado por: {report.reporterName}
                                            </p>
                                            {/* Objetivo del reporte */}
                                            {report.reportedUserName && (
                                                <p className="text-sm text-muted">
                                                    Usuario: <span className="font-medium text-text">{report.reportedUserName}</span>
                                                </p>
                                            )}
                                            {report.reportedListingTitulo && (
                                                <p className="text-sm text-muted">
                                                    Listing: <span className="font-medium text-text">{report.reportedListingTitulo}</span>
                                                </p>
                                            )}
                                            {/* Razón y comentario */}
                                            <p className="text-sm text-muted">
                                                Razón: <span className="font-medium text-text">{report.reason}</span>
                                            </p>
                                            {report.comment && (
                                                <p className="text-sm text-muted italic">"{report.comment}"</p>
                                            )}
                                            {/* Fecha */}
                                            <p className="text-xs text-muted mt-1">
                                                {new Date(report.createdAt + "Z").toLocaleDateString("es-CO", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </p>
                                        </div>

                                        {/* Acciones */}
                                        <div className="flex flex-col gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => handleResolve(report.reportId, 1)}
                                                className="px-3 py-1.5 text-xs font-semibold bg-eia-azul-claro text-white rounded-xl hover:opacity-90 transition"
                                            >
                                                Resolver
                                            </button>
                                            <button
                                                onClick={() => handleResolve(report.reportId, 2)}
                                                className="px-3 py-1.5 text-xs font-semibold bg-eia-fondo text-muted rounded-xl hover:bg-border transition"
                                            >
                                                Descartar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}
                </>
            )}

            {/* Seccion de logs*/}
            {activeTab === "logs" && (
                <>
                    {/* Filtros */}
                    <div className="flex flex-wrap gap-3 mb-4">
                        <input
                            type="text"
                            placeholder="Filtrar por rol..."
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="border border-border rounded-xl px-3 py-2 text-sm outline-none focus:border-eia-azul-claro"
                        />
                        <input
                            type="text"
                            placeholder="Filtrar por acción..."
                            value={filterAction}
                            onChange={(e) => setFilterAction(e.target.value)}
                            className="border border-border rounded-xl px-3 py-2 text-sm outline-none focus:border-eia-azul-claro"
                        />
                        <input
                            type="number"
                            placeholder="Código (200, 400...)"
                            value={filterCode}
                            onChange={(e) => setFilterCode(e.target.value)}
                            className="border border-border rounded-xl px-3 py-2 text-sm outline-none focus:border-eia-azul-claro w-40"
                        />
                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 text-sm text-muted hover:text-danger transition"
                            >
                                <FiX /> Limpiar
                            </button>
                        )}
                    </div>

                    {logsLoading ? (
                        <StateMessage type="loading" title="Cargando logs" />
                    ) : logs.length === 0 ? (
                        <StateMessage type="empty" title="No hay logs" description="No hay actividad registrada." />
                    ) : (
                        <div className="overflow-x-auto rounded-2xl border border-border">
                            <table className="w-full text-sm">
                                <thead className="bg-eia-fondo text-eia-gris uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Usuario</th>
                                        <th className="px-4 py-3 text-left">Rol</th>
                                        <th className="px-4 py-3 text-left">Acción</th>
                                        <th className="px-4 py-3 text-left">Código</th>
                                        <th className="px-4 py-3 text-left">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {logs.map((log) => (
                                        <tr key={log.logId} className="bg-white hover:bg-eia-fondo/50 transition">
                                            <td className="px-4 py-3 text-text">{log.userEmail}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${log.userRole === "Admin"
                                                    ? "bg-eia-azul text-white"
                                                    : "bg-eia-fondo text-eia-gris"}`}>
                                                    {log.userRole}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-mono text-xs text-muted">{log.action}</td>
                                            <td className="px-4 py-3">
                                                <span className={`font-bold ${log.resultCode < 300
                                                    ? "text-green-600"
                                                    : log.resultCode < 500
                                                        ? "text-yellow-600"
                                                        : "text-danger"}`}>
                                                    {log.resultCode}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-muted">
                                                {new Date(log.createdAt + "Z").toLocaleString("es-CO", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { DashboardStats } from "@/interfaces/DashboardStates";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminPage() {
        // useAuth ya nos dará el usuario si el AdminLayout ha permitido el acceso.
    // No necesitamos manejar redirecciones aquí, el layout ya lo hace.
    const { user } = useAuth();

    // Estado para simular la carga de datos específicos del dashboard
    const [loadingData, setLoadingData] = useState(true);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoadingData(true);
                setError(null);
                // --- SIMULACIÓN DE LLAMADA API ---
                // Aquí iría tu llamada real a una API de backend para obtener estadísticas del dashboard.
                // Por ejemplo: await fetch('/api/admin/dashboard-stats', { headers: { 'Authorization': `Bearer ${user.token}` } });
                // En este ejemplo, solo simulamos un retraso.
                await new Promise(resolve => setTimeout(resolve, 800)); // Simula un retraso de 800ms

                // Datos de ejemplo
                setStats({
                    totalUsers: 150,
                    activeProducts: 75,
                    pendingOrders: 12,
                    monthlySales: 12500.50,
                });
                // --- FIN SIMULACIÓN ---
            } catch (err: any) {
                setError(err.message || "No se pudieron cargar las estadísticas del dashboard.");
                console.error("Error fetching dashboard stats:", err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchDashboardData();
    }, []); // El efecto se ejecuta una vez al montar el componente.

    // El AdminLayout ya maneja el estado 'loading' general y la redirección.
    // Esta parte solo se encarga de la carga de datos DENTRO de esta página específica.
    if (loadingData) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md">
                <Skeleton className="h-10 w-3/4 mb-4" /> {/* Esqueleto para el título */}
                <Skeleton className="h-6 w-1/2 mb-8" /> {/* Esqueleto para el subtítulo */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Skeleton className="h-32 w-full rounded-lg" /> {/* Esqueleto para tarjeta de estadísticas 1 */}
                    <Skeleton className="h-32 w-full rounded-lg" /> {/* Esqueleto para tarjeta de estadísticas 2 */}
                    <Skeleton className="h-32 w-full rounded-lg" /> {/* Esqueleto para tarjeta de estadísticas 3 */}
                    <Skeleton className="h-32 w-full rounded-lg" /> {/* Esqueleto para tarjeta de estadísticas 4 */}
                </div>
                <div className="mt-8">
                     <Skeleton className="h-48 w-full rounded-lg" /> {/* Esqueleto para un gráfico o tabla */}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md text-red-600 text-center">
                <h2 className="text-2xl font-bold mb-4">Error al cargar el Dashboard</h2>
                <p>{error}</p>
                <p className="mt-4 text-sm text-gray-700">Por favor, intenta de nuevo más tarde o contacta soporte.</p>
            </div>
        );
    }

    const userName = user?.firstName || user?.email || "Administrador";

    return (
        <section className="bg-white p-8 rounded-lg shadow-md">
        <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                Dashboard de Administración
            </h1>
            <p className="text-lg text-gray-700">
                ¡Bienvenido de nuevo, <span className="font-semibold text-blue-700">{userName}</span>!
                Aquí tienes un resumen rápido.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Tarjetas de estadísticas */}
            <article className="bg-blue-100 p-6 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <h2 className="sr-only">Estadísticas de Usuarios</h2> {/* Oculto para lectores de pantalla si el número es suficiente */}
                <span className="text-5xl font-bold text-blue-700">{stats?.totalUsers || 0}</span>
                <p className="text-blue-600 mt-2 text-lg">Usuarios Registrados</p>
            </article>
            <article className="bg-green-100 p-6 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <h2 className="sr-only">Estadísticas de Productos</h2>
                <span className="text-5xl font-bold text-green-700">{stats?.activeProducts || 0}</span>
                <p className="text-green-600 mt-2 text-lg">Productos Activos</p>
            </article>
            <article className="bg-yellow-100 p-6 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <h2 className="sr-only">Estadísticas de Pedidos</h2>
                <span className="text-5xl font-bold text-yellow-700">{stats?.pendingOrders || 0}</span>
                <p className="text-yellow-600 mt-2 text-lg">Pedidos Pendientes</p>
            </article>
            <article className="bg-purple-100 p-6 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <h2 className="sr-only">Estadísticas de Ventas</h2>
                <span className="text-5xl font-bold text-purple-700">${(stats?.monthlySales || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <p className="text-purple-600 mt-2 text-lg">Ventas del Mes</p>
            </article>
        </div>

        <nav aria-label="Enlaces rápidos de administración" className="mt-8 flex justify-center space-x-4">
            <Link href="/admin/products" passHref>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3">
                    Gestionar Productos
                </Button>
            </Link>
            <Link href="/admin/users" passHref>
                <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3">
                    Gestionar Usuarios
                </Button>
            </Link>
        </nav>
    </section>
    );
}
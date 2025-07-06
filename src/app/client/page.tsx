'use client';

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/interfaces/User";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientPage() {
    const { user, status, logout } = useAuth();
    const router = useRouter();
    const [userData, setUserData] = useState<User | null>(null);
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [error, setError] = useState<string | null>(null);

    if (status === 'checking' || loadingUserData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center py-20 text-lg font-semibold text-blue-700">Cargando perfil de usuario...</div>
                <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-red-600 text-lg p-4 text-center bg-gray-100">
                <p className="text-3xl font-bold mb-4">¡Oops! Algo salió mal</p>
                <p>Error: {error}</p>
                <p className="mt-4 text-base">No pudimos cargar tu perfil. Por favor, intenta de nuevo.</p>
                <Button onClick={() => window.location.reload()} className="mt-6 bg-red-600 hover:bg-red-700 text-white">
                    Recargar Página
                </Button>
                <Button onClick={logout} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white">
                    Cerrar Sesión
                </Button>
            </div>
        );
    }

    if (!user || !userData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
                <p className="text-2xl font-semibold mb-4">No estás autenticado.</p>
                <Link href="/login" passHref>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Ir al Login</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
                    ¡Bienvenido, {userData.firstName || userData.email}!
                </h1>
                <p className="text-lg text-center text-gray-700 mb-8">
                    Este es tu panel de control personalizado.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-blue-700 mb-3">Tu Información</h2>
                        <p className="text-gray-800">**Email:** {userData.email}</p>
                        {userData.role && <p className="text-gray-800">**Rol:** {userData.role}</p>}
                        {userData.lastAccess && <p className="text-gray-800">**Último acceso:** {new Date(userData.lastAccess).toLocaleString()}</p>}
                        {/* Puedes añadir más información de perfil aquí */}
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-green-700 mb-3">Acciones Rápidas</h2>
                        <div className="flex flex-col space-y-3">
                            <Link href="/products" passHref>
                                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                                    Ver Productos
                                </Button>
                            </Link>
                            <Link href="/orders" passHref>
                                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                                    Mis Pedidos
                                </Button>
                            </Link>
                            <Link href="/profile-settings" passHref>
                                <Button className="w-full bg-gray-500 hover:bg-gray-600 text-white">
                                    Gestionar Perfil
                                </Button>
                            </Link>
                            {/* Añade más enlaces útiles aquí */}
                        </div>
                    </div>
                </div>

                {/* Sección opcional para mostrar datos dinámicos del usuario, como pedidos recientes */}
                <div className="mt-8 border-t pt-8 border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Tus Últimos Pedidos</h2>
                    {/* Aquí podrías mapear una lista de pedidos fetched desde otra API */}
                    {/* Por ahora, es un placeholder */}
                    <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-600">
                        <p>No tienes pedidos recientes para mostrar.</p>
                        <Link href="/orders" passHref>
                            <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                                Ver todos los pedidos
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <Button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg">
                        Cerrar Sesión
                    </Button>
                </div>
            </div>
        </div>
    );
}
'use client';

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function AdminPage() {
    const { user } = useAuth();

    const userName = user?.firstName || user?.email || "Administrador";

    return (
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[calc(100vh-160px)]"> {/* Ajuste min-h para centrar mejor */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                Dashboard de Administración
            </h1>
            <p className="text-lg text-gray-700 mb-10 text-center">
                ¡Bienvenido de nuevo, <span className="font-semibold text-blue-700">{userName}</span>!
                Selecciona una opción para gestionar tu plataforma.
            </p>

            <nav aria-label="Navegación del panel de administración" className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-lg">
                <Link href="/admin/users" passHref className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        Gestionar Usuarios
                    </Button>
                </Link>
                <Link href="/admin/products" passHref className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        Gestionar Productos
                    </Button>
                </Link>
            </nav>

            {/* Opcional: Pie de página o información adicional si lo deseas */}
            <footer className="mt-auto pt-8 text-sm text-gray-500 text-center">
                <p>&copy; {new Date().getFullYear()} IDWM. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
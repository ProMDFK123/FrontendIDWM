"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook para obtener la ruta actual

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/admin" },
        { name: "Gestionar Usuarios", href: "/admin/users" },
        { name: "Gestionar Productos", href: "/admin/products" },
        // { name: "Ajustes", href: "/admin/settings" }, // Ejemplo
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
            <div className="text-2xl font-bold mb-8 text-blue-400">Admin Panel</div>
            <nav className="flex-grow">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name} className="mb-2">
                            <Link href={item.href} passHref>
                                <div
                                    className={`flex items-center p-3 rounded-lg transition-colors duration-200
                                    ${pathname === item.href ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-700 text-gray-300"}`}
                                >
                                    {/* Iconos opcionales aquí, por ejemplo: */}
                                    {/* <UserIcon className="mr-3 h-5 w-5" /> */}
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Opcional: sección inferior del sidebar, como un botón de logout */}
            <div className="mt-auto pt-4 border-t border-gray-700">
                {/* <Button className="w-full bg-red-500 hover:bg-red-600">Cerrar Sesión</Button> */}
            </div>
        </aside>
    );
}
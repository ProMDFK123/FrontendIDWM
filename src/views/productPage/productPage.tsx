// src/app/products/page.tsx (o la ruta donde tengas tu ViewProductsPage)
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ApiBackend } from "@/clients/axios"; // Asegúrate de que esta ruta sea correcta
import { ResponseAPI } from "@/interfaces/ResponseAPI"; // Asegúrate de que esta ruta sea correcta
import { Product } from "@/interfaces/Product"; // Asegúrate de que esta ruta sea correcta
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Asegúrate de que esta ruta sea correcta
import { useProductStore } from "@/store/ProductStore"; // Asegúrate de que esta ruta sea correcta
import { ProductCard } from "@/components/products/ProductCard";
// Si tienes un componente Navbar, impórtalo aquí
// import { Navbar } from "@/components/Navbar"; // Descomenta si tienes un Navbar

export default function ViewProductsPage() {
    // Hooks de estado y store
    const [error, setError] = useState<string | null>(null);
    const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] = useState(false);
    const { products, loading, fetchProducts, filters } = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Efecto para cargar productos cuando cambian los filtros
    useEffect(() => {
        // Asumiendo que fetchProducts maneja internamente la lógica de errores o que la quieres manejar aquí
        const loadProducts = async () => {
            try {
                // Aquí, asumo que fetchProducts ya maneja la lógica de la API.
                // Si fetchProducts solo actualiza el estado y no hace la llamada API directamente
                // o si quieres manejar el error aquí, puedes añadir try/catch.
                // Para este ejemplo, asumo que useProductStore ya maneja el error de carga y lo refleja en el store.
                await fetchProducts(); // Llama a la función del store para obtener los productos
                setError(null); // Limpia cualquier error previo si la carga fue exitosa
            } catch (err: any) {
                let errorMessage = "Error al cargar los productos.";
                if (err.response && err.response.data && err.response.data.message) {
                    errorMessage = err.response.data.message;
                } else if (err.message) {
                    errorMessage = err.message;
                }
                setError(errorMessage);
            }
        };

        loadProducts();
    }, [filters, fetchProducts]); // Asegúrate de que fetchProducts sea estable o memorizado si lo usas en un useEffect

    // Manejador de click en producto para abrir el modal
    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsProductDetailsModalOpen(true);
    };

    // Manejador para cerrar el modal
    const handleCloseModal = () => {
        setIsProductDetailsModalOpen(false);
        setSelectedProduct(null);
    };

    // Renderizado condicional para el estado de carga
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center py-20 text-lg font-semibold text-blue-700">Cargando Productos...</div>
                {/* Opcional: un spinner o animación de carga */}
                <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    // Renderizado condicional para el estado de error
    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-red-600 text-lg p-4 text-center bg-gray-100">
                <p className="text-3xl font-bold mb-4">¡Oops! Algo salió mal</p>
                <p>Error: {error}</p>
                <p className="mt-4 text-base">Por favor, intenta recargar la página o verifica la conexión con el servidor.</p>
                <Button onClick={() => window.location.reload()} className="mt-6 bg-red-600 hover:bg-red-700 text-white">
                    Recargar Página
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            {/* {<Navbar />} */} {/* Descomenta si tienes un Navbar */}

            {/* Banner */}
            {/* Asumo que 'tienda.jpg' está en tu carpeta public/images o similar */}
            <div
                className="relative w-full h-64 md:h-96 bg-cover bg-center flex items-center justify-center text-center p-4"
                style={{ backgroundImage: "url('/images/tienda.jpg')" }} // Asegúrate de la ruta de la imagen
            >
                <div className="absolute inset-0 bg-black opacity-60"></div> {/* Oscurecimiento */}
                <div className="relative z-10 text-white">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2 leading-tight">Bienvenido a nuestra Tienda</h1>
                    <p className="text-lg md:text-xl font-medium">Explora nuestros productos y ofertas especiales</p>
                </div>
            </div>

            {/* Contenido principal de productos */}
            <div className="flex flex-col items-center p-8 bg-gray-50">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center">Nuestros Productos</h2>
                <p className="text-lg md:text-xl text-gray-700 mb-10 text-center">Encuentra lo que necesitas</p>

                {products.length === 0 ? (
                    <p className="text-gray-600 text-lg mt-10">No hay productos disponibles en este momento.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => handleProductClick(product)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de detalles del producto */}
            {selectedProduct && (
                <Dialog open={isProductDetailsModalOpen} onOpenChange={setIsProductDetailsModalOpen}>
                    <DialogContent className="sm:max-w-[480px] bg-white rounded-lg shadow-xl p-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-gray-900">{selectedProduct.name}</DialogTitle>
                            <DialogDescription className="text-gray-600 mt-1">
                                Detalle del producto
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center py-6">
                            <img
                                src={selectedProduct.urls && selectedProduct.urls.length > 0 ? selectedProduct.urls[0] : '/images/placeholder.png'}
                                alt={selectedProduct.name || "Imagen de producto"} // Asegurarse de que alt sea string
                                className="w-64 h-64 object-contain mb-5 rounded-md border border-gray-200"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/placeholder.png'; // Fallback para imagen
                                }}
                            />
                            <p className="text-blue-700 font-bold text-3xl mb-3">${selectedProduct.price.toFixed(2)}</p>
                            <p className="text-gray-800 text-center leading-relaxed px-2">{selectedProduct.description}</p>
                        </div>
                        <Button onClick={handleCloseModal} className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors">
                            Cerrar
                        </Button>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-2">
                            Agregar al carrito
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
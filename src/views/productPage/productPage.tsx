// src/components/ProductPage.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { Product } from "@/interfaces/Product";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await ApiBackend.get<ResponseAPI>('product');

                if (data.success) {
                    setProducts(data.data as Product[]);
                } else {
                    setError(data.message || "Fallo al obtener los productos.");
                }
            } catch (err: any) {
                setError(err.response?.data?.message || "Ocurrió un error inesperado al obtener los productos.");
                console.error("Error al obtener los productos:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsProductDetailsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsProductDetailsModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg">Cargando productos...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-red-600 text-lg p-4 text-center">
                <p>Error: {error}</p>
                <p className="mt-2 text-base">Por favor, intenta recargar la página o verifica la conexión con el servidor.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-4 min-h-screen bg-gray-50">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Tienda: Web & Móvil</h1>
            <p className="text-xl text-gray-700 mb-10">Descubre nuestros productos</p>

            {products.length === 0 ? (
                <p className="text-gray-600 text-lg mt-10">No hay productos disponibles en este momento.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                            onClick={() => handleProductClick(product)}
                        >
                            <img
                                src={Array.isArray(product.urls) ? product.urls[0] : product.urls}
                                alt={product.name}
                                className="w-40 h-40 object-contain mb-5 rounded-md"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/placeholder.png'; // Asegúrate de tener esta imagen
                                }}
                            />
                            <h2 className="text-xl font-semibold text-center mb-2 text-gray-800 line-clamp-2">{product.name}</h2>
                            <p className="text-blue-700 font-bold text-2xl mb-4">${product.price.toFixed(2)}</p>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Agregar al carrito
                            </Button>
                        </div>
                    ))}
                </div>
            )}

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
                                alt={selectedProduct.name}
                                className="w-64 h-64 object-contain mb-5 rounded-md border border-gray-200"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/placeholder.png';
                                }}
                            />
                            <p className="text-blue-700 font-bold text-3xl mb-3">${selectedProduct.price.toFixed(2)}</p>
                            <p className="text-gray-800 text-center leading-relaxed px-2">{selectedProduct.description}</p>
                        </div>
                        <Button onClick={handleCloseModal} className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors">
                            Cerrar
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
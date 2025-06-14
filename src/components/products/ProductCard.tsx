// src/components/products/ProductCard.tsx
import { Product } from "@/interfaces/Product";
import Image from "next/image"; // Mantén la importación de Image de next/image

interface ProductCardProps { // Corregido el nombre de la interfaz a ProductCardProps por convención
    product: Product;
    onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {

    // --- Lógica para determinar la URL de la imagen ---
    // Verifica si product.urls existe, es un array y tiene al menos un elemento.
    // También verifica que el primer elemento sea una cadena no vacía.
    const imageUrl =
        (product.urls && Array.isArray(product.urls) && product.urls.length > 0 && typeof product.urls[0] === 'string' && product.urls[0].trim() !== '')
            ? product.urls[0] // Usa la URL real si es válida
            : '/images/placeholder.png'; // Usa una imagen de placeholder si no hay URL válida

    // --- Lógica para el texto alternativo (alt) ---
    const altText = product.name || "Producto sin nombre"; // Proporciona un fallback si product.name es undefined

    return (
        <div
            className='bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition' // Corregido: bg.white -> bg-white
            onClick={onClick}
        >
            <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                <Image
                    src={imageUrl} // <-- Aquí usamos la URL dinámica validada
                    alt={altText}  // <-- Aquí usamos el texto alternativo validado
                    width={200}
                    height={200}
                    className="object-contain"
                    // Puedes añadir un onError si quieres manejar la visualización de fallbacks de forma más robusta
                    // onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }}
                    // Nota: next/image tiene su propio mecanismo de fallback. A veces, para URLs remotas,
                    // es necesario configurar `domains` en `next.config.js`
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3> {/* Corregido: front-semibold -> font-semibold, text.lg -> text-lg. Añadido line-clamp-2 para nombres largos */}
                <p className="mt-2 text-blue-700 font-bold text-xl">${product.price.toFixed(2)}</p> {/* Corregido: text-x1 -> text-xl. Agregado .toFixed(2) para el precio */}
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"> {/* Corregido: w.full -> w-full y estilos básicos de botón */}
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};
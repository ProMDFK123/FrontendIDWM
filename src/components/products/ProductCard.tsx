// src/components/products/ProductCard.tsx
import { Product } from '../../interfaces/Product';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LoginDialog } from './LoginDialog';
import { useState } from 'react';
interface ProductCardProps { // Corregido el nombre de la interfaz a ProductCardProps por convención
    product: Product;
    onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {

    // return {addToCart} = useCartStore()
    const { user } = useAuth();
     const [showDialog, setShowDialog] = useState(false);
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!user) {
            setShowDialog(true);
            return;
        } 
        // addToCart(product.id, 1);
        alert("Producto agregado al carrito");
    }
    const imageUrl =
        (product.urls && Array.isArray(product.urls) && product.urls.length > 0 && typeof product.urls[0] === 'string' && product.urls[0].trim() !== '')
            ? product.urls[0] // Usa la URL real si es válida
            : '/images/placeholder.png'; // Usa una imagen de placeholder si no hay URL válida

    // --- Lógica para el texto alternativo (alt) ---
    const altText = product.name || "Producto sin nombre"; // Proporciona un fallback si product.name es undefined

    return (
        <> 
        <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition" 
        onClick={onClick}>
        </div>
        <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>  
            <p className="mt-2 text-blue-700 font-bold text-x1">{product.price}</p>
            <button className="mt-4 w-full"> agregar al carrito </button>
        </div>
        <LoginDialog open={showDialog} onClose={()=>setShowDialog(false)}/>
        </>
    );
};
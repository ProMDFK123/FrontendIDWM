import { Product } from '../../interfaces/Product';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LoginDialog } from './LoginDialog';
import { useState } from 'react';
//import { useCartStore } from '@/stores/CartStore';

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}


export const ProductCard = ({ product, onClick }: ProductCardProps) => {
    //const { addToCart } = useCartStore()

    const { user } = useAuth();
    const [showDialog, setShowDialog] = useState(false);
    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            setShowDialog(true);
            return;
        }
        //addToCart(product.id, 1);
        alert(`Producto ${product.name} agregado al carrito.`);
    }

    const imageUrl =
        (product.urls && Array.isArray(product.urls) && product.urls.length > 0 && typeof product.urls[0] === 'string' && product.urls[0].trim() !== '')
            ? product.urls[0] // Usa la URL real si es válida
            : '/images/placeholder.png'; // Usa una imagen de placeholder si no hay URL válida

    return (
        <>
            <div className='bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition'
                onClick={onClick}>
                <div className='relative w-full h-48 bg-gray-200 flex items-center justify-center'>
                    <Image src="/Producto.jpg" alt={product.name} width={200} height={200} className='object-contain' />
                </div>
                <div className='p-4'>
                    <h3 className='font-semibold text-lg'>{product.name}</h3>
                    <p className='mt-2 text-blue-700 font-bold text-xl'>${product.price}</p>
                    <Button className='mt-4 w-full' onClick={handleAddToCart}>Agregar al Carrito</Button>
                </div>
            </div>

            <LoginDialog open={showDialog} onClose={()=>setShowDialog(false)}/>
        </>

    )
}
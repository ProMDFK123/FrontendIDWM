'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, ShoppingCartIcon, UserIcon, XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useCartStore } from '@/store/CartStore';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {items: cart} = useCartStore();
    const {user} = useAuth();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-blue-800 text-white">
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 py-3'>
                <div className='font-bold text-2xl'>IDWM</div>

                {/*Desktop Menu*/}
                <ul className='hidden md:flex space-x-8 font-medium items-center'>
                    <li><Link href="/">Inicio</Link></li>
                    <li><Link href="/about">Sobre</Link></li>
                    <li><Link href="/services">Servicios</Link></li>
                    <li><Link href="/contact">Contacto</Link></li>

                    {user ? (
                        <li>
                            <Link href="/profile" className='flex items-center hover:bg-blue-400 rounded-full p-2 transition'>
                                <UserIcon className='h-6 w-6' />
                                <span className='ml-2'>{user.firstName}</span>
                            </Link>
                        </li>
                    ) : <Link href="/login">
                            <Button className='bg-blue-500 hover:bg-blue-600 text-white rounded-full'>
                                <UserIcon/> Iniciar Sesión
                            </Button>
                        </Link>
                    }

                    <li>
                       <Link href={'/cart'} className='relative flex items-center hover:bg-blue-400 rounded-full p-2 transition'>
                            <ShoppingCartIcon className='h-6 w-6'/>
                            {
                                totalItems > 0 && (
                                    <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs'>
                                        {totalItems}
                                    </span>
                                )
                            }
                       </Link> 
                    </li>
                </ul>

                {/*Mobile Hamburger*/}
                <div className='md:hidden'>
                    <Button onClick={toggleMenu} className='bg-blue-500 hover:bg-blue-600 text-white rounded-full'>
                        {menuOpen ? <XIcon className='h-6 w-6'/> : <MenuIcon className='h-6 w-6' />}
                    </Button>
                </div>
            </div>

            {/*Mobile Menu*/}
            {menuOpen && (
                <div className='md:hidden felx flex-col items-center bg-black text-whites space-y-4 py-4'>
                    <li><Link href="/" onClick={toggleMenu}>Inicio</Link></li>
                    <li><Link href="/about" onClick={toggleMenu}>Sobre</Link></li>
                    <li><Link href="/services" onClick={toggleMenu}>Servicios</Link></li>
                    <li><Link href="/contact" onClick={toggleMenu}>Contacto</Link></li>
                    {user ? (
                        <li>
                            <Link href="/profile" className='flex items-center hover:bg-blue-400 rounded-full p-2 transition'>
                                <UserIcon className='h-6 w-6' />
                                <span className='ml-2'>{user.firstName}</span>
                            </Link>
                        </li>
                    ) : <Link href="/login">
                            <Button className='bg-blue-500 hover:bg-blue-600 text-white rounded-full'>
                                <UserIcon/> Iniciar Sesión
                            </Button>
                        </Link>
                    }

                    <li>
                       <Link href={'/cart'} className='relative flex items-center hover:bg-blue-400 rounded-full p-2 transition'>
                            <ShoppingCartIcon className='h-6 w-6'/>
                            {
                                totalItems > 0 && (
                                    <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs'>
                                        {totalItems}
                                    </span>
                                )
                            }
                       </Link> 
                    </li>
                </div>
            )}
        </nav>
    )
}
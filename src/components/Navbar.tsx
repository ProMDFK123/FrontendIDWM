'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, UserIcon, XIcon } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <Link href="/login">
                        <Button className='bg-blue-500 hover:bg-blue-600 text-white rounded-full'>
                            <UserIcon/> Iniciar Sesión
                        </Button>
                    </Link>
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
                    <Link href="/login" className='w-full flex items-center justify-center px-7'>
                        <Button className='bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full'>
                            <UserIcon/> Iniciar Sesión
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    )
}
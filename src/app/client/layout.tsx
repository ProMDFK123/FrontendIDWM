'use client';

import { DecodeJWT } from "@/helpers/DecodeJWT";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import ClientPage from "./page";

export default function clientLayout({children}: {children: React.ReactNode}) {
    const {user, status} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!user?.token){
            router.replace('/login');
            return;
        }

        const payload = DecodeJWT(user.token);

        if(!payload || payload.role !== 'User') {
            router.replace('/');
            return;
        }
    }, [user, status, router]);

    if(status === 'checking' || !user) return <div>Cargando...</div>;

    return <ClientPage/>
}
'use client';

import { Sidebar } from "@/components/Sidebar";
import { DecodeJWT } from "@/helpers/DecodeJWT";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminPage from "./page";

export default function AdminLayout({children}: {children: React.ReactNode}) {
    const {user, status} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!user?.token){
            router.replace('/login');
            return;
        }

        const payload = DecodeJWT(user.token);

        if(!payload || payload.role !== 'Admin') {
            router.replace('/');
            return;
        }
    }, [user, status, router]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar/>
            <main className="flex-1 p-8">
                <AdminPage/>
                {children}
            </main>
        </div>
    );
}
"use client";

import { ApiBackend } from "@/clients/axios";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { DecodeJWT } from "@/helpers/DecodeJWT";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { User } from "@/interfaces/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { set } from "zod/v4-mini"; 

const formSchema = z.object({
    email: z.string().email({
        message: "El correo electrónico debe ser válido.",
    }).nonempty({
        message: "El correo electrónico es requerido.",
    }),

    password: z.string().nonempty({
        message: "La contraseña es requerida.",
    }),
});

export const LoginPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [errors, setErrors] = useState<string | null>(null);
    const [errorBool, setErrorBool] = useState<boolean>(false);
    const { auth, user } = useContext(AuthContext);
    const router = useRouter();

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
            console.log("Valores enviados:", values);
            const {data} = await ApiBackend.post<ResponseAPI>('Auth/login', values);

            if(!data.success) {
                console.error("Error en la respuesta del servidor:", data.message);
                setErrors('Error en la respuesta del servidor');
                setErrorBool(true);
                return;
            }
            setErrors(null);
            setErrorBool(false);

            const data_ = data.data as ResponseAPI
            const payload = DecodeJWT(data_.token);
            if(!payload) {
                console.error("Error al decodificar el token: ", data_.token);
                setErrors('Error al decodificar el token');
                setErrorBool(true);
                return;
            }
            const user_: User = {
                email: data_.email,
                lastName: data_.lastName,
                firstName: data_.firstName,
                token: data_.token,
                role: payload.role,
            }

            localStorage.setItem('token', data_.token);

            console.log("Usuario autenticado:", user_);
            auth(user_);
            if(payload.role === 'Admin') {
                router.push('/admin');
            } else if(payload.role === 'User') {
                router.push('/client');
            }
        }
        catch (error: any) {
            let errorMessage = error.response.data.message;
            console.error("Error al enviar el formulario:", errorMessage);
            setErrors(errorMessage);
            setErrorBool(true);
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/*Lado izquierdo*/}
            <div className="md:w-1/2 w-full bg-blue-700 text-white flex flex-col justify-center items-center p-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4n text-center">
                    Bienvenido a <br className="hidden md:block"/> Introducción al Desarrollo Web/Móvil
                </h1>
                <p className="text-base md:text-lg text-justify max-w-md">
                    Evita tareas repetitivas y gana tiempo con automatización.
                    Mejora tu productividad como desarrollador web.
                </p>
                <p className="mt-10 text-xs md:text-sm text-gray-200 text-center">
                    © 2025 - Todos los derechos reservados.
                </p>
                <Button variant={"outline"} className="mt-4 text-blue-600" onClick={() => router.push('/')}>
                    <ArrowLeftIcon/> Volver
                </Button>
            </div>

            {/*Lado derecho*/}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-white py-10">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">Taller Frontend IDWM</h2>
                    <h3 className="text-lg md:text-xl font-medium mb-2 text-center md:text-left">
                        ¡Bienvenido de Vuelta!
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 text-center md:text-left">
                        ¿No tienes cuenta?{' '}
                        <a href="/register" className="text-blue-600 underline">
                            Crea una aquí
                        </a>, es gratis.
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="correo@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {errorBool && (
                                <div className="text-red-500 text-sm mt-2 p-2 bg-red-100 rounded">
                                    {errors}
                                </div>
                            )}

                            <Button type="submit">Iniciar sesión</Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-sm text-center md:text-left">
                        ¿Olvidaste tu contraseña?{' '}
                        <a href="#" className="text-blue-600 underline">
                            Restablecer aquí
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
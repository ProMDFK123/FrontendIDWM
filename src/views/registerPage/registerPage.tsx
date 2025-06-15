
"use client";

import { ApiBackend } from "@/clients/axios";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { User } from "@/interfaces/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation"; 


const formSchema = z.object({
    firstName: z.string()
        .min(1, { message: "El nombre es obligatorio" })
        .max(50, { message: "El nombre no puede tener más de 50 caracteres" }),
    lastName: z.string()
        .min(1, { message: "El apellido es obligatorio" })
        .max(50, { message: "El apellido no puede tener más de 50 caracteres" }),
    email: z.string()
        .email({ message: "El correo electrónico debe ser válido" })
        .max(100, { message: "El correo electrónico no puede tener más de 100 caracteres" }),

    thelephone: z.string()
        .regex(/^\+?\d{9,15}$/, { message: "El teléfono debe ser válido. Incluye +código_país si es internacional." })
        .min(9, { message: "El teléfono debe tener al menos 9 dígitos." }),
    password: z.string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(100, { message: "La contraseña no puede tener más de 100 caracteres" }),
    confirmPassword: z.string()
        .min(1, { message: "Confirma tu contraseña" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export const RegisterPage = () => {
    const [errors, setErrors] = useState<string | null>(null);
    const [errorBool, setErrorBool] = useState<boolean>(false);
    const { auth } = useContext(AuthContext);
    const router = useRouter(); 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            thelephone: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            console.log("Valores enviados para registro:", values);

            const { firstName, lastName, email, thelephone, password, confirmPassword } = values;


            const dataToSend = {
                firstName,
                lastName,
                email,
                thelephone,
                password,
                confirmPassword,
            };

            const { data } = await ApiBackend.post<ResponseAPI>('Auth/register', dataToSend);

            if (!data.success) {
                console.error("Error en la respuesta del servidor:", data.message);
                setErrors(data.message || 'Error en la respuesta del servidor durante el registro');
                setErrorBool(true);
                return;
            }

            setErrors(null);
            setErrorBool(false);

            if (data.data) {
                const user_: User = {
                    email: data.data.email,
                    lastName: data.data.lastName,
                    firstName: data.data.firstName,
                    token: data.data.token,
                }
                auth(user_); 
                router.push('/'); 
            } else {
                
                console.log("Registro exitoso. Redirigiendo a la página de inicio de sesión.");
                setErrors('¡Registro exitoso! Ahora puedes iniciar sesión.');
                setErrorBool(false);
                router.push('/login'); 
            }

        } catch (error: any) {
            let errorMessage = "Ocurrió un error inesperado al registrar.";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            console.error("Error al enviar el formulario de registro:", errorMessage);

            setErrors(errorMessage);
            setErrorBool(true);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Lado izquierdo */}
            <div className="md:w-1/2 w-full bg-blue-700 text-white flex flex-col justify-center items-center p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Únete a nuestra comunidad
                </h1>
                <p className="text-base md:text-lg text-center max-w-md">
                    Regístrate para acceder a todas las funcionalidades y mejorar tu productividad.
                </p>
                <p className="mt-10 text-xs md:text-sm text-gray-200 text-center">
                    &copy; 2025 WebMóvil. Todos los derechos reservados.
                </p>
            </div>

            {/* Lado derecho (el formulario de registro) */}
            <div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-white p-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
                    ¡Crea tu cuenta!
                </h2>
                <p className="mb-4 text-sm text-gray-600 text-center md:text-left">
                    Ingresa tus datos para registrarte.
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
                        {/* Campo: Nombre */}
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu nombre" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Campo: Apellido */}
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu apellido" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Campo: Correo Electrónico */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo Electrónico</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="email@ejemplo.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Campo: Teléfono */}
                        <FormField
                            control={form.control}
                            name="thelephone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="ej. +56912345678" {...field} />
                                    </FormControl>
                                    <FormDescription>Incluye el código de país (ej. +569) si es internacional.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Campo: Contraseña */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormDescription>Debe tener al menos 6 caracteres.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Campo: Confirmar Contraseña */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar Contraseña</FormLabel>
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

                        <Button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Registrarse
                        </Button>
                    </form>
                </Form>

                <p className="mt-4 text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    {/* --- CAMBIO AQUÍ: href a /login --- */}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Inicia sesión aquí
                    </a>
                </p>
            </div>
        </div>
    );
};
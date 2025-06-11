"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Form submitted:", values);
        // Aquí puedes manejar el inicio de sesión, por ejemplo, enviando los datos a una API
    };

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
                        <a href="#" className="text-blue-600 underline">
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
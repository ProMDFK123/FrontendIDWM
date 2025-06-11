"use client"
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import z from 'zod';



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
    telephone: z.string() 
        .regex(/^\d{9}$/, { message: "El teléfono debe tener 9 dígitos" })
        .max(9, { message: "El teléfono no puede tener más de 9 dígitos" }),
    password: z.string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(100, { message: "La contraseña no puede tener más de 100 caracteres"    
    }),
})

const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    // Aquí puedes manejar el envío del formulario, como llamar a una API para registrar al usuario
};

export const RegisterPage = () => {

    const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                firstName: '',
                lastName: '',
                email: '',
                telephone: '',
                password: '',
            },
        });


    return (
        <div className="flex flex-col md:flex-row h-screen">

            {/* Lado izquierdo (similar a tu Login) */}
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
                            name="telephone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="ej. 912345678" {...field} />
                                    </FormControl>
                                    <FormDescription>Ingresa tu número de teléfono de 9 dígitos.</FormDescription>
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
                    <a href="/login" className="text-blue-600 hover:underline">
                        Inicia sesión aquí
                    </a>
                </p>
            </div>
        </div>
    );
};


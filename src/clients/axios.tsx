import axios from 'axios';

const ApiBackend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Permite enviar cookies con las solicitudes
})

export {ApiBackend};
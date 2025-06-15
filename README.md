# Taller IDWM - Frontend
Este repositorio corresponde al Frontend del Taller de la asignatura Introducción al Desarrollo Web/Móvil, el cual se conecta a una API REST desarrollada en ASP.NET Core, simulando un e-commerce basado en arquitectura cliente-servidor.

## 🛠️ Tecnologías
- Next.js 14
- React 18
- Tailwind CSS
- Axios
- JWT para autenticación
- Cloudinary (para manejo de imágenes)
- Zustand (manejo de estado global)
- ESLint & Prettier

## 📦 Instalación
1. Clonar repositorio:
```bash
git clone https://github.com/ProMDFK123/FrontendIDWM.git
```
2. Ingresar a la carpeta
```bash
cd frontend
```
3. Configurar .env.example
```env
NEXT_PUBLIC_API_URL=http://localhost:7164/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<nombre_de_cloudinary>
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=<tu_upload_preset>
JWT_SECRET=<tu_clave_secreta>
```
4. Instalar dependencias
```bash
npm install
```
5. Ejecutar
```bash
npm run dev
```

## 🧪 Datos de Prueba
El backend genera datos falsos automáticamente al iniciarse si la base de datos está vacía, por lo tanto el frontend puede consumir endpoints de prueba desde el primer momento.

## 🎨 Prototipo
Puedes visualizar el prototipo del proyecto en el siguiente enlace:
[🔗 Ver Prototipo en Figma](https://www.figma.com/file/TuEnlaceDeFigmaAquí)
Este prototipo ilustra la estructura visual y funcional del sistema, incluyendo los flujos principales de usuario y el diseño de las interfaces.


## 🌐 Despliegue
Para desplegar en Vercel u otra plataforma similar, asegúrate de configurar las variables de entorno en el panel de configuración del proyecto.

## 🧑‍💻 Autores
Gabriel López - gabriel.lopez@alumnos.ucn.cl - 21.583.391-7  
Vicente Ordenes - vicente.ordenes@alumnos.ucn.cl - 20.941.890-8

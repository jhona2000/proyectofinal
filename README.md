# Proyecto Final - Ricas Donitas

Este es el proyecto final para "Ricas Donitas", una aplicación web construida con Next.js y Firebase.

## Características

- **Catálogo de Productos**: Vista de productos con precios e imágenes.
- **Promociones**: Sección especial para ofertas.
- **Panel de Administración**:
  - Subida de imágenes desde galería (Firebase Storage).
  - Gestión de productos y promociones (Firebase Firestore).
  - Edición y eliminación de productos.
- **Sistema de Likes**: Contador de "Me gusta" en tiempo real sincronizado con Firebase.
- **Diseño Responsivo**: Funciona en móviles y escritorio.

## Requisitos Previos

- Node.js instalado (versión 18 o superior recomendada).
- Un editor de código como Visual Studio Code.

## Instalación y Ejecución

1.  **Descomprimir el archivo**: Extrae el contenido del archivo ZIP en una carpeta.
2.  **Instalar dependencias**:
    Abre una terminal en la carpeta del proyecto y ejecuta:
    \`\`\`bash
    npm install
    \`\`\`
3.  **Ejecutar el servidor de desarrollo**:
    \`\`\`bash
    npm run dev
    \`\`\`
4.  **Abrir en el navegador**:
    Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## Credenciales de Administración

Para acceder al panel de administración (`/admin` o haciendo clic en el candado/login):

- **Email**: `admin@milaencanto.com`
- **Contraseña**: `admin123`

## Configuración de Firebase

El proyecto ya incluye las credenciales de Firebase configuradas en `lib/firebase.ts`. No necesitas configurar nada extra para que funcione la base de datos y la subida de imágenes.

## Estructura del Proyecto

- `/app`: Páginas y rutas de la aplicación (Next.js App Router).
- `/components`: Componentes reutilizables (Header, Tarjetas, Botones).
- `/lib`: Configuraciones y utilidades (Firebase, Autenticación simple).
- `/public`: Imágenes y archivos estáticos.

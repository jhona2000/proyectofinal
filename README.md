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
    Abre una terminal en la carpeta del proyecto y ejecuta (recomendado `pnpm`):
    ```bash
    # Recomendado: pnpm (usa el lockfile del repositorio)
    pnpm install
    # Si no tienes pnpm puedes usar npm:
    # npm install
    ```
3.  **Ejecutar el servidor de desarrollo**:
    ```bash
    pnpm dev
    # o con npm:
    # npm run dev
    ```
4.  **Abrir en el navegador**:
    Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## Credenciales de Administración

Para acceder al panel de administración (`/admin` o haciendo clic en el candado/login):

- **Email**: `admin@milaencanto.com`
- **Contraseña**: `admin123`

## Configuración de Firebase

La configuración pública de Firebase (API key, projectId, authDomain, etc.) se puede proporcionar mediante variables de entorno públicas.

- Copia el archivo de ejemplo `.env.local.example` a `.env.local` y **no** lo comitees.
- Variables disponibles: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_APP_ID`, `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`.

Ejemplo rápido (PowerShell):
```powershell
Copy-Item .env.local.example .env.local
notepad .env.local
# (opcional) para forzar emuladores desde el cliente:
# agrega: NEXT_PUBLIC_FIREBASE_EMULATOR=true
```

Si vas a desarrollar sin facturación o quieres testear uploads localmente, usa el Firebase Emulator Suite:

```powershell
# Inicia los emuladores (auth, firestore y storage):
npx firebase emulators:start --only auth,firestore,storage

# En otra terminal, levanta la app:
pnpm dev
```

Si usas emuladores y tu app no corre desde `localhost` (por ejemplo accedes por IP local como `http://192.168.x.x:3000`), añade `NEXT_PUBLIC_FIREBASE_EMULATOR=true` en tu `.env.local` para forzar la conexión a los emuladores desde el cliente.

Si experimentas errores de tipo `auth/network-request-failed`, sigue estos pasos de diagnóstico:

- Abre DevTools → pestaña Network y reproduce el fallo. Copia la petición que falla (URL completa, código de estado, response body y cabeceras).
- Prueba en una ventana de incógnito para descartar extensiones que bloqueen requests.
- Asegúrate de que el emulador de Auth está corriendo si la app intenta conectarse a `localhost:9099`.
- Verifica que `firebaseConfig` (o las `NEXT_PUBLIC_...` variables) correspondan al proyecto correcto en la consola de Firebase.

Si quieres, copia aquí el request fallido y lo reviso contigo.

## Estructura del Proyecto

- `/app`: Páginas y rutas de la aplicación (Next.js App Router).
- `/components`: Componentes reutilizables (Header, Tarjetas, Botones).
- `/lib`: Configuraciones y utilidades (Firebase, Autenticación simple).
- `/public`: Imágenes y archivos estáticos.

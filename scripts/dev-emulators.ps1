# Script PowerShell para Windows que abre los Emuladores de Firebase en una nueva ventana
# y luego arranca la app Next.js en la terminal actual.

# Abre una nueva ventana de PowerShell y ejecuta los emuladores (permanece abierta)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npx firebase emulators:start --only auth,firestore,storage"

# Pequeña espera para que el emulador empiece a mostrar logs (opcional)
Start-Sleep -Seconds 2

# Ejecuta la app en la terminal actual
pnpm dev

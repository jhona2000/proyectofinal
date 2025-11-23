<#
PowerShell helper para subir el contenido de un JSON de clave de cuenta de servicio
como un secreto de repositorio usando la CLI `gh` (GitHub CLI).

Requisitos:
- Tener instalado y autenticado `gh` (https://cli.github.com/)
- Estar en la carpeta del repositorio local o pasar el path al archivo JSON
#>
param(
  [string]$ServiceAccountFile = ".\serviceAccountKey.json",
  [string]$SecretName = "FIREBASE_SERVICE_ACCOUNT"
)

if (-Not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Error "No se encontró 'gh'. Instala GitHub CLI y autentícate con 'gh auth login'."
  exit 1
}

if (-Not (Test-Path $ServiceAccountFile)) {
  Write-Error "Archivo $ServiceAccountFile no encontrado. Crea/coloca la clave JSON primero."
  exit 1
}

$body = Get-Content -Raw $ServiceAccountFile
gh secret set $SecretName --body "$body"

if ($LASTEXITCODE -eq 0) {
  Write-Host "Se subió el secreto '$SecretName' correctamente."
} else {
  Write-Error "Error subiendo el secreto. Revisa que 'gh' esté autenticado y que tengas permisos en el repo."
}

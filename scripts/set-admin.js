// scripts/set-admin.js
// Uso:
//   node scripts/set-admin.js <email> <ruta_service_account.json>
// O usando variable de entorno SERVICE_ACCOUNT:
//   $env:SERVICE_ACCOUNT = "C:\path\to\serviceAccountKey.json"
//   node scripts/set-admin.js <email>
// Para quitar el rol admin usar tercer argumento "--remove":
//   node scripts/set-admin.js <email> <serviceAccount> --remove

const admin = require('firebase-admin')
const path = require('path')

async function main() {
  const args = process.argv.slice(2)
  if (args.length < 1) {
    console.error('Uso: node scripts/set-admin.js <email> [ruta_service_account.json] [--remove]')
    process.exit(1)
  }

  const email = args[0]
  const serviceAccountPath = args[1] || process.env.SERVICE_ACCOUNT
  const removeFlag = args.includes('--remove')

  if (!serviceAccountPath) {
    console.error('Error: ruta al service account JSON no proporcionada. Pasa la ruta como segundo argumento o establece la variable de entorno SERVICE_ACCOUNT.')
    process.exit(1)
  }

  let serviceAccount
  try {
    serviceAccount = require(path.resolve(serviceAccountPath))
  } catch (err) {
    console.error('No se pudo leer el JSON de la cuenta de servicio en:', serviceAccountPath)
    console.error(err)
    process.exit(1)
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  } catch (err) {
    // initializeApp puede lanzar si ya está inicializado; ignorar si es el caso
    if (!/already exists/u.test(String(err))) {
      console.error('Error inicializando Firebase Admin:', err)
      process.exit(1)
    }
  }

  try {
    const user = await admin.auth().getUserByEmail(email)
    console.log('UID encontrado:', user.uid)

    if (removeFlag) {
      await admin.auth().setCustomUserClaims(user.uid, null)
      console.log(`Se eliminó el claim 'admin' para ${email}`)
    } else {
      await admin.auth().setCustomUserClaims(user.uid, { admin: true })
      console.log(`Se asignó { admin: true } a ${email}`)
    }

    process.exit(0)
  } catch (err) {
    console.error('Error al asignar/quitar rol:', err)
    process.exit(1)
  }
}

main()

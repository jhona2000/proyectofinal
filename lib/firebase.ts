import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"

const firebaseConfig = {
  apiKey: (process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string) || "AIzaSyAsNUow5Fm-HtBD1teD2ndcFNQao5DJ79I",
  authDomain: (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string) || "proyectofinal-b7b8c.firebaseapp.com",
  projectId: (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string) || "proyectofinal-b7b8c",
  // Usamos el valor que compartiste como opción por defecto; es seguro exponer estos valores públicos
  storageBucket: (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string) || "proyectofinal-b7b8c.firebasestorage.app",
  messagingSenderId: (process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string) || "645343933050",
  appId: (process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string) || "1:645343933050:web:3a61376b560a069c0c81c3",
  measurementId: (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string) || "G-ER31Q3XMCY"
}

let app: any
let auth: any
let db: any
let storage: any

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)

  // Conectar a emuladores cuando estemos en localhost (desarrollo) o si
  // la variable de entorno NEXT_PUBLIC_FIREBASE_EMULATOR se establece a 'true'.
  const isBrowser = typeof window !== "undefined"
  const hostname = isBrowser ? window.location.hostname : undefined
  const useEmulatorEnv = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === 'true'

  if (isBrowser && (hostname === "localhost" || hostname === "127.0.0.1" || useEmulatorEnv)) {
    try {
      connectStorageEmulator(storage, "localhost", 9199)
      connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true })
      // Firestore emulator (puerto por defecto 8080)
      connectFirestoreEmulator(db, "localhost", 8080)
      // consola informativa para diagnóstico
      console.info('Firebase: conectado a emuladores -> storage@9199, auth@9099, firestore@8080')
      console.info('Firebase config usada (sólo para diagnóstico):', {
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain,
        storageBucket: firebaseConfig.storageBucket
      })
    } catch (e) {
      console.warn('Firebase: no se pudo conectar a emuladores:', e)
    }
  }
} catch (error) {
  console.error("Firebase initialization error:", error)
}

export { auth, db, storage, app }

import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAsNUow5Fm-HtBD1teD2ndcFNQao5DJ79I",
  authDomain: "proyectofinal-b7b8c.firebaseapp.com",
  projectId: "proyectofinal-b7b8c",
  storageBucket: "proyectofinal-b7b8c.firebasestorage.app",
  messagingSenderId: "645343933050",
  appId: "1:645343933050:web:3a61376b560a069c0c81c3",
  measurementId: "G-ER31Q3XMCY"
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

  // Conectar a emuladores cuando estemos en localhost (desarrollo)
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    try {
      connectStorageEmulator(storage, "localhost", 9199)
      connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true })
      // Firestore emulator (puerto por defecto 8080)
      connectFirestoreEmulator(db, "localhost", 8080)
      // consola informativa
      // console.log('Conectado a emuladores: storage@9199, auth@9099')
    } catch (e) {
      console.warn('No se pudo conectar a emuladores:', e)
    }
  }
} catch (error) {
  console.error("Firebase initialization error:", error)
}

export { auth, db, storage, app }

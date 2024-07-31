import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

// Configurar a persistência da autenticação
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Autenticação configurada para persistência local')
  })
  .catch((error) => {
    console.error('Erro ao configurar a persistência da autenticação:', error)
  })

export { db, storage, auth }

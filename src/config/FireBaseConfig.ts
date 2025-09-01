import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

interface FirebaseConfig {
	apiKey: string
	authDomain: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string
}

const firebaseConfig: FirebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_APIKEY ?? '',
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN ?? '',
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? '',
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ?? '',
	appId: process.env.NEXT_PUBLIC_APP_ID ?? '',
}

const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

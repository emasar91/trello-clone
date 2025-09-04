import { FirebaseOptions, getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
	apiKey: process.env.NEXT_PUBLIC_APIKEY ?? '',
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN ?? '',
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? '',
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ?? '',
	appId: process.env.NEXT_PUBLIC_APP_ID ?? '',
}

const firebaseApp =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const firebaseAuth = getAuth(firebaseApp)
export const googleProvider = new GoogleAuthProvider()

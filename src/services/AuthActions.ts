// src/services/AuthActions.ts
import { firebaseAuth, googleProvider } from '@/config/FireBaseConfig'
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'

export const signInGoogle = async (locale: string) => {
	const result = await signInWithPopup(firebaseAuth, googleProvider)
	const token = await result.user.getIdToken()

	await fetch('/api/session', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token, locale, user: result.user }),
	})

	return result.user
}

export const signInEmail = async (
	email: string,
	password: string,
	locale: string
) => {
	const result = await signInWithEmailAndPassword(firebaseAuth, email, password)
	const token = await result.user.getIdToken()

	await fetch('/api/session', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token, locale, user: result.user }),
	})

	return result.user
}

export const logout = async (locale: string) => {
	await signOut(firebaseAuth)
	await fetch('/api/session', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ locale }),
	})
}

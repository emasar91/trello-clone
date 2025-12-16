// src/services/AuthActions.ts
import { firebaseAuth, googleProvider } from '@/config/FireBaseConfig'
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'

/**
 * Signs in with Google and sets the session cookie.
 * @param {string} locale The locale to sign in with.
 * @returns {Promise<User>} The user object.
 */
export const signInGoogle = async (locale: string) => {
	const result = await signInWithPopup(firebaseAuth, googleProvider)
	const token = await result.user.getIdToken()
	// 2️⃣ Guardar Session Cookie
	await fetch('/api/session', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token, locale, user: result.user }),
	})

	return result.user
}

/**
 * Signs in with email and password, and sets the session cookie.
 * @param {string} email The email to sign in with.
 * @param {string} password The password to sign in with.
 * @param {string} locale The locale to sign in with.
 * @returns {Promise<User>} The user object.
 */
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

/**
 * Logs out the user and deletes the session cookie for the given locale.
 *
 * @param {string} locale The locale to delete the session cookie for.
 *
 * @returns {Promise<void>} A promise that resolves when the user has been logged out.
 */
export const logout = async (locale: string) => {
	await signOut(firebaseAuth)
	await fetch('/api/session', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ locale }),
	})
}

// lib/auth.ts
import { cookies } from 'next/headers'
import { getDB } from '@/helpers/getDB'
import { COOKIE_NAME } from '@/middleware' // si lo tenés definido
import admin from '@/config/firebaseAdmin'
import { IUser } from '@/types/user'

export async function getUserFromRequest(): Promise<IUser> {
	// cookies() sólo funciona en entorno server (route handlers, server components)
	const cookieStore = cookies()
	const cookie = (await cookieStore).get(COOKIE_NAME ?? 'authToken') // fallback a 'authToken'
	const token = cookie?.value
	if (!token) {
		throw new Error('No autorizado: token faltante')
	}

	let decoded: admin.auth.DecodedIdToken
	try {
		decoded = await admin.auth().verifyIdToken(token)
	} catch (err) {
		console.error('Error verificando ID token:', err)
		throw new Error('Token inválido')
	}

	const db = await getDB()
	const usersCollection = db.collection('users')
	const user = await usersCollection.findOne({ uid: decoded.uid })

	if (!user) {
		throw new Error('Usuario no encontrado')
	}

	return { ...user, uid: user._id.toString() } as IUser
}

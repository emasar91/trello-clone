import { cookies } from 'next/headers'
import { getDB } from '@/helpers/getDB'
import admin from '@/config/firebaseAdmin'
import { IUser } from '@/types/user'
import { COOKIE_NAME } from '@/middleware'

/**
 * Devuelve el usuario asociado a la solicitud a partir de la cookie de sesi n
 * @returns {Promise<IUser | null>} El usuario asociado a la solicitud o null si no se encuentra
 */
export async function getUserFromRequest() {
	try {
		const cookieStore = cookies()
		// 1️⃣ Obtener la cookie de sesión
		const sessionCookie = (await cookieStore).get(COOKIE_NAME ?? 'authToken')
		// 2️⃣ Obtener el token
		const token = sessionCookie?.value
		// 3️⃣ Verificar el token
		if (!token) return null
		// 4️⃣ Verificar la sesión
		const decoded = await admin.auth().verifySessionCookie(token, true)

		const db = await getDB()
		// 5️⃣ Buscar el usuario
		const user = await db.collection('users').findOne({ uid: decoded.uid })
		if (!user) return null
		// 6️⃣ Retornar el usuario
		return { ...user, uid: user._id.toString() } as IUser
	} catch (error) {
		// 7️⃣ Retornar el error
		console.error('Error verificando SESSION COOKIE:', error)
		return null
	}
}

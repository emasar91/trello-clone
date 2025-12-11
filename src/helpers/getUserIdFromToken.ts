import { cookies } from 'next/headers'
import { getDB } from '@/helpers/getDB'
import admin from '@/config/firebaseAdmin'
import { IUser } from '@/types/user'
import { COOKIE_NAME } from '@/middleware'

export async function getUserFromRequest() {
	try {
		const cookieStore = cookies()
		const sessionCookie = (await cookieStore).get(COOKIE_NAME ?? 'authToken')
		const token = sessionCookie?.value

		if (!token) return null

		// 🔥 Verificar Session Cookie (NO el ID token)
		const decoded = await admin.auth().verifySessionCookie(token, true)

		const db = await getDB()
		const user = await db.collection('users').findOne({ uid: decoded.uid })

		if (!user) return null

		return { ...user, uid: user._id.toString() } as IUser
	} catch (error) {
		console.error('Error verificando SESSION COOKIE:', error)
		return null
	}
}

import { cookies } from 'next/headers'
import { getDB } from '@/helpers/getDB'
import admin from '@/config/firebaseAdmin'
import { IUser } from '@/types/user'
import { COOKIE_NAME } from '@/middleware'

export async function getUserFromRequest() {
	try {
		const cookieStore = cookies()
		const cookie = (await cookieStore).get(COOKIE_NAME ?? 'authToken')
		const token = cookie?.value

		if (!token) return null

		const decoded = await admin.auth().verifyIdToken(token)
		const db = await getDB()
		const user = await db.collection('users').findOne({ uid: decoded.uid })

		if (!user) return null

		return { ...user, uid: user._id.toString() } as IUser
	} catch (err: unknown) {
		const error = err as Error
		console.error('Error verificando ID token:', error)
		return null
	}
}

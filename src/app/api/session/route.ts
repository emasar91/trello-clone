import { getDB } from '@/helpers/getDB'
import { COOKIE_NAME } from '@/middleware'
import { NextResponse } from 'next/server'
import admin from '@/config/firebaseAdmin'

/**
 * Crea una sesi n con un token de autenticaci n de Firebase
 * y redirige al usuario a la p gina de inicio de la app
 * con el idioma seleccionado.
 * @param {Request} req - La solicitud HTTP
 * @returns {NextResponse} La respuesta HTTP con la cookie de sesi n
 */
export async function POST(req: Request) {
	try {
		console.log('🔥 Firebase Admin Apps:', admin.apps.length)

		const { token, locale, user } = await req.json()
		const baseUrl = new URL(req.url).origin
		const redirectUrl = `${baseUrl}/${locale}/u`
		// 1️⃣ Crear Session Cookie
		const expiresIn = 1000 * 60 * 60 * 24 * 5 // 5 días

		const sessionCookie = await admin
			.auth()
			.createSessionCookie(token, { expiresIn })

		await admin.auth().verifyIdToken(token)
		console.log('✅ Token Firebase válido')

		const db = await getDB()
		console.log('🚀 ~ POST ~ db:', db)
		const usersCollection = db.collection('users')
		const existingUser = await usersCollection.findOne({ uid: user.uid })
		// 2️⃣ Guardar user en DB si no existe
		if (!existingUser) {
			await usersCollection.insertOne({
				uid: user.uid,
				username: user.displayName || user.email.split('@')[0],
				email: user.email,
				photoURL: user.photoURL || null,
				workspaces: [],
				role: 'user',
				fecha_creacion: new Date(),
				lastSeenAt: null,
			})
		}
		// 3️⃣ Setear cookie HTTPOnly con el Session Cookie
		const res = NextResponse.redirect(redirectUrl)
		res.cookies.set({
			name: COOKIE_NAME,
			value: sessionCookie,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: expiresIn / 1000,
		})
		return res
	} catch (err: unknown) {
		const error = err as Error
		console.error('SESSION ERROR:', error)
		console.log('SESSION ERROR:', error)
		return new NextResponse(error.message, { status: 500 })
	}
}

/**
 * Elimina la cookie de sesión y redirige a la raíz
 * original de la aplicación.
 * @param {Request} req - La petición
 * @returns {NextResponse} - La respuesta
 */
export async function DELETE(req: Request) {
	const { locale } = await req.json()
	const baseUrl = new URL(req.url).origin
	const redirectUrl = `${baseUrl}/${locale ?? 'es'}`
	// 1️⃣ Eliminar cookie de sesión
	const res = NextResponse.redirect(redirectUrl)
	res.cookies.set({
		name: COOKIE_NAME,
		value: '',
		httpOnly: true,
		path: '/',
		maxAge: 0,
	})

	return res
}

import { getDB } from '@/helpers/getDB'
import { COOKIE_NAME } from '@/middleware'
import { NextResponse } from 'next/server'
import admin from '@/config/firebaseAdmin'

export async function POST(req: Request) {
	try {
		const { token, locale, user } = await req.json()
		const baseUrl = new URL(req.url).origin
		const redirectUrl = `${baseUrl}/${locale}/u`

		// --------------------------
		// 🔥 Crear Session Cookie
		// --------------------------
		const expiresIn = 1000 * 60 * 60 * 24 * 5 // 5 días

		const sessionCookie = await admin
			.auth()
			.createSessionCookie(token, { expiresIn })

		// --------------------------
		// 🔥 Guardar user en DB si no existe
		// --------------------------
		const db = await getDB()
		const usersCollection = db.collection('users')

		const existingUser = await usersCollection.findOne({ uid: user.uid })

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

		// ----------------------------------
		// 🔥 Setear cookie HTTPOnly con el Session Cookie
		// ----------------------------------
		const res = NextResponse.redirect(redirectUrl)
		res.cookies.set({
			name: COOKIE_NAME,
			value: sessionCookie,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: expiresIn / 1000, // en segundos
		})

		return res
	} catch (error) {
		console.error('SESSION ERROR:', error)
		return new NextResponse('Error en session', { status: 500 })
	}
}

export async function DELETE(req: Request) {
	const { locale } = await req.json()
	const baseUrl = new URL(req.url).origin
	const redirectUrl = `${baseUrl}/${locale ?? 'es'}`

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

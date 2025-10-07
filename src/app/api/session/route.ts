import { getDB } from '@/helpers/getDB'
import { COOKIE_NAME } from '@/middleware'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { token, locale, user } = await req.json()
		const baseUrl = new URL(req.url).origin
		const redirectUrl = `${baseUrl}/${locale}/u`

		// Conectar a Mongo y obtener la colección
		const db = await getDB()
		const usersCollection = db.collection('users')

		// Chequear si ya existe
		const existingUser = await usersCollection.findOne({ uid: user.uid })

		if (!existingUser) {
			await usersCollection.insertOne({
				uid: user.uid,
				username: user.displayName || user.email.split('@')[0], // si tenés username
				email: user.email,
				photoURL: user.photoURL || null,
				workspaces: [], // array vacío inicial
				role: 'user', // default
				fecha_creacion: new Date(), // coincide con schema
				lastSeenAt: null, // opcional
			})
		}

		// Crear cookie y redirigir
		const res = NextResponse.redirect(redirectUrl)
		res.cookies.set({
			name: COOKIE_NAME,
			value: token,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: 60 * 60 * 24, // 1 día
		})

		return res
	} catch (error) {
		console.error(error)
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

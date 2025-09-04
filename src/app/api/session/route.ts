import { COOKIE_NAME } from '@/middleware'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const { token, locale } = await req.json()
	const baseUrl = new URL(req.url).origin
	const redirectUrl = `${baseUrl}/${locale}/appTrello`

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

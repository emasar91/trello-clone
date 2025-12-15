import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'
import { searchUserCards } from '@/helpers/searchUserCard'

export async function GET(request: Request) {
	const user = await getUserFromRequest()
	if (!user) {
		return NextResponse.json({ message: 'TOKEN_INVALID' }, { status: 401 })
	}

	const { searchParams } = new URL(request.url)
	const q = searchParams.get('q')

	if (!q || !q.trim()) {
		return NextResponse.json([], { status: 200 })
	}

	// 🔑 USAR ObjectId
	const results = await searchUserCards(user._id, q.trim())

	return NextResponse.json(results)
}

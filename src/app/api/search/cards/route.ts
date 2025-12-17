import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'
import { searchUserCards } from '@/helpers/searchUserCard'

/**
 * Busca todas las tarjetas del usuario autenticado que contengan un texto determinado
 * en su t tulo, descripci n o comentarios.
 * @param {string} q texto a buscar
 * @returns {Promise<NextResponse>} Array de resultados de la b squeda.
 */
export async function GET(request: Request) {
	const user = await getUserFromRequest()
	// 1️⃣ Validar usuario autenticado
	if (!user) {
		return NextResponse.json({ message: 'TOKEN_INVALID' }, { status: 401 })
	}
	// 2️⃣ Validar query param
	const { searchParams } = new URL(request.url)
	const q = searchParams.get('q')
	// 3️⃣ Si no viene query param, devolver array vacío
	if (!q || !q.trim()) {
		return NextResponse.json([], { status: 200 })
	}
	// 4️⃣ Buscar tarjetas
	const results = await searchUserCards(user._id, q.trim())
	// 5️⃣ Devolver resultados
	return NextResponse.json(results)
}

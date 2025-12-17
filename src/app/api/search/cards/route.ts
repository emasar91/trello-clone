import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'
import { searchUserCards } from '@/helpers/searchUserCard'

/**
 * GET /api/search/cards?q={string}
 * Busca todas las tarjetas del usuario autenticado que contengan un texto determinado
 * en su t tulo, descripci n o comentarios.
 * Devuelve un array de objetos con la siguiente estructura:
 * {
 *   cardId: string,
 *   cardTitle: string,
 *   matchSource: 'title' | 'description' | 'comment',
 *   snippet: string,
 *   commentAuthor?: string,
 *   column: {
 *     id: string,
 *     name: string,
 *   },
 *   board: {
 *     id: string,
 *     name: string,
 *   },
 *   workspace: {
 *     id: string,
 *     name: string,
 *   },
 *   id: string,
 *   name: string,
 * }
 * @param {string} q texto a buscar
 * @returns {Promise<NextResponse>} - Array de resultados de la b squeda.
 */
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
	const results = await searchUserCards(user._id, q.trim())

	return NextResponse.json(results)
}

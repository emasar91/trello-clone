import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { ICardComment } from '@/types/card'

function getSnippet(text: string, query: string, radius = 5) {
	if (!text || !query) return ''

	const lowerText = text.toLowerCase()
	const lowerQuery = query.toLowerCase()

	const index = lowerText.indexOf(lowerQuery)
	if (index === -1) return ''

	const start = Math.max(0, index - radius)
	const end = Math.min(text.length, index + lowerQuery.length + radius)

	const snippet = text.slice(start, end)

	return `${start > 0 ? '…' : ''}${snippet}${end < text.length ? '…' : ''}`
}

/**
 * Busca todos los tableros del usuario que contengan un texto determinado
 * en su titulo, descripción o comentarios.
 * @param {ObjectId} userId - ID del usuario.
 * @param {string} query - Texto a buscar.
 * @returns {Promise<Array<{...SearchCardResult}>>} - Array de resultados de la búsqueda.
 */
export async function searchUserCards(userId: ObjectId, query: string) {
	const db = await getDB()
	const regex = new RegExp(query, 'i')

	// 1️⃣ Buscar las tarjetas
	const cards = await db
		.collection('cards')
		.aggregate([
			// 2️⃣ Board
			{
				$lookup: {
					from: 'boards',
					localField: 'boardId',
					foreignField: '_id',
					as: 'board',
				},
			},
			{ $unwind: '$board' },

			// 3️⃣ SOLO datos del usuario
			{
				$match: {
					'board.userId': userId,
				},
			},

			// 4️⃣ Buscar texto
			{
				$match: {
					$or: [
						{ title: regex },
						{ description: regex },
						{ 'comments.text': regex },
					],
				},
			},

			// 5️⃣ Column
			{
				$lookup: {
					from: 'columns',
					localField: 'columnId',
					foreignField: '_id',
					as: 'column',
				},
			},
			{ $unwind: '$column' },

			// 6️⃣ Workspace
			{
				$lookup: {
					from: 'workspaces',
					localField: 'board.workspaceId',
					foreignField: '_id',
					as: 'workspace',
				},
			},
			{ $unwind: '$workspace' },
		])
		.toArray()

	// 7️⃣ Retornar las tarjetas
	return cards.map((card) => {
		let matchSource: 'title' | 'description' | 'comment'
		let snippet = ''
		let commentAuthor = ''

		const titleMatch = regex.test(card.title)
		const descriptionMatch = regex.test(card.description || '')
		const commentMatch = card.comments?.find((c: ICardComment) =>
			regex.test(c.text)
		)

		// 8️⃣ Retornar si matcheo con el titulo, descripcion o comentario
		if (titleMatch) {
			matchSource = 'title'
		} else if (descriptionMatch) {
			matchSource = 'description'
			snippet = getSnippet(card.description, query)
		} else if (commentMatch) {
			matchSource = 'comment'
			snippet = getSnippet(commentMatch.text, query)
			commentAuthor = commentMatch.authorName
		} else {
			matchSource = 'title'
		}

		// 9️⃣ Retornar los resultados
		return {
			cardId: card._id.toString(),
			cardTitle: card.title,
			matchSource,
			snippet,
			commentAuthor,
			column: {
				id: card.column._id.toString(),
				name: card.column.name,
			},
			board: {
				id: card.board._id.toString(),
				name: card.board.name,
			},
			workspace: {
				id: card.workspace._id.toString(),
				name: card.workspace.name,
			},
		}
	})
}

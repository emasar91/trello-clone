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
 * }
 * @param {ObjectId} userId - ID del usuario.
 * @param {string} query - Texto a buscar.
 * @returns {Promise<Array<{...SearchCardResult}>>} - Array de resultados de la b squeda.
 */
export async function searchUserCards(userId: ObjectId, query: string) {
	const db = await getDB()
	const regex = new RegExp(query, 'i')

	const cards = await db
		.collection('cards')
		.aggregate([
			// 1️⃣ Board
			{
				$lookup: {
					from: 'boards',
					localField: 'boardId',
					foreignField: '_id',
					as: 'board',
				},
			},
			{ $unwind: '$board' },

			// 2️⃣ SOLO datos del usuario
			{
				$match: {
					'board.userId': userId,
				},
			},

			// 3️⃣ Buscar texto
			{
				$match: {
					$or: [
						{ title: regex },
						{ description: regex },
						{ 'comments.text': regex },
					],
				},
			},

			// 4️⃣ Column
			{
				$lookup: {
					from: 'columns',
					localField: 'columnId',
					foreignField: '_id',
					as: 'column',
				},
			},
			{ $unwind: '$column' },

			// 5️⃣ Workspace
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

	return cards.map((card) => {
		let matchSource: 'title' | 'description' | 'comment'
		let snippet = ''
		let commentAuthor = ''

		const titleMatch = regex.test(card.title)
		const descriptionMatch = regex.test(card.description || '')
		const commentMatch = card.comments?.find((c: ICardComment) =>
			regex.test(c.text)
		)

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

import { NextResponse } from 'next/server'
import { getCardsByColumn } from '@/helpers/getCardsByColumn'
import { createCard } from '@/helpers/createCardInColumn'
import { updateCard } from '@/helpers/updateCard'
import { updateCardsOrder } from '@/helpers/updateCardsOrder'
import type { ICard } from '@/types/card'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'

/**
 * Obtiene todas las tarjetas de una columna.
 * @example /api/cards?columnId=123
 * @returns {Promise<NextResponse>} - Promesa que se resuelve con las tarjetas de la columna.
 */
export async function GET(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
		const { searchParams } = new URL(req.url)
		const columnId = searchParams.get('columnId')
		// 2️⃣ Validar columnId
		if (!columnId) {
			return NextResponse.json(
				{ error: 'columnId es requerido' },
				{ status: 400 }
			)
		}
		// 3️⃣ Obtener tarjetas
		const cards = await getCardsByColumn(columnId)
		// 4️⃣ Devolver tarjetas
		return NextResponse.json({ cards }, { status: 200 })
	} catch (err) {
		console.error('Error al obtener las tarjetas:', err)
		return NextResponse.json(
			{ error: 'Error al obtener las tarjetas' },
			{ status: 500 }
		)
	}
}

/**
 * Crea una nueva tarjeta en una columna.
 * @param {Request} req - Request que contiene el body con los datos de la tarjeta.
 * @returns {Promise<NextResponse>} - Promesa que se resuelve con la tarjeta creada.
 */
export async function POST(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
		// 2️⃣ Obtener body
		const body = await req.json()
		// 3️⃣ Crear tarjeta
		const card = await createCard(body)
		// 4️⃣ Devolver tarjeta
		return NextResponse.json({ card }, { status: 201 })
	} catch (err) {
		console.error('Error al crear tarjeta:', err)
		return NextResponse.json(
			{ error: 'Error al crear tarjeta' },
			{ status: 500 }
		)
	}
}

/**
 * Actualiza una o varias tarjetas en un board.
 * @param {Request} req - Request que contiene el body con los datos de las tarjetas.
 * @returns {Promise<NextResponse>} - Promesa que se resuelve con las tarjetas actualizadas.
 * @example /api/cards?boardId=123&columnId=456
 */
export async function PUT(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
		// 2️⃣ Obtener body
		const body = await req.json()
		// 3️⃣ Si es ARRAY → actualizar orden
		if (Array.isArray(body)) {
			const result = await updateCardsOrder(body)
			return NextResponse.json(
				{ success: true, modified: result?.modifiedCount ?? 0 },
				{ status: 200 }
			)
		}
		// 4️⃣ Si NO es array → actualizar 1 tarjeta
		const {
			cardId,
			boardId,
			columnId,
			title,
			description,
			priorityColor,
			comments,
			order,
		} = body

		// 5️⃣ Validar campos
		if (!cardId || !boardId || !columnId)
			return NextResponse.json(
				{ error: 'Faltan campos obligatorios' },
				{ status: 400 }
			)
		// 6️⃣ Preparar campos para actualizar
		const dataToUpdate: Partial<ICard> = {}
		if (title !== undefined) dataToUpdate.title = title
		if (description !== undefined) dataToUpdate.description = description
		if (priorityColor !== undefined) dataToUpdate.priorityColor = priorityColor
		if (comments !== undefined) dataToUpdate.comments = comments
		if (order !== undefined) dataToUpdate.order = order

		// 7️⃣ Actualizar tarjeta
		const updatedCard = await updateCard({
			_id: cardId,
			boardId,
			columnId,
			...dataToUpdate,
		})
		// 8️⃣ Devolver tarjeta actualizada
		return NextResponse.json({ card: updatedCard }, { status: 200 })
	} catch (err) {
		console.error('Error en PUT:', err)
		return NextResponse.json(
			{ message: 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

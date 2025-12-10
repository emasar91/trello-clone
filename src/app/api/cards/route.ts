import { NextResponse } from 'next/server'
import { getCardsByColumn } from '@/helpers/getCardsByColumn'
import { createCard } from '@/helpers/createCardInColumn'
import { updateCard } from '@/helpers/updateCard'
import { updateCardsOrder } from '@/helpers/updateCardsOrder'
import type { ICard } from '@/types/card'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'

/**
 * GET /api/cards?columnId=xxxxx
 * Retorna todas las tarjetas de una columna
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

		if (!columnId) {
			return NextResponse.json(
				{ error: 'columnId es requerido' },
				{ status: 400 }
			)
		}

		const cards = await getCardsByColumn(columnId)
		return NextResponse.json({ cards }, { status: 200 })
	} catch (err) {
		console.error('Error al obtener las tarjetas:', err)
		return NextResponse.json(
			{ error: 'Error al obtener las tarjetas' },
			{ status: 500 }
		)
	}
}

// app/api/cards/route.ts

export async function POST(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}

		const body = await req.json()
		const card = await createCard(body)

		return NextResponse.json({ card }, { status: 201 })
	} catch (err) {
		console.error('Error al crear tarjeta:', err)
		return NextResponse.json(
			{ error: 'Error al crear tarjeta' },
			{ status: 500 }
		)
	}
}

// app/api/cards/route.ts

export async function PUT(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
		const body = await req.json()

		// 🧠 MODO MASIVO (una sola llamada)
		if (Array.isArray(body)) {
			const result = await updateCardsOrder(body)
			return NextResponse.json(
				{ success: true, modified: result?.modifiedCount ?? 0 },
				{ status: 200 }
			)
		}

		// 🧩 MODO NORMAL – 1 CARD
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

		if (!cardId || !boardId || !columnId)
			return NextResponse.json(
				{ error: 'Faltan campos obligatorios' },
				{ status: 400 }
			)

		const dataToUpdate: Partial<ICard> = {}
		if (title !== undefined) dataToUpdate.title = title
		if (description !== undefined) dataToUpdate.description = description
		if (priorityColor !== undefined) dataToUpdate.priorityColor = priorityColor
		if (comments !== undefined) dataToUpdate.comments = comments
		if (order !== undefined) dataToUpdate.order = order

		const updatedCard = await updateCard({
			_id: cardId,
			boardId,
			columnId,
			...dataToUpdate,
		})

		return NextResponse.json({ card: updatedCard }, { status: 200 })
	} catch (err) {
		console.error('Error en PUT:', err)
		return NextResponse.json(
			{ message: 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

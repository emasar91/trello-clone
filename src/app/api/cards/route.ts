import { NextResponse } from 'next/server'
import { getCardsByColumn } from '@/helpers/getCardsByColumn'
import { createCard } from '@/helpers/createCardInColumn'
import { updateCard } from '@/helpers/updateCard'
import { ICard, ICardComment } from '@/types/card'

/**
 * GET /api/cards?columnId=xxxxx
 * Retorna todas las tarjetas de una columna
 */
export async function GET(req: Request) {
	try {
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

export async function PUT(req: Request) {
	try {
		const body = await req.json()

		// Validar que tenga id
		if (!body?.cardId) {
			return NextResponse.json(
				{ error: 'Falta el ID de la tarjeta' },
				{ status: 400 }
			)
		}

		if (!body?.boardId) {
			return NextResponse.json(
				{ error: 'Falta el ID del tablero' },
				{ status: 400 }
			)
		}
		if (!body?.columnId) {
			return NextResponse.json(
				{ error: 'Falta el ID de la columna' },
				{ status: 400 }
			)
		}
		const {
			cardId,
			boardId,
			columnId,
			title,
			description,
			priorityColor,
			comments,
			order,
			history,
		} = body

		// 🔥 TRANSFORMAR COMENTARIOS SOLO SI VIENEN
		let parsedComments
		if (comments !== undefined) {
			parsedComments = comments.map((c: ICardComment) => ({
				...c,
				createdAt: new Date(c.createdAt),
				editedAt: c.editedAt ? new Date(c.editedAt) : null,
			}))
		}

		// Crear objeto dinámico con solo lo que llegó
		const dataToUpdate: Partial<ICard> = {}

		if (title !== undefined) {
			if (title.trim() === '') {
				return NextResponse.json(
					{ error: 'El título no puede estar vacío' },
					{ status: 400 }
				)
			}
			dataToUpdate.title = title
		}
		if (description !== undefined) dataToUpdate.description = description
		if (priorityColor !== undefined) dataToUpdate.priorityColor = priorityColor
		if (comments !== undefined) dataToUpdate.comments = parsedComments // ← AQUÍ
		if (order !== undefined) dataToUpdate.order = order
		if (history !== undefined) dataToUpdate.history = history

		// Si no hay nada para actualizar
		if (Object.keys(dataToUpdate).length === 0) {
			return NextResponse.json(
				{ error: 'No se recibieron campos para actualizar' },
				{ status: 400 }
			)
		}

		// Actualizar en la DB
		const updatedCard = await updateCard({
			_id: cardId,
			boardId,
			columnId,
			...dataToUpdate,
		})

		return NextResponse.json({ card: updatedCard }, { status: 200 })
	} catch (err: unknown) {
		const error = err as Error

		console.error('Error al actualizar tarjeta:', error)
		return NextResponse.json({ message: error.message }, { status: 500 })
	}
}

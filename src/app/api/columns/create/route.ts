import { createColumn } from '@/helpers/createColumnInBoard'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'
import { IColumn } from '@/types/columns'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
		const body = await request.json()
		const { boardId, userId, name, order } = body

		if (!boardId || !userId || !name) {
			return NextResponse.json(
				{ error: 'boardId, userId y name son requeridos' },
				{ status: 400 }
			)
		}

		const newColumn = (await createColumn(
			boardId,
			userId,
			name,
			order
		)) as IColumn

		return NextResponse.json(newColumn)
	} catch (error: unknown) {
		const err = error as Error
		console.error('Error en POST /api/columns/create:', error)
		return NextResponse.json(
			{ error: err.message || 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

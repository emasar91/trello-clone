import { NextResponse } from 'next/server'
import type { IColumn } from '@/types/columns'
import { getBoardColumns } from '@/helpers/getBoardColumns'
import { createColumn } from '@/helpers/createColumnInBoard'
import { updateColumn } from '@/helpers/updateColumn'
import { deleteColumnAndCards } from '@/helpers/deleteColumn'
import { updateColumnOrders } from '@/helpers/updateColumnOrders'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const boardId = searchParams.get('boardId')

		if (!boardId) {
			return NextResponse.json(
				{ error: 'boardId es requerido' },
				{ status: 400 }
			)
		}

		const columns = (await getBoardColumns(boardId)) as IColumn[]

		return NextResponse.json({ columns: columns }, { status: 200 })
	} catch (error: unknown) {
		const err = error as Error
		console.error('Error en GET /api/columns/get:', error)
		return NextResponse.json(
			{ error: err.message || 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

export async function POST(request: Request) {
	try {
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

// /api/columns/update/route.ts

export async function PUT(request: Request) {
	try {
		const body = await request.json()

		// 🔹 Si es ARRAY → actualizar orden
		const { columnsOrder } = body
		if (Array.isArray(columnsOrder)) {
			const updated = await updateColumnOrders(columnsOrder)
			return NextResponse.json({ success: true, updated }, { status: 200 })
		}

		// 🔹 Si NO es array → actualizamos 1 columna (comportamiento actual)
		const { columnId, newName, order, boardId } = body

		if (!columnId) {
			return NextResponse.json(
				{ error: 'columnId es requerido' },
				{ status: 400 }
			)
		}

		const updateFields: { name?: string; order?: number } = {}
		if (newName?.trim()) updateFields.name = newName.trim()
		if (order !== undefined) updateFields.order = order

		if (Object.keys(updateFields).length === 0) {
			return NextResponse.json(
				{ error: 'No se envió ningún dato para actualizar' },
				{ status: 400 }
			)
		}

		const updatedColumn = await updateColumn(columnId, boardId, updateFields)

		return NextResponse.json(
			{ success: true, column: updatedColumn },
			{ status: 200 }
		)
	} catch (error) {
		console.error('❌ Error en PUT /api/columns/update:', error)
		return NextResponse.json(
			{ error: 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

export async function DELETE(req: Request) {
	try {
		const { columnId, boardId } = await req.json()

		if (!columnId || !boardId) {
			return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
		}

		await deleteColumnAndCards(columnId, boardId)

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('❌ Error eliminando columna:', error)
		return NextResponse.json(
			{ error: 'Error al eliminar columna' },
			{ status: 500 }
		)
	}
}

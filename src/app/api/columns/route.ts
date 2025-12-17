import { NextResponse } from 'next/server'
import type { IColumn } from '@/types/columns'
import { getBoardColumns } from '@/helpers/getBoardColumns'
import { updateColumn } from '@/helpers/updateColumn'
import { deleteColumnAndCards } from '@/helpers/deleteColumn'
import { updateColumnOrders } from '@/helpers/updateColumnOrders'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'

/**
 * GET /api/columns?boardId=123
 * @param {Request} request
 * @returns {Promise<NextResponse>}
 * @description Obtener todas las columnas de un board.
 * @example /api/columns?boardId=123
 * @throws {Error} - Si no se proporciona un boardId.
 * @throws {Error} - Si ocurre un error interno del servidor.
 */
export async function GET(request: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
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

/**
 * PUT /api/columns/update
 * @param {Request} request
 * @returns {Promise<NextResponse>}
 * @description Actualiza una columna en un board o actualiza el orden de todas las columnas en un board.
 * @example /api/columns/update?boardId=123&columnId=abc&newName=columna actualizada
 * @example /api/columns/update?boardId=123&columnsOrder=[columnId1, columnId2, ...]
 * @throws {Error} - Si no se proporciona un boardId o un columnId.
 * @throws {Error} - Si ocurre un error interno del servidor.
 */
export async function PUT(request: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
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

/**
 * Elimina una columna y todas las tarjetas asociadas a ella.
 * Lanza un error si el tablero no puede quedar sin columnas.
 * @param {Request} req - Request que contiene el ID de la columna y el ID del tablero.
 * @returns {Promise<NextResponse>} - Promesa que se resuelve con el estado de la eliminación.
 * @example /api/columns/delete?columnId=123&boardId=456
 */
export async function DELETE(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
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

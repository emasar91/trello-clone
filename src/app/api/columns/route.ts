import { NextResponse } from 'next/server'
import type { IColumn } from '@/types/columns'
import { getBoardColumns } from '@/helpers/getBoardColumns'
import { updateColumn } from '@/helpers/updateColumn'
import { deleteColumnAndCards } from '@/helpers/deleteColumn'
import { updateColumnOrders } from '@/helpers/updateColumnOrders'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'

/**
 * Obtiene todas las columnas de un board.
 * @param {Request} request
 * @returns {Promise<NextResponse>}
 * @example /api/columns?boardId=123
 */
export async function GET(request: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
		// 2️⃣ Obtener boardId
		const { searchParams } = new URL(request.url)
		const boardId = searchParams.get('boardId')
		// 3️⃣ Validar boardId
		if (!boardId) {
			return NextResponse.json(
				{ error: 'boardId es requerido' },
				{ status: 400 }
			)
		}
		// 4️⃣ Obtener columnas
		const columns = (await getBoardColumns(boardId)) as IColumn[]
		// 5️⃣ Devolver columnas
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
 * Actualiza una columna en un board o actualiza el orden de todas las columnas en un board.
 * @param {Request} request
 * @returns {Promise<NextResponse>}
 * @example /api/columns/update?boardId=123&columnId=abc&newName=columna actualizada
 * @example /api/columns/update?boardId=123&columnsOrder=[columnId1, columnId2, ...]
 */
export async function PUT(request: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
		const body = await request.json()

		// 2️⃣ Si es ARRAY → actualizar orden
		const { columnsOrder } = body
		if (Array.isArray(columnsOrder)) {
			const updated = await updateColumnOrders(columnsOrder)
			return NextResponse.json({ success: true, updated }, { status: 200 })
		}

		// 3️⃣ Si NO es array → actualizamos 1 columna (comportamiento actual)
		const { columnId, newName, order, boardId } = body

		if (!columnId) {
			return NextResponse.json(
				{ error: 'columnId es requerido' },
				{ status: 400 }
			)
		}
		// 4️⃣ Preparar campos para actualizar
		const updateFields: { name?: string; order?: number } = {}
		if (newName?.trim()) updateFields.name = newName.trim()
		if (order !== undefined) updateFields.order = order
		// 5️⃣ Validar campos para actualizar
		if (Object.keys(updateFields).length === 0) {
			return NextResponse.json(
				{ error: 'No se envió ningún dato para actualizar' },
				{ status: 400 }
			)
		}
		// 6️⃣ Actualizar columna
		const updatedColumn = await updateColumn(columnId, boardId, updateFields)
		// 7️⃣ Devolver respuesta
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
		// 2️⃣ Obtener columnId y boardId
		const { columnId, boardId } = await req.json()
		// 3️⃣ Validar columnId y boardId
		if (!columnId || !boardId) {
			return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
		}
		// 4️⃣ Eliminar columna y tarjetas
		await deleteColumnAndCards(columnId, boardId)
		// 5️⃣ Devolver respuesta
		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('❌ Error eliminando columna:', error)
		return NextResponse.json(
			{ error: 'Error al eliminar columna' },
			{ status: 500 }
		)
	}
}

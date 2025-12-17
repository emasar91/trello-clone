import { createColumn } from '@/helpers/createColumnInBoard'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'
import { IColumn } from '@/types/columns'
import { NextResponse } from 'next/server'

/**
 * Crea una columna en un board y devuelve la columna creada con su ID.
 * Si no se proporciona un orden, se calculará automáticamente como el orden
 * más alto de las columnas existentes en el board + 1.
 * @param {string | ObjectId} boardId - ID del board.
 * @param {string | ObjectId} userId - ID del usuario autenticado.
 * @param {string} name - Nombre de la columna.
 * @param {number} [order] - Orden de la columna (opcional).
 * @returns {Promise<{_id: ObjectId} & IColumn>} - La columna creada con su ID y datos.
 */
export async function POST(request: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
		const body = await request.json()
		const { boardId, userId, name, order } = body

		// 2️⃣ Validar datos
		if (!boardId || !userId || !name) {
			return NextResponse.json(
				{ error: 'boardId, userId y name son requeridos' },
				{ status: 400 }
			)
		}
		// 3️⃣ Crear columna
		const newColumn = (await createColumn(
			boardId,
			userId,
			name,
			order
		)) as IColumn

		// 4️⃣ Devolver respuesta
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

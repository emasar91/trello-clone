import { NextResponse } from 'next/server'
import type { IColumn } from '@/types/columns'
import { getBoardColumns } from '@/helpers/getBoardColumns'
import { createColumn } from '@/helpers/createColumnInBoard'
import { updateColumnName } from '@/helpers/updateColumnName'

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

export async function PUT(request: Request) {
	try {
		const { columnId, newName, boardId } = await request.json()

		if (!columnId || !newName?.trim()) {
			return NextResponse.json(
				{ error: 'columnId y newName son requeridos' },
				{ status: 400 }
			)
		}

		// 🔥 Llamamos a DB
		const updatedColumn = await updateColumnName(
			columnId,
			newName.trim(),
			boardId
		)

		// ⚠ Control correcto
		// 🟢 AHORA — si llega null es porque no se modificó nada
		if (!updatedColumn) {
			return NextResponse.json(
				{ error: 'No se pudo actualizar la columna' },
				{ status: 400 }
			)
		}

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

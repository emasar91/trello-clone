import { NextResponse } from 'next/server'
import { getCardsByColumn } from '@/helpers/getCardsByColumn'

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

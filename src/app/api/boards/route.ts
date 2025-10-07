import { createBoardinWorkspace } from '@/helpers/createBordInWorkpace'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}

		// 2️⃣ Leer body
		const body = await req.json()
		const image = body?.image
		const name = (body?.name ?? '').toString().trim()
		const workspaceId = body?.workspaceId
		const description = body?.description
			? String(body.description).trim()
			: undefined

		if (!workspaceId || !ObjectId.isValid(workspaceId)) {
			return NextResponse.json(
				{ message: 'workspaceId inválido' },
				{ status: 400 }
			)
		}

		if (!image) {
			return NextResponse.json({ message: 'Imagen requerida' }, { status: 400 })
		}
		if (!name) {
			return NextResponse.json({ message: 'Nombre requerido' }, { status: 400 })
		}

		// 3️⃣ Crear tablero
		const board = await createBoardinWorkspace({
			userId: user.uid,
			workspaceId: workspaceId,
			name,
			description,
			image,
		})

		return NextResponse.json({ board }, { status: 201 })
	} catch (err: unknown) {
		const error = err as Error
		console.error('POST /api/boards error:', error?.message || error)

		if (
			error.message?.includes('No autorizado') ||
			error.message?.includes('Token inválido')
		) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}

		if (
			error.message?.includes('Usuario no encontrado') ||
			error.message?.includes('Workspace no encontrado')
		) {
			return NextResponse.json({ message: error.message }, { status: 404 })
		}

		if (error.message?.includes('ya tiene un tablero')) {
			return NextResponse.json({ message: error.message }, { status: 409 })
		}

		return NextResponse.json({ message: 'Error interno' }, { status: 500 })
	}
}

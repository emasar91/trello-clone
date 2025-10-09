import { createBoardinWorkspace } from '@/helpers/createBordInWorkpace'
import { getBoardByNames } from '@/helpers/getBoardByName'
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

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)

		const uid = searchParams.get('uid')
		const workspaceName = searchParams.get('workspaceName')
		const boardName = searchParams.get('boardName')

		if (!uid || !workspaceName || !boardName) {
			return NextResponse.json(
				{ error: 'uid, workspaceName y boardName son requeridos' },
				{ status: 400 }
			)
		}

		const { workspace, board } = await getBoardByNames(
			uid,
			workspaceName,
			boardName
		)

		return NextResponse.json({
			workspace,
			board,
		})
	} catch (error: unknown) {
		const err = error as Error
		console.error('Error en GET /api/boards/get:', error)
		return NextResponse.json(
			{ error: err.message || 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

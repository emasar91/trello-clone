import { createBoardinWorkspace } from '@/helpers/createBordInWorkpace'
import { getBoardByNames } from '@/helpers/getBoardByName'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'
import { updateLastOpenedBoard } from '@/helpers/updateLastOpenedBoard'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

/**
 * Crea un nuevo tablero en el workspace especificado.
 *
 * @param {Request} req - Request que contiene el body con los datos del nuevo tablero.
 * @returns {Promise<NextResponse>} - Promesa que se resuelve con el nuevo tablero creado con su ID.
 * @description Crea un nuevo tablero en el workspace especificado.
 * @example /api/boards?uid=123&workspaceId=123&name=Board1&description=Este es un tablero&image=https://example.com/image.jpg
 */
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
			error.message?.includes('TOKEN_INVALID') ||
			error.message?.includes('TOKEN_EXPIRED')
		) {
			return NextResponse.json({ message: error.message }, { status: 401 })
		}

		if (
			error.message?.includes('USER_NOT_FOUND') ||
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

/**
 * GET /api/boards/get?uid={string}&workspaceName={string}&boardName={string}
 * @param {string} uid - ID del usuario autenticado.
 * @param {string} workspaceName - nombre del workspace.
 * @param {string} boardName - nombre del board.
 * @returns {Promise<NextResponse>} - El workspace y tablero correspondientes.
 * @description Obtener un workspace y tablero por su nombre.
 * @example /api/boards/get?uid=123&workspaceName=miWorkspace&boardName=miBoard
 */
export async function GET(request: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
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

/**
 * PATCH /api/boards/update-last-opened
 * Actualiza el tablero que se encuentra en el workspace y se
 * marca como el tablero que se abri  por  ltimo.
 * @param {string} id - El ID del tablero.
 * @returns {Promise<NextResponse>} - El estado del tablero.
 * @description Actualiza el tablero que se encuentra en el workspace y se
 * marca como el tablero que se abri  por  ltimo.
 * @example /api/boards/update-last-opened?id=123
 * @throws {Error} - Si no se proporciona un boardId.
 * @throws {Error} - Si ocurre un error interno del servidor.
 */
export async function PATCH(request: Request) {
	try {
		// 1️⃣ Auth
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
		}
		const { searchParams } = new URL(request.url)
		const boardId = searchParams.get('id')

		if (!boardId) {
			return NextResponse.json(
				{ error: 'boardId es requerido' },
				{ status: 400 }
			)
		}

		// 2️⃣ Update en workspace
		await updateLastOpenedBoard(boardId, user._id)

		return NextResponse.json({ ok: true })
	} catch (error) {
		console.error('PATCH /api/boards/update-last-opened', error)
		return NextResponse.json(
			{ error: 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

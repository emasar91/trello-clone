import { NextResponse } from 'next/server'
import { getUserWorkspaces } from '@/helpers/getWorkspacesFronUser'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'
import { createWorkspaceForUser } from '@/helpers/createWorkspaces'
import { IWorkspace } from '@/types/workspaces'
import { editWorkspace } from '@/helpers/updateWorkspace'
import { getWorkspaces } from '@/helpers/getWorkspaces'

/**
 * Obtener todos los workspaces de un usuario autenticado.
 * @param {Request} request
 * @returns {Promise<NextResponse>}
 * @example /api/workspaces?uid=123
 */
export async function GET(request: Request) {
	// 1️⃣ Obtener usuario autenticado
	const user = await getUserFromRequest()
	if (!user) {
		return NextResponse.json({ message: 'TOKEN_INVALID' }, { status: 401 })
	}
	// 2️⃣ Obtener userId de query param
	const { searchParams } = new URL(request.url)
	const uid = searchParams.get('uid')

	// 3️⃣ Si no viene uid, error
	if (!uid) {
		return NextResponse.json({ error: 'uid es requerido' }, { status: 400 })
	}

	// 4️⃣ Obtener workspaces
	const workspaces = (await getUserWorkspaces(uid)) as IWorkspace[]

	return NextResponse.json(workspaces)
}

/**
 * Crear un nuevo workspace para un usuario autenticado.
 * @param {Request} request - Request que contiene el body con los datos del nuevo workspace.
 * @returns {Promise<NextResponse>} - Promesa que se resuelve con el nuevo workspace creado.
 * @example /api/workspaces?uid=123
 */
export async function POST(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'TOKEN_INVALID' }, { status: 401 })
		}

		// 2️⃣ Validar maximo de workspaces
		if (user.workspaces.length >= 4) {
			return NextResponse.json(
				{ message: 'El maximo de workspaces es 4' },
				{ status: 401 }
			)
		}

		// 3️⃣ Leer body
		const body = await req.json()
		const name = (body?.name ?? '').toString().trim()
		const description = body?.description
			? String(body.description).trim()
			: undefined

		// 4️⃣ Validar nombre
		if (!name) {
			return NextResponse.json({ message: 'Nombre requerido' }, { status: 400 })
		}
		// 5️⃣ Crear workspace
		const workspace = await createWorkspaceForUser({
			userId: user.uid,
			name,
			description,
		})
		return NextResponse.json({ workspace }, { status: 201 })
	} catch (err: unknown) {
		const error = err as Error
		console.error('POST /api/workspaces error:', error)
		if (
			error.message?.includes('TOKEN_INVALID') ||
			error.message?.includes('TOKEN_EXPIRED')
		) {
			return NextResponse.json({ message: 'TOKEN_INVALID' }, { status: 401 })
		}
		if (error.message?.includes('USER_NOT_FOUND')) {
			return NextResponse.json({ message: error.message }, { status: 401 })
		}
		if (error.message?.includes('ya tiene un workspace')) {
			return NextResponse.json({ message: error.message }, { status: 409 })
		}
		return NextResponse.json({ message: 'Error interno' }, { status: 500 })
	}
}

/**
 * Actualiza un workspace existente.
 * @param {Request} req - Request que contiene el body con los datos del workspace a actualizar.
 * @returns {Promise<NextResponse>} - Promesa que se resuelve con el workspace actualizado.
 * @example /api/workspaces/[id]
 */
export async function PUT(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'TOKEN_INVALID' }, { status: 401 })
		}
		// 2️⃣ Leer body
		const body = await req.json()
		const name = (body?.name ?? '').toString().trim()
		const workspaceId = body?.workspaceId
		const description =
			body?.description !== undefined
				? String(body.description).trim()
				: undefined
		// 3️⃣ Si ambos vienen vacíos, error
		if (!name && !description) {
			return NextResponse.json(
				{ message: 'Debe enviar nombre o descripción para actualizar' },
				{ status: 400 }
			)
		}
		// 4️⃣ workspaceId requerido
		if (!workspaceId) {
			return NextResponse.json(
				{ message: 'ID de workspace requerido' },
				{ status: 400 }
			)
		}
		// 5️⃣ Construir objeto dinámico
		const updateData: { name?: string; description?: string } = {}
		if (name) updateData.name = name
		if (description) updateData.description = description

		// 6️⃣ Validar duplicado solo si se quiere actualizar el nombre
		if (updateData.name) {
			const workspaces = (await getWorkspaces(
				user.uid
			)) as unknown as IWorkspace[]

			const exists = workspaces.some(
				(ws) => ws.name.toString() === updateData.name
			)
			if (exists) {
				return NextResponse.json(
					{ message: 'Ya tienes un workspace con ese nombre' },
					{ status: 409 }
				)
			}
		}
		// 7️⃣ Llamar al helper que actualiza en MongoDB
		const result = await editWorkspace({
			userId: user.uid,
			workspaceId,
			...updateData,
		})
		return NextResponse.json({ workspace: result }, { status: 200 })
	} catch (err: unknown) {
		const error = err as Error

		console.error('PUT /api/workspaces/[id] error:', error?.message || error)

		if (
			error.message?.includes('TOKEN_INVALID') ||
			error.message?.includes('TOKEN_EXPIRED')
		) {
			return NextResponse.json({ message: 'TOKEN_MISSING' }, { status: 401 })
		}

		if (error.message?.includes('USER_NOT_FOUND')) {
			return NextResponse.json({ message: error.message }, { status: 401 })
		}
		if (error.message?.includes('Workspace no encontrado')) {
			return NextResponse.json({ message: error.message }, { status: 404 })
		}

		if (error.message?.includes('No se aplicaron cambios')) {
			return NextResponse.json({ message: error.message }, { status: 400 })
		}
		return NextResponse.json({ message: 'Error interno' }, { status: 500 })
	}
}

import { NextResponse } from 'next/server'
import { getUserWorkspaces } from '@/helpers/getWorkspacesFronUser'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'
import { createWorkspaceForUser } from '@/helpers/createWorkspaces'
import { IWorkspace } from '@/types/workspaces'
import { editWorkspace } from '@/helpers/updateWorkspace'
import { getWorkspaces } from '@/helpers/getWorkspaces'

export async function GET(request: Request) {
	// en este ejemplo el userId viene como query param: /api/workspaces?userId=123
	// 1️⃣ Obtener usuario autenticado
	const user = await getUserFromRequest()
	if (!user) {
		return NextResponse.json({ message: 'TOKEN_INVALID' }, { status: 401 })
	}
	const { searchParams } = new URL(request.url)
	const uid = searchParams.get('uid')

	if (!uid) {
		return NextResponse.json({ error: 'uid es requerido' }, { status: 400 })
	}

	const workspaces = (await getUserWorkspaces(uid)) as IWorkspace[]

	return NextResponse.json(workspaces)
}

export async function POST(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'TOKEN_INVALID' }, { status: 401 })
		}

		if (user.workspaces.length >= 4) {
			return NextResponse.json(
				{ message: 'El maximo de workspaces es 4' },
				{ status: 401 }
			)
		}

		// 2) Leer body
		const body = await req.json()
		const name = (body?.name ?? '').toString().trim()
		const description = body?.description
			? String(body.description).trim()
			: undefined

		if (!name) {
			return NextResponse.json({ message: 'Nombre requerido' }, { status: 400 })
		}

		// 3) Llamar al helper que ya tenés
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

export async function PUT(req: Request) {
	try {
		// 1️⃣ Obtener usuario autenticado
		const user = await getUserFromRequest()
		if (!user) {
			return NextResponse.json({ message: 'TOKEN_INVALID' }, { status: 401 })
		}

		// 3️⃣ Leer body
		const body = await req.json()
		const name = (body?.name ?? '').toString().trim()
		const workspaceId = body?.workspaceId
		const description =
			body?.description !== undefined
				? String(body.description).trim()
				: undefined

		// 🚫 Si ambos vienen vacíos, error
		if (!name && !description) {
			return NextResponse.json(
				{ message: 'Debe enviar nombre o descripción para actualizar' },
				{ status: 400 }
			)
		}

		// 🚫 workspaceId requerido
		if (!workspaceId) {
			return NextResponse.json(
				{ message: 'ID de workspace requerido' },
				{ status: 400 }
			)
		}

		// 🛠 Construir objeto dinámico
		const updateData: { name?: string; description?: string } = {}
		if (name) updateData.name = name
		if (description) updateData.description = description

		// 👀 Validar duplicado solo si se quiere actualizar el nombre
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

		// 4️⃣ Llamar al helper que actualiza en MongoDB
		const result = await editWorkspace({
			userId: user.uid,
			workspaceId,
			...updateData, // <---- solo manda lo que corresponde
		})

		return NextResponse.json({ workspace: result }, { status: 200 })
	} catch (err: unknown) {
		const error = err as Error

		console.error('PUT /api/workspaces/[id] error:', error?.message || error)

		// 🔒 Errores de autorización
		if (
			error.message?.includes('TOKEN_INVALID') ||
			error.message?.includes('TOKEN_EXPIRED')
		) {
			return NextResponse.json({ message: 'TOKEN_MISSING' }, { status: 401 })
		}

		// 👤 Usuario no encontrado
		if (error.message?.includes('USER_NOT_FOUND')) {
			return NextResponse.json({ message: error.message }, { status: 401 })
		}

		// 🚫 Workspace inexistente
		if (error.message?.includes('Workspace no encontrado')) {
			return NextResponse.json({ message: error.message }, { status: 404 })
		}

		// ⚠️ Otros errores esperados
		if (error.message?.includes('No se aplicaron cambios')) {
			return NextResponse.json({ message: error.message }, { status: 400 })
		}

		// 💥 Error genérico
		return NextResponse.json({ message: 'Error interno' }, { status: 500 })
	}
}

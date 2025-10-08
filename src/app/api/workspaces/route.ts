import { NextResponse } from 'next/server'
import { getUserWorkspaces } from '@/helpers/getWorkspacesFronUser'
import { getUserFromRequest } from '@/helpers/getUserIdFromToken'
import { createWorkspaceForUser } from '@/helpers/createWorkspaces'
import { IWorkspace } from '@/types/workspaces'
import { editWorkspace } from '@/helpers/updateWorkspace'
import { getWorkspaces } from '@/helpers/getWorkspaces'

export async function GET(request: Request) {
	// en este ejemplo el userId viene como query param: /api/workspaces?userId=123
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
		// 1) Obtener userId (ObjectId) desde la cookie validada
		const user = await getUserFromRequest()

		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}

		if (user.workspaces.length > 4) {
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

		console.error('POST /api/workspaces error:', error?.message || error)

		if (
			error.message?.includes('Token inválido') ||
			error.message?.includes('No autorizado')
		) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}
		if (error.message?.includes('Usuario no encontrado')) {
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
		// 1️⃣ Obtener usuario autenticado desde la cookie
		const user = await getUserFromRequest()

		if (!user) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}

		// 3️⃣ Leer body
		const body = await req.json()
		const name = (body?.name ?? '').toString().trim()
		const workspaceId = body?.workspaceId
		const description =
			body?.description !== undefined
				? String(body.description).trim()
				: undefined

		if (!name && !description) {
			return NextResponse.json(
				{ message: 'Debe enviar nombre o descripción para actualizar' },
				{ status: 400 }
			)
		}

		if (!workspaceId) {
			return NextResponse.json(
				{ message: 'ID de workspace requerido' },
				{ status: 400 }
			)
		}

		const workspaces = (await getWorkspaces(
			user.uid
		)) as unknown as IWorkspace[]

		const exists = workspaces.some((ws) => ws.name.toString() === name)

		if (exists) {
			return NextResponse.json(
				{ message: 'Ya tienes un workspace con ese nombre' },
				{ status: 409 }
			)
		}
		// 4️⃣ Llamar al helper que actualiza en MongoDB
		const result = await editWorkspace({
			userId: user.uid,
			workspaceId,
			name,
			description,
		})

		return NextResponse.json({ workspace: result }, { status: 200 })
	} catch (err: unknown) {
		const error = err as Error

		console.error('PUT /api/workspaces/[id] error:', error?.message || error)

		// 🔒 Errores de autorización
		if (
			error.message?.includes('Token inválido') ||
			error.message?.includes('No autorizado')
		) {
			return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
		}

		// 👤 Usuario no encontrado
		if (error.message?.includes('Usuario no encontrado')) {
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

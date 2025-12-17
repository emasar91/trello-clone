import { API } from '@/constants'
import api from '@/lib/axiosClient'
import { IWorkspace } from '@/types/workspaces'
import axios from 'axios'
import { User } from 'firebase/auth'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

interface ICreateBoardProps {
	setWorkSpaces: (value: IWorkspace[]) => void
	user: User | null
	backgroundSelected: string
}

/**
 * Hook para crear un nuevo tablero en un workspace.
 * @param {setWorkSpaces} Funcion para actualizar el estado de los workspaces.
 * @param {user} Usuario autenticado.
 * @param {backgroundSelected} Fondo seleccionado para el tablero.
 * @returns {{handleCreateBoard: (boardName: string, boardDescription: string, workspaceId: string, resetForm: () => void, handleClose?: () => void) => Promise<void>, loading: boolean}}
 * La funcion `handleCreateBoard` crea un nuevo tablero en el workspace especificado.
 * La funcion `handleCreateBoard` devuelve una promesa que se resuelve cuando el tablero ha sido creado.
 * La variable `loading` se establece en true mientras se est  creando el tablero y se establece en false cuando se ha creado.
 */
export const useCreateBoard = ({
	setWorkSpaces,
	user,
	backgroundSelected,
}: ICreateBoardProps) => {
	const [loading, setLoading] = useState(false)
	const t = useTranslations('BoardsPage')
	const didFetch = useRef(false)
	// 1️⃣ Crear columnas por defecto
	const createDefaultColumns = async (boardId: string) => {
		const defaultColumns = [
			{ name: 'Para hacer', order: 1 },
			{ name: 'En curso', order: 2 },
			{ name: 'Finalizado', order: 3 },
		]

		try {
			// 2️⃣ Crear columnas por defecto en la base de datos
			setLoading(true)
			await Promise.all(
				defaultColumns.map((col) =>
					axios.post(
						API.createColumnUrl,
						{
							boardId,
							userId: user?.uid,
							name: col.name,
							order: col.order,
						},
						{ withCredentials: true }
					)
				)
			)
		} catch (err) {
			throw err
		}
	}

	/**
	 * Crea un nuevo tablero en el workspace especificado.
	 * @param {string} boardName - El nombre del tablero.
	 * @param {string} boardDescription - La descripci n del tablero.
	 * @param {string} workspaceId - El ID del workspace.
	 * @param {() => void} resetForm - Funcion para resetear el formulario.
	 * @param {() => void} [handleClose] - Funcion para cerrar el modal.
	 * @returns {Promise<void>}
	 */
	const handleCreateBoard = async ({
		boardName,
		boardDescription,
		workspaceId,
		resetForm,
		handleClose,
	}: {
		boardName: string
		boardDescription: string
		workspaceId: string
		resetForm: () => void
		handleClose?: () => void
	}) => {
		if (didFetch.current) return
		didFetch.current = true
		try {
			// 3️⃣ Crear tablero
			const { data } = await api.post(
				API.createBoardsUrl,
				{
					name: boardName.trim(),
					description: boardDescription.trim(),
					workspaceId,
					image: backgroundSelected,
					lastOpenedAt: null,
				},
				{ withCredentials: true }
			)

			if (data.board?._id) {
				// 4️⃣ Crear columnas por defecto
				await createDefaultColumns(data.board._id)
				// 5️⃣ Resetear formulario
				resetForm()
				toast.success(t('menuBaord.successCreate'))
				// 6️⃣ Actualizar workspaces
				const { data: workspaces } = await api.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{ withCredentials: true }
				)
				// 7️⃣ Actualizar estado
				setWorkSpaces(workspaces)
				handleClose?.()
			}
		} catch (err) {
			if (axios.isAxiosError(err) && err.status !== 401)
				toast.error(err.response?.data?.message)
		} finally {
			setLoading(false)
			didFetch.current = false
		}
	}

	return { handleCreateBoard, loading }
}

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
 *
 * @param {setWorkSpaces} Funci n para actualizar el estado de los workspaces.
 * @param {user} Usuario autenticado.
 * @param {backgroundSelected} Fondo seleccionado para el tablero.
 *
 * @returns {{handleCreateBoard: (boardName: string, boardDescription: string, workspaceId: string, resetForm: () => void, handleClose?: () => void) => Promise<void>, loading: boolean}}
 *
 * La funci n `handleCreateBoard` crea un nuevo tablero en el workspace especificado.
 * La funci n `handleCreateBoard` devuelve una promesa que se resuelve cuando el tablero ha sido creado.
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

	const createDefaultColumns = async (boardId: string) => {
		const defaultColumns = [
			{ name: 'Para hacer', order: 1 },
			{ name: 'En curso', order: 2 },
			{ name: 'Finalizado', order: 3 },
		]

		try {
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
	 * @param {() => void} resetForm - Funci n para resetear el formulario.
	 * @param {() => void} [handleClose] - Funci n para cerrar el modal.
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
				await createDefaultColumns(data.board._id)
				resetForm()
				toast.success(t('menuBaord.successCreate'))
				const { data: workspaces } = await api.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{ withCredentials: true }
				)
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

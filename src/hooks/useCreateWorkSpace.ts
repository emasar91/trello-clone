import { useState, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API } from '@/constants'
import { useTranslations } from 'next-intl'
import { IWorkspace } from '@/types/workspaces'
import { User } from 'firebase/auth'
import api from '@/lib/axiosClient'

/**
 * Hook para crear un nuevo workspace para un usuario.
 * @param {User | null} user - Usuario autenticado.
 * @param {setWorkSpaces} - Funcion para actualizar el estado de los workspaces.
 * @param {setOpenModal} - Funcion para abrir o cerrar el modal de creaci n de workspace.
 * @returns {{handleCreateWorkspace: (workspaceName: string, workspaceDescription: string, resetForm: () => void) => Promise<void>, loading: boolean}}
 * La Funcion `handleCreateWorkspace` crea un nuevo workspace en el workspace especificado.
 * La Funcion `handleCreateWorkspace` devuelve una promesa que se resuelve cuando el workspace ha sido creado.
 * La variable `loading` se establece en true mientras se est  creando el workspace y se establece en false cuando se ha creado.
 */
export const useCreateWorkspace = (
	user: User | null,
	setWorkSpaces: (value: IWorkspace[]) => void,
	setOpenModal: (s: boolean) => void
) => {
	const [loading, setLoading] = useState(false)
	const t = useTranslations('BoardsPage')
	const didFetch = useRef(false)

	/**
	 * Crea un nuevo workspace para un usuario.
	 * @param {string} workspaceName - Nombre del workspace.
	 * @param {string} workspaceDescription - Descripci n del workspace.
	 * @param {() => void} resetForm - Funcion para resetear el formulario.
	 * @returns {Promise<void>} - Promesa que se resuelve cuando el workspace ha sido creado.
	 */
	const handleCreateWorkspace = async (
		workspaceName: string,
		workspaceDescription: string,
		resetForm: () => void
	) => {
		if (didFetch.current) return
		didFetch.current = true

		setLoading(true)

		try {
			// 1️⃣ Crear workspace en la base de datos
			const { data } = await api.post(
				API.createWorkspacesUrl,
				{
					name: workspaceName.trim(),
					description: workspaceDescription.trim(),
				},
				{ withCredentials: true }
			)

			// 2️⃣ Si se creo correctamente → actualizar estado
			if (data.workspace) {
				resetForm()
				setOpenModal(false)
				toast.success(t('modalCreateWorkspace.successCreate'))

				const { data: workspaces } = await api.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{ withCredentials: true }
				)

				setWorkSpaces(workspaces)
			}
		} catch (err) {
			if (axios.isAxiosError(err) && err.status !== 401)
				toast.error(err.response?.data?.message)
		} finally {
			setLoading(false)
			didFetch.current = false
		}
	}

	return { handleCreateWorkspace, loading }
}

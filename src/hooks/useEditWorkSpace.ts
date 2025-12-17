import { useState, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { User } from 'firebase/auth'
import { API } from '@/constants'
import { IWorkspace } from '@/types/workspaces'
import { useLocale, useTranslations } from 'next-intl'
import api from '@/lib/axiosClient'

/**
 * Hook para editar un workspace existente.
 * @param {User | null} user - Usuario autenticado.
 * @param {IWorkspace} workspace - Workspace a editar.
 * @param {setWorkSpaces} setWorkSpaces - Funcion para actualizar el estado de los workspaces.
 * @param {handleCloseEditForm} handleCloseEditForm - Funcion para cerrar el formulario de edicion.
 * @returns {{handleEditWorkspace: (newData: { newName: string; newDescription: string }, defaultName: string, resetForm: () => void) => Promise<void>, loading: boolean}}
 * La funcion `handleEditWorkspace` edita un workspace existente.
 * La funcion `handleEditWorkspace` devuelve una promesa que se resuelve cuando el workspace ha sido editado.
 * La variable `loading` se establece en true mientras se est  editando el workspace y se establece en false cuando se ha editado.
 */
export const useEditWorkspace = (
	user: User | null,
	workspace: IWorkspace,
	setWorkSpaces: (value: IWorkspace[]) => void,
	handleCloseEditForm: () => void
) => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const t = useTranslations('BoardsPage')
	const locale = useLocale()

	const didFetch = useRef(false)

	/**
	 * Edita un workspace existente.
	 * @param {newData: { newName: string; newDescription: string }} - Nuevos valores para el workspace.
	 * @param {defaultName: string} - Nombre original del workspace.
	 * @param {resetForm: () => void} - Funcion para resetear el formulario.
	 * La funcion `handleEditWorkspace` edita un workspace existente.
	 * La funcion `handleEditWorkspace` devuelve una promesa que se resuelve cuando el workspace ha sido editado.
	 * La variable `loading` se establece en true mientras se est  editando el workspace y se establece en false cuando se ha editado.
	 */
	const handleEditWorkspace = async (
		newData: { newName: string; newDescription: string },
		defaultName: string,
		resetForm: () => void
	) => {
		if (didFetch.current) return
		didFetch.current = true

		try {
			setLoading(true)
			// 1️⃣ Editar workspace en la base de datos
			const { data } = await api.put(
				API.updateWorkspacesUrl,
				{
					name: newData.newName.trim(),
					description: newData.newDescription.trim(),
					workspaceId: workspace?._id,
				},
				{ withCredentials: true }
			)

			if (data.workspace) {
				// 2️⃣ Si se edito correctamente → actualizar estado
				resetForm()
				toast.success(t('editWorkspaceSuccess'))

				// 3️⃣ Obtener workspaces actualizados
				const { data: workspaces } = await api.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{
						withCredentials: true,
					}
				)
				setWorkSpaces(workspaces)

				// 4️⃣ Cambiar nombre del workspace
				const nameWorkspace =
					newData.newName.trim() === '' ? defaultName : newData.newName.trim()

				// 5️⃣ Redirigir a la nueva ruta
				setTimeout(() => {
					setLoading(false)
					router.replace(
						`/${locale}/w/${nameWorkspace.toLowerCase().trim()}/boards?uid=${
							user?.uid
						}`
					)
				}, 1000)
			}
			// 6️⃣ Cerrar formulario
			handleCloseEditForm()
		} catch (err) {
			if (axios.isAxiosError(err) && err.status !== 401)
				toast.error(err.response?.data?.message)
		} finally {
			didFetch.current = false
		}
	}

	return { handleEditWorkspace, loading }
}

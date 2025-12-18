import { useCallback, useState } from 'react'
import axios from 'axios'
import { API } from '@/constants'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/useAuthContext'
import { IWorkspace } from '@/types/workspaces'
import api from '@/lib/axiosClient'

/**
 * Hook para obtener los workspaces disponibles para un usuario.
 * @returns {{
 *   getWorkspaces: (setWorkspaceAvailable: (value: IWorkspace[]) => void) => Promise<void>,
 *   loading: boolean
 * }}
 * La Funcion `getWorkspaces` obtiene los workspaces disponibles para un usuario y establece el estado de los workspaces en el componente.
 * La Funcion `getWorkspaces` devuelve una promesa que se resuelve cuando los workspaces han sido obtenidos.
 * La variable `loading` se establece en true mientras se est n obteniendo los workspaces y se establece en false cuando se han obtenido.
 */
export const useGetWorkspaces = () => {
	const { user } = useAuth()
	const [loading, setLoading] = useState(false)

	const getWorkspaces = useCallback(
		async (setWorkspaceAvailable: (value: IWorkspace[]) => void) => {
			try {
				setLoading(true)
				// 1️⃣ Obtener workspaces
				const { data } = await api.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{ withCredentials: true }
				)

				// 2️⃣ Si se encontro correctamente → actualizar estado
				if (data) {
					setWorkspaceAvailable(data)
				}
			} catch (err) {
				if (axios.isAxiosError(err) && err.response?.status !== 401) {
					toast.error(
						err.response?.data?.message || 'Error al obtener workspaces'
					)
				}
			} finally {
				setLoading(false)
			}
		},
		[user?.uid]
	)

	return { getWorkspaces, loading }
}

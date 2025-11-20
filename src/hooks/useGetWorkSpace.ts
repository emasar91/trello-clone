// /hooks/useGetWorkspaces.ts
import { useCallback, useState } from 'react'
import axios from 'axios'
import { API } from '@/constants'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/useAuthContext'
import { IWorkspace } from '@/types/workspaces'

export const useGetWorkspaces = () => {
	const { user } = useAuth()
	const [loading, setLoading] = useState(false)

	const getWorkspaces = useCallback(
		async (setWorkspaceAvailable: (value: IWorkspace[]) => void) => {
			try {
				setLoading(true)

				const { data } = await axios.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{ withCredentials: true }
				)

				if (data) {
					setWorkspaceAvailable(data)
				}
			} catch (err) {
				if (axios.isAxiosError(err)) {
					toast.error(
						err.response?.data?.message || 'Error al obtener workspaces'
					)
				} else {
					toast.error('Error inesperado')
				}
			} finally {
				setLoading(false)
			}
		},
		[user?.uid]
	)

	return { getWorkspaces, loading }
}

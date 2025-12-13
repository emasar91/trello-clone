// /hooks/useGetWorkspaces.ts
import { useCallback, useState } from 'react'
import axios from 'axios'
import { API } from '@/constants'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/useAuthContext'
import { IWorkspace } from '@/types/workspaces'
import api from '@/lib/axiosClient'

export const useGetWorkspaces = () => {
	const { user } = useAuth()
	const [loading, setLoading] = useState(false)

	const getWorkspaces = useCallback(
		async (setWorkspaceAvailable: (value: IWorkspace[]) => void) => {
			try {
				setLoading(true)

				const { data } = await api.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{ withCredentials: true }
				)

				console.log('🚀 ~ useGetWorkspaces ~ data:', data)
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

import { useState, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API } from '@/constants'
import { useTranslations } from 'next-intl'
import { IWorkspace } from '@/types/workspaces'
import { User } from 'firebase/auth'
import api from '@/lib/axiosClient'

export const useCreateWorkspace = (
	user: User | null,
	setWorkSpaces: (value: IWorkspace[]) => void,
	setOpenModal: (s: boolean) => void
) => {
	const [loading, setLoading] = useState(false)
	const t = useTranslations('BoardsPage')
	const didFetch = useRef(false)

	const handleCreateWorkspace = async (
		workspaceName: string,
		workspaceDescription: string,
		resetForm: () => void
	) => {
		if (didFetch.current) return
		didFetch.current = true

		setLoading(true)

		try {
			const { data } = await api.post(
				API.createWorkspacesUrl,
				{
					name: workspaceName.trim(),
					description: workspaceDescription.trim(),
				},
				{ withCredentials: true }
			)

			if (data.workspace) {
				resetForm()
				setOpenModal(false)
				toast.success(t('modalCreateWorkspace.successCreate'))

				// 🔄 obtener workspaces actualizados
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
			didFetch.current = false // 👈 importante para poder volver a usar el hook en otro submit
		}
	}

	return { handleCreateWorkspace, loading }
}

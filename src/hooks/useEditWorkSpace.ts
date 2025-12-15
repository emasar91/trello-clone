import { useState, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { User } from 'firebase/auth'
import { API } from '@/constants'
import { IWorkspace } from '@/types/workspaces'
import { useLocale, useTranslations } from 'next-intl'
import api from '@/lib/axiosClient'

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

	// 🛡 evita doble llamado con StrictMode
	const didFetch = useRef(false)

	const handleEditWorkspace = async (
		newData: { newName: string; newDescription: string },
		defaultName: string,
		resetForm: () => void
	) => {
		if (didFetch.current) return
		didFetch.current = true

		setLoading(true)

		try {
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
				resetForm()
				toast.success(t('editWorkspaceSuccess'))

				// 🔄 obtener workspaces actualizados
				const { data: workspaces } = await api.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{
						withCredentials: true,
					}
				)
				setWorkSpaces(workspaces)

				// 🔁 actualizar la URL con el nuevo nombre
				const nameWorkspace =
					newData.newName.trim() === '' ? defaultName : newData.newName.trim()

				setTimeout(() => {
					setLoading(false)
					router.replace(
						`/${locale}/w/${nameWorkspace.toLowerCase().trim()}/boards?uid=${
							user?.uid
						}`
					)
				}, 1000)
			}
			handleCloseEditForm()
		} catch (err) {
			if (axios.isAxiosError(err) && err.status !== 401)
				toast.error(err.response?.data?.message)
		} finally {
			didFetch.current = false // 👈 importante para volver a usarlo sin recargar la página
		}
	}

	return { handleEditWorkspace, loading }
}

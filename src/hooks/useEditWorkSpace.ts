import { useState, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { User } from 'firebase/auth'
import { API } from '@/constants'
import { IWorkspace } from '@/types/workspaces'
import { useLocale, useTranslations } from 'next-intl'

export const useEditWorkspace = (
	user: User | null,
	workspace: { _id: string },
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
		newName: string,
		newDescription: string,
		resetForm: () => void
	) => {
		if (didFetch.current) return
		didFetch.current = true

		setLoading(true)

		try {
			const { data } = await axios.put(
				API.updateWorkspacesUrl,
				{
					name: newName.trim(),
					description: newDescription.trim(),
					workspaceId: workspace?._id,
				},
				{ withCredentials: true }
			)

			if (data.workspace) {
				resetForm()
				toast.success(t('editWorkspaceSuccess'))

				// 🔄 obtener workspaces actualizados
				const { data: workspaces } = await axios.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{
						withCredentials: true,
					}
				)
				setWorkSpaces(workspaces)

				// 🔁 actualizar la URL con el nuevo nombre
				setTimeout(() => {
					router.replace(
						`/${locale}/w/${newName.toLowerCase().trim()}/boards?uid=${
							user?.uid
						}`
					)
				}, 1000)
			}
			handleCloseEditForm()
		} catch (err) {
			if (axios.isAxiosError(err)) toast.error(err.response?.data?.message)
		} finally {
			didFetch.current = false // 👈 importante para volver a usarlo sin recargar la página
		}
	}

	return { handleEditWorkspace, loading }
}

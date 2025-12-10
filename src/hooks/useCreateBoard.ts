import { API } from '@/constants'
import api from '@/lib/axiosClient'
import { IWorkspace } from '@/types/workspaces'
import axios from 'axios'
import { User } from 'firebase/auth'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

export const useCreateBoard = ({
	setWorkSpaces,
	user,
	backgroundSelected,
}: {
	setWorkSpaces: (value: IWorkspace[]) => void
	user: User | null
	backgroundSelected: string
}) => {
	const [loading, setLoading] = useState(true)
	const t = useTranslations('BoardsPage')
	const didFetch = useRef(false)

	const createDefaultColumns = async (boardId: string) => {
		const defaultColumns = [
			{ name: 'Para hacer', order: 1 },
			{ name: 'En curso', order: 2 },
			{ name: 'Finalizado', order: 3 },
		]

		try {
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

	const handleCreateBoard = async ({
		boardName,
		boardDescription,
		workspaceId,
		resetForm,
	}: {
		boardName: string
		boardDescription: string
		workspaceId: string
		resetForm: () => void
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
			}
		} catch (err) {
			if (axios.isAxiosError(err) && err.status !== 401)
				toast.error(err.response?.data?.message)
		} finally {
			setLoading(false)
			didFetch.current = false // 👈 importante para poder volver a usar el hook en otro submit
		}
	}

	return { handleCreateBoard, loading }
}

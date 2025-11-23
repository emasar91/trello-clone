// hooks/useUpdateColumnName.ts
import { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { API } from '@/constants'
import axios from 'axios'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
	setItems: React.Dispatch<
		React.SetStateAction<Record<string, { title: string; items: Items[] }>>
	>
}

export const useUpdateColumnName = ({ setItems }: Props) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const updateColumnName = useCallback(
		(containerId: string) => async (newName: string) => {
			if (didFetch.current) return
			if (!newName?.trim()) return

			didFetch.current = true
			setLoading(true)

			const titleFixed = newName.trim()

			// 🟡 1) Optimistic UI
			setItems((prev) => ({
				...prev,
				[containerId]: {
					...prev[containerId],
					title: titleFixed,
				},
			}))

			try {
				await axios.put(
					API.updateColumnUrl, // '/api/columns/update'
					{ columnId: containerId, newName: titleFixed },
					{ withCredentials: true }
				)

				toast.success('Columna actualizada')
			} catch (err) {
				console.error(err)
				toast.error('Error al actualizar columna')

				// 🔴 revertir si falla
				setItems((prev) => ({
					...prev,
					[containerId]: {
						...prev[containerId],
						title: prev[containerId].title, // pero acá no tenés el viejo nombre!
					},
				}))
			} finally {
				setLoading(false)
				didFetch.current = false
			}
		},
		[setItems]
	)

	return { updateColumnName, loading }
}

import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import api from '@/lib/axiosClient'
import { API } from '@/constants'
import { useAuth } from '@/context/useAuthContext'
import { useDebounce } from './useDebounce'

export interface SearchCardResult {
	cardId: string
	cardTitle: string
	matchSource: 'title' | 'description' | 'comment'
	snippet: string
	commentAuthor?: string
	column: {
		id: string
		name: string
	}
	board: {
		id: string
		name: string
	}
	workspace: {
		id: string
		name: string
	}
}

export const useSearchCards = () => {
	const { user } = useAuth()

	const [value, setValue] = useState('')
	const debouncedValue = useDebounce(value, 300)

	const [loading, setLoading] = useState(false)
	const [results, setResults] = useState<SearchCardResult[]>([])
	const [hasSearched, setHasSearched] = useState(false)

	useEffect(() => {
		// 🔹 Si se borra el input → reset total
		if (!debouncedValue.trim()) {
			setResults([])
			setHasSearched(false)
			return
		}

		const fetch = async () => {
			try {
				setLoading(true)
				setHasSearched(true)

				const { data } = await api.get(
					`${API.searchCardsUrl}?q=${debouncedValue}`,
					{ withCredentials: true }
				)

				setResults(data ?? [])
			} catch (err) {
				if (axios.isAxiosError(err) && err.response?.status !== 401) {
					toast.error(err.response?.data?.message || 'Error al buscar tarjetas')
				}
			} finally {
				setLoading(false)
			}
		}

		fetch()
	}, [debouncedValue, user?.uid])

	return {
		searchValue: value,
		setSearchValue: setValue,
		results,
		loading,
		hasSearched,

		// ⭐ helpers útiles para la UI
		isTyping: !!value.trim() && value !== debouncedValue && !loading,
	}
}

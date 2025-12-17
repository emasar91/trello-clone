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

/**
 * Hook para buscar tarjetas por texto
 * @param {string} value texto a buscar
 * @param {string} user.uid uid del usuario autenticado
 * @returns {
 *   searchValue: string texto a buscar
 *   setSearchValue: function para setear el valor de searchValue
 *   results: SearchCardResult[] resultados de la busqueda
 *   loading: boolean indica si la busqueda esta en curso
 *   hasSearched: boolean indica si se ha realizado al menos una busqueda
 *   isTyping: boolean indica si el usuario esta escribiendo texto en el input
 * }
 */
export const useSearchCards = () => {
	const { user } = useAuth()

	const [value, setValue] = useState('')
	const debouncedValue = useDebounce(value, 300)

	const [loading, setLoading] = useState(false)
	const [results, setResults] = useState<SearchCardResult[]>([])
	const [hasSearched, setHasSearched] = useState(false)

	useEffect(() => {
		if (!debouncedValue.trim()) {
			setResults([])
			setHasSearched(false)
			return
		}

		const fetch = async () => {
			try {
				setLoading(true)
				setHasSearched(true)

				// 1️⃣ Obtener tarjetas
				const { data } = await api.get(
					`${API.searchCardsUrl}?q=${debouncedValue}`,
					{ withCredentials: true }
				)

				// 2️⃣ Si se encontro correctamente → actualizar estado
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
		isTyping: !!value.trim() && value !== debouncedValue && !loading,
	}
}

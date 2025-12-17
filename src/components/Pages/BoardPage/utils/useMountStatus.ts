import { useEffect, useState } from 'react'

/**
 * useMountStatus es un hook que devuelve un booleano que indica si el componente
 * ha finalizado de montarse.
 * Utiliza un timeout para establecer el estado de montado
 * 500ms despu s de que el componente se monte.
 * @returns {boolean} - El estado de montado del componente.
 */
export const useMountStatus = () => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => setIsMounted(true), 500)

		return () => clearTimeout(timeout)
	}, [])

	return isMounted
}

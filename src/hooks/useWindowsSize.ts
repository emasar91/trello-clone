'use client'
import { useEffect, useState } from 'react'

/**
 * Hook para obtener el ancho de la ventana actual.
 *
 * @returns {number | null} El ancho de la ventana actual.
 */
export function useWindowSize() {
	const [width, setWidth] = useState<number | null>(null)

	useEffect(() => {
		// Evita errores en SSR
		function handleResize() {
			setWidth(window.innerWidth)
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return width
}

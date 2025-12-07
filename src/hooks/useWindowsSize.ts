'use client'
import { useEffect, useState } from 'react'

export function useWindowSize() {
	const [width, setWidth] = useState<number | null>(null)

	useEffect(() => {
		// Evita errores en SSR
		function handleResize() {
			setWidth(window.innerWidth)
		}

		handleResize() // valor inicial
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return width
}

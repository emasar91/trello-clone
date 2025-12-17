'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useThemeStore } from '@/context/useTheme'

/**
 * Componente que envuelve a los hijos con un ThemeProvider
 * para que se pueda utilizar el tema seleccionado en el store.
 * Utiliza el hook useThemeStore para obtener el tema actual.
 * Utiliza el hook useState para controlar si el componente ya ha sido hidratado.
 * Si no ha sido hidratado, no se renderiza nada para evitar un flash incorrecto.
 * Una vez que ha sido hidratado, se vuelve a recalcular el tema
 * con el valor actual del store.
 * @param {React.ReactNode} children - Los hijos que se quieren renderizar.
 * @returns {React.ReactNode} El elemento renderizado con el ThemeProvider.
 */
export function ThemeWrapper({ children }: { children: React.ReactNode }) {
	const { mode, theme, setMode } = useThemeStore()
	const [hydrated, setHydrated] = useState(false)

	useEffect(() => {
		// Hidratar manualmente el store
		useThemeStore.persist.rehydrate()
		setHydrated(true)
	}, [])

	useEffect(() => {
		if (hydrated) {
			setMode(mode) // Recalcular theme una vez cargado
		}
	}, [hydrated, mode, setMode])

	if (!hydrated) return null // Evita flash incorrecto

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}

'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useThemeStore } from '@/context/useTheme'

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

'use client'
import { useThemeStore } from '@/context/useTheme'
import { ThemeProvider } from '@mui/material/styles'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
	const { theme } = useThemeStore()
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

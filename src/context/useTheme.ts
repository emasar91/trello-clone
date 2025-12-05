// themeStore.ts
import { darkTheme, lightTheme } from '@/theme'
import { create } from 'zustand'

type ThemeState = {
	mode: 'light' | 'dark'
	theme: typeof lightTheme
	toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
	mode: 'dark',
	theme: darkTheme,
	toggleTheme: () => {
		const nextMode = get().mode === 'light' ? 'light' : 'dark'
		set({
			mode: nextMode,
			theme: nextMode === 'light' ? lightTheme : darkTheme,
		})
	},
}))

// themeStore.ts
import { darkTheme, lightTheme } from '@/theme'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ThemeState = {
	mode: 'light' | 'dark'
	theme: typeof lightTheme
	setMode: (value: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			mode: 'dark', // default only SSR time
			theme: darkTheme,
			setMode: (value) =>
				set({
					mode: value,
					theme: value === 'light' ? lightTheme : darkTheme,
				}),
		}),
		{
			name: 'theme-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ mode: state.mode }),
			skipHydration: true, // **NO pisa el localStorage en SSR/primer render**
		}
	)
)

import { create } from 'zustand'
import { IStoreTrello } from './interface'

const initialState: IStoreTrello = {
	tabSelected: '',
	drawerOpen: false,
	setTabSelected: () => {},
	setDrawerOpen: () => {},
}

export const useStoreTrello = create<IStoreTrello>((set) => ({
	...initialState,
	setTabSelected: (value) => set((state) => ({ ...state, tabSelected: value })),
	setDrawerOpen: (value) => set((state) => ({ ...state, drawerOpen: value })),
}))

import { IStoreTrello } from '@/types/store'
import { create } from 'zustand'

const initialState: IStoreTrello = {
	tabSelected: '',
	drawerOpen: false,
	boxInfo: null,
	setTabSelected: () => {},
	setDrawerOpen: () => {},
	setBoxInfo: () => {},
}

export const useStoreTrello = create<IStoreTrello>((set) => ({
	...initialState,
	setTabSelected: (value) => set((state) => ({ ...state, tabSelected: value })),
	setDrawerOpen: (value) => set((state) => ({ ...state, drawerOpen: value })),
	setBoxInfo: (value) => set((state) => ({ ...state, boxInfo: value })),
}))

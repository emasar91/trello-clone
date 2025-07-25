import { IStoreTrello } from '@/types/store'
import { create } from 'zustand'

const initialState: IStoreTrello = {
	tabSelected: '',
	drawerOpen: false,
	itemsBoxInfo: null,
	setTabSelected: () => {},
	setDrawerOpen: () => {},
	setItemsBoxInfo: () => {},
}

export const useStoreTrello = create<IStoreTrello>((set) => ({
	...initialState,
	setTabSelected: (value) => set((state) => ({ ...state, tabSelected: value })),
	setDrawerOpen: (value) => set((state) => ({ ...state, drawerOpen: value })),
	setItemsBoxInfo: (value) =>
		set((state) => ({ ...state, itemsBoxInfo: value })),
}))

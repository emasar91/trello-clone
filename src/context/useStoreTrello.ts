import { IStoreTrello } from '@/types/store'
import { create } from 'zustand'

const initialState: IStoreTrello = {
	tabSelected: '',
	drawerOpen: false,
	boxInfo: null,
	openModal: false,
	setTabSelected: () => {},
	setDrawerOpen: () => {},
	setBoxInfo: () => {},
	setOpenModal: () => {},
}

export const useStoreTrello = create<IStoreTrello>((set) => ({
	...initialState,
	setTabSelected: (value) => set((state) => ({ ...state, tabSelected: value })),
	setDrawerOpen: (value) => set((state) => ({ ...state, drawerOpen: value })),
	setBoxInfo: (value) => set((state) => ({ ...state, boxInfo: value })),
	setOpenModal: (value) => set((state) => ({ ...state, openModal: value })),
}))

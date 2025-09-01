import { IStoreTrello } from '@/types/store'
import { create } from 'zustand'

const initialState: IStoreTrello = {
	tabSelected: '',
	drawerOpen: false,
	boxInfo: null,
	openModal: false,
	userInfo: { displayName: '', email: '', photoURL: '' },
	setTabSelected: () => {},
	setDrawerOpen: () => {},
	setBoxInfo: () => {},
	setOpenModal: () => {},
	setUserInfo: () => {},
}

export const useStoreTrello = create<IStoreTrello>((set) => ({
	...initialState,
	setUserInfo: (value) => set((state) => ({ ...state, userInfo: value })),
	setTabSelected: (value) => set((state) => ({ ...state, tabSelected: value })),
	setDrawerOpen: (value) => set((state) => ({ ...state, drawerOpen: value })),
	setBoxInfo: (value) => set((state) => ({ ...state, boxInfo: value })),
	setOpenModal: (value) => set((state) => ({ ...state, openModal: value })),
}))

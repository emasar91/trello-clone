import { IBoardStore } from '@/types/boards'
import { create } from 'zustand'

const initialState: IBoardStore = {
	board: {
		_id: '',
		workspaceId: '',
		userId: '',
		name: '',
		description: '',
		image: '',
		createdAt: null,
		updatedAt: null,
		lastOpenedAt: null,
	},
	columns: [],
	setBoard: () => {},
	setColumns: () => {},
}

export const useBoardStore = create<IBoardStore>((set) => ({
	...initialState,
	setBoard: (value) => set((state) => ({ ...state, board: value })),
	setColumns: (value) => set((state) => ({ ...state, columns: value })),
}))

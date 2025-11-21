import { IBoard, IBoardStore } from '@/types/boards'
import { ICard } from '@/types/card'
import { IColumn } from '@/types/columns'
import { create } from 'zustand'

const initialBoard: IBoard = {
	_id: '',
	workspaceId: '',
	userId: '',
	name: '',
	description: '',
	image: '',
	createdAt: null,
	updatedAt: null,
	lastOpenedAt: null,
}

const initialValue: IBoardStore = {
	board: initialBoard,
	columns: [],
	cardsByColumn: {},
	setBoard: () => {},
	setColumns: () => {},
	setCardsForColumn: () => {},
}

export const useStoreBoard = create<IBoardStore>((set) => ({
	...initialValue,
	// 👉 Set board
	setBoard: (board: IBoard) => set({ board }),

	// 👉 Set columns
	setColumns: (columns: IColumn[]) => set({ columns }),

	// 👉 Set cards (y su orden)
	setCardsForColumn: (columnId: string, cards: ICard[]) =>
		set((state) => ({
			cardsByColumn: { ...state.cardsByColumn, [columnId]: cards },
		})),
}))

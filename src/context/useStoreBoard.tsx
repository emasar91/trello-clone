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
	selectedCardId: '',
}

const initialValue: IBoardStore = {
	board: initialBoard,
	columns: [],
	cardsByColumn: {},
	selectedCardId: '',
	setBoard: () => {},
	setColumns: () => {},
	setCardsForColumn: () => {},
	setSelectedCardId: () => {},
	setCardsByColumn: () => {},
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
	// 👉 Set selected card id
	setSelectedCardId: (selectedCardId: string) => set({ selectedCardId }),
	// 👉 Set cards by column
	setCardsByColumn: (cardsByColumn: Record<string, ICard[]>) =>
		set({ cardsByColumn }),
}))

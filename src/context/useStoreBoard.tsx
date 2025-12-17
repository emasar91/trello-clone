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
	setBoard: (board: IBoard) => set({ board }),
	setColumns: (columns: IColumn[]) => set({ columns }),
	setCardsForColumn: (columnId: string, cards: ICard[]) =>
		set((state) => ({
			cardsByColumn: { ...state.cardsByColumn, [columnId]: cards },
		})),
	setSelectedCardId: (selectedCardId: string) => set({ selectedCardId }),
	setCardsByColumn: (cardsByColumn: Record<string, ICard[]>) =>
		set({ cardsByColumn }),
}))

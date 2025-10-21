import { create } from 'zustand'
import { IBoard, IBoardStore } from '@/types/boards'

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

const initialState: IBoardStore = {
	board: initialBoard,
	columns: [],
	cardsByColumn: {},
	setBoard: () => {},
	setColumns: () => {},
	setCardsForColumn: () => {},
	moveCard: () => {},
}

export const useStoreBoard = create<IBoardStore>((set, get) => ({
	...initialState,
	setBoard: (board) => set({ board }),

	setColumns: (columns) => set({ columns }),

	setCardsForColumn: (columnId, cards) =>
		set((state) => ({
			cardsByColumn: { ...state.cardsByColumn, [columnId]: cards },
		})),

	moveCard: (cardId, fromColumnId, toColumnId) => {
		const { cardsByColumn } = get()
		const fromCards = cardsByColumn[fromColumnId] || []
		const toCards = cardsByColumn[toColumnId] || []

		const movedCard = fromCards.find((c) => c._id.toString() === cardId)
		if (!movedCard) return

		set({
			cardsByColumn: {
				...cardsByColumn,
				[fromColumnId]: fromCards.filter((c) => c._id.toString() !== cardId),
				[toColumnId]: [...toCards, { ...movedCard, columnId: toColumnId }],
			},
		})
	},
}))

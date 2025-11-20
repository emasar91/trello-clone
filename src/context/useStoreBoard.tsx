import { create } from 'zustand'
import { IBoard, IBoardStore, IColumn, ICard } from '@/types'

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

export const useStoreBoard = create<IBoardStore>((set, get) => ({
	board: initialBoard,
	columns: [],
	cardsByColumn: {}, // { columnId: ICard[] }
	cardsOrder: {}, // { columnId: string[] }

	// 👉 Set board
	setBoard: (board) => set({ board }),

	// 👉 Set columns
	setColumns: (columns) => set({ columns }),

	// 👉 Set cards (y su orden)
	setCardsForColumn: (columnId, cards) =>
		set((state) => ({
			cardsByColumn: { ...state.cardsByColumn, [columnId]: cards },
			cardsOrder: {
				...state.cardsOrder,
				[columnId]: cards.map((c) => c._id.toString()),
			},
		})),

	// 👉 Mover card dentro o entre columnas (DnD)
	moveCard: (cardId, fromColumnId, toColumnId, newIndex) => {
		const { cardsByColumn, cardsOrder } = get()

		const fromCards = cardsByColumn[fromColumnId] || []
		const toCards = cardsByColumn[toColumnId] || []

		const fromOrder = cardsOrder[fromColumnId] || []
		const toOrder = cardsOrder[toColumnId] || []

		// 1. Sacar la card
		const movedCard = fromCards.find((c) => c._id.toString() === cardId)
		if (!movedCard) return

		// 2. Actualizar arrays
		const updatedFromCards = fromCards.filter(
			(c) => c._id.toString() !== cardId
		)
		const updatedFromOrder = fromOrder.filter((id) => id !== cardId)

		const updatedToCards = [...toCards]
		updatedToCards.splice(newIndex, 0, { ...movedCard, columnId: toColumnId })

		const updatedToOrder = [...toOrder]
		updatedToOrder.splice(newIndex, 0, cardId)

		// 3. Setear estado final
		set({
			cardsByColumn: {
				...cardsByColumn,
				[fromColumnId]: updatedFromCards,
				[toColumnId]: updatedToCards,
			},
			cardsOrder: {
				...cardsOrder,
				[fromColumnId]: updatedFromOrder,
				[toColumnId]: updatedToOrder,
			},
		})
	},

	// 👉 (Opcional) actualizar contenido de una card
	updateCardContent: (columnId, cardId, newData) => {
		set((state) => ({
			cardsByColumn: {
				...state.cardsByColumn,
				[columnId]: state.cardsByColumn[columnId].map((card) =>
					card._id === cardId ? { ...card, ...newData } : card
				),
			},
		}))
	},
}))

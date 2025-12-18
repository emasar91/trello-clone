export interface IBoard {
	_id: ObjectId
	workspaceId: ObjectId
	userId: ObjectId
	name: string
	description?: string
	image?: string
	createdAt: Date | null
	updatedAt: Date | null
	lastOpenedAt: Date | null
	selectedCardId: string
}

interface IBoardStore {
	board: IBoard
	columns: IColumn[]
	cardsByColumn: Record<string, ICard[]>
	selectedCardId: string
	setBoard: (board: IBoard) => void
	setColumns: (columns: IColumn[]) => void
	setCardsForColumn: (columnId: string, cards: ICard[]) => void
	setSelectedCardId: (cardId: string) => void
	setCardsByColumn: (cardsByColumn: Record<string, ICard[]>) => void
}

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
}

interface IBoardStore {
	board: IBoard
	columns: IColumn[]
	cardsByColumn: Record<string, ICard[]> // cards agrupadas por columnId
	setBoard: (board: IBoard) => void
	setColumns: (columns: IColumn[]) => void
	setCardsForColumn: (columnId: string, cards: ICard[]) => void
	moveCard: (cardId: string, fromColumnId: string, toColumnId: string) => void
}

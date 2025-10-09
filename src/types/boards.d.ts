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

export interface IBoardStore {
	board: IBoard
	setBoard: (value: IBoard) => void
	columns: IColumn[]
	setColumns: (value: IColumn[]) => void
}

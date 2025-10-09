export interface IColumn {
	_id?: ObjectId
	boardId: ObjectId
	userId: ObjectId
	name: string
	order: number
	createdAt: Date | null
	updatedAt: Date | null
}

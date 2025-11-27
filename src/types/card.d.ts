import { ObjectId } from 'mongodb'

export interface ICardHistory {
	fromColumnId: ObjectId | null
	toColumnId: ObjectId
	at: Date
	byUserId: ObjectId | null
}

export interface ICardComment {
	_id: string
	authorId: string | ObjectId
	text: string
	createdAt: Date
	editedAt: Date | null
	authorName: string | ObjectId
}

export interface ICard {
	_id: ObjectId
	boardId: ObjectId
	columnId: ObjectId
	userId: ObjectId
	title: string
	description: string | null
	priorityColor: string[] | null
	createdAt: Date
	updatedAt: Date | null
	history: ICardHistory[]
	comments: ICardComment[]
	order: number
}

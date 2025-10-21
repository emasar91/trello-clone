import { ObjectId } from 'mongodb'

export interface ICardHistory {
	fromColumnId: ObjectId | null
	toColumnId: ObjectId
	at: Date
	byUserId: ObjectId | null
}

export interface ICardComment {
	authorId: ObjectId
	text: string
	createdAt: Date
	editedAt: Date | null
}

export interface ICardModification {
	field: string
	oldValue: string | object | null
	newValue: string | object | null
	at: Date
	byUserId: ObjectId | null
}

export interface ICard {
	_id: ObjectId
	boardId: ObjectId
	columnId: ObjectId
	userId: ObjectId
	title: string
	description: string | null
	priorityColor: string | null
	createdAt: Date
	updatedAt: Date | null
	history: ICardHistory[]
	comments: ICardComment[]
	modifications: ICardModification[]
	order: number
}

import { ObjectId } from 'mongodb'

export interface IWorkspace {
	avatarColor: string
	createdAt: Date
	description: string
	lastOpenedAt: null | Date
	name: string
	updatedAt: null | Date
	userId: string
	_id: ObjectId
	boards: IBoard[]
}

export interface IBoard {
	name: string
	_id: ObjectId
	image: string
	description: string
	lastOpenedAt: null | Date
	boardId: ObjectId
}

export interface IBoardDocument {
	_id: ObjectId
	workspaceId: ObjectId
	userId: ObjectId
	name: string
	description?: string
	createdAt: Date
	updatedAt: Date | null
	lastOpenedAt: Date | null
	image: string
}

export interface IWorkspaceStore {
	workspaces: IWorkspace[]
	setWorkSpaces: (value: IWorkspace[]) => void
}

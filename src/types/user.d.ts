export interface IUserInfo {
	displayName: string
	email: string
	photoURL: string
}

export interface IUser {
	_id: ObjectId
	uid: string
	username: string
	email: string
	photoURL: string
	workspaces: IWorkspace[]
	role: string
	fecha_creacion: Date
	lastSeenAt: null | Date
}

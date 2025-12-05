db.createCollection('users', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: ['uid', 'email', 'fecha_creacion'],
			additionalProperties: true,
			properties: {
				uid: { bsonType: 'string', description: 'UID único de Firebase' },
				nombre: { bsonType: ['string', 'null'], description: 'displayName' },
				username: { bsonType: ['string', 'null'], maxLength: 30 },
				email: {
					bsonType: 'string',
					pattern: '^.+@.+\\..+$',
					description: 'email válido',
				},
				password_hash: { bsonType: ['string', 'null'] },
				photoURL: { bsonType: ['string', 'null'] },
				provider: { bsonType: ['string', 'null'] },
				metadata: { bsonType: ['object', 'null'], additionalProperties: true },
				workspaces: {
					bsonType: ['array'],
					items: {
						bsonType: 'object',
						properties: {
							id: { bsonType: 'objectId' },
							name: { bsonType: 'string' },
						},
					},
				},
				role: {
					bsonType: 'string',
					enum: ['user', 'admin', 'owner'],
					description: 'rol',
				},
				fecha_creacion: { bsonType: 'date' },
				lastSeenAt: { bsonType: ['date', 'null'] },
			},
		},
	},
	validationLevel: 'strict',
	validationAction: 'error',
})

db.createCollection('workspaces', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: ['userId', 'name', 'fecha_creacion'],
			additionalProperties: true,
			properties: {
				userId: { bsonType: 'objectId' },
				name: { bsonType: 'string' },
				description: { bsonType: ['string', 'null'] },
				createdAt: { bsonType: 'date' },
				updatedAt: { bsonType: ['date', 'null'] },
				lastOpenedAt: { bsonType: ['date', 'null'] },
			},
		},
	},
	validationLevel: 'strict',
	validationAction: 'error',
})

db.createCollection('boards', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: ['workspaceId', 'name', 'fecha_creacion'],
			additionalProperties: true,
			properties: {
				workspaceId: { bsonType: 'objectId' },
				name: { bsonType: 'string' },
				description: { bsonType: ['string', 'null'] },
				createdAt: { bsonType: 'date' },
				updatedAt: { bsonType: ['date', 'null'] },
				lastOpenedAt: { bsonType: ['date', 'null'] },
			},
		},
	},
	validationLevel: 'strict',
	validationAction: 'error',
})

db.createCollection('columns', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: ['boardId', 'name', 'fecha_creacion'],
			additionalProperties: true,
			properties: {
				boardId: { bsonType: 'objectId' },
				name: { bsonType: 'string' },
				position: {
					bsonType: ['double', 'int'],
					description: 'orden/posición',
				},
				createdAt: { bsonType: 'date' },
				updatedAt: { bsonType: ['date', 'null'] },
			},
		},
	},
	validationLevel: 'strict',
	validationAction: 'error',
})

db.createCollection('cards', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: ['boardId', 'columnId', 'title', 'fecha_creacion'],
			additionalProperties: true,
			properties: {
				boardId: { bsonType: 'objectId' },
				columnId: { bsonType: 'objectId' },
				title: { bsonType: 'string' },
				description: { bsonType: ['string', 'null'] },
				priorityColor: {
					bsonType: ['string', 'null'],
					description: 'rojo/amarillo/verde o hex',
				},
				createdAt: { bsonType: 'date' },
				updatedAt: { bsonType: ['date', 'null'] },

				// comentarios embebidos (puede crecer; si esperás muchos comentarios, considerá colección aparte)
				comments: {
					bsonType: ['array'],
					items: {
						bsonType: 'object',
						required: ['authorId', 'text', 'createdAt'],
						properties: {
							authorId: { bsonType: 'objectId' },
							text: { bsonType: 'string' },
							createdAt: { bsonType: 'date' },
							editedAt: { bsonType: ['date', 'null'] },
						},
					},
				},

				// cambios generales (audit trail)
				modifications: {
					bsonType: ['array'],
					items: {
						bsonType: 'object',
						required: ['field', 'oldValue', 'newValue', 'at'],
						properties: {
							field: { bsonType: 'string' },
							oldValue: { bsonType: ['string', 'object', 'null'] },
							newValue: { bsonType: ['string', 'object', 'null'] },
							at: { bsonType: 'date' },
							byUserId: { bsonType: ['objectId', 'null'] },
						},
					},
				},
			},
		},
	},
	validationLevel: 'strict',
	validationAction: 'error',
})

// 3) Índices

// users: unique uid y unique email (sparse)
db.users.createIndex({ uid: 1 }, { unique: true, name: 'uid_unique' })
db.users.createIndex(
	{ email: 1 },
	{ unique: true, sparse: true, name: 'email_unique' }
)
db.users.createIndex(
	{ username: 1 },
	{ unique: true, sparse: true, name: 'username_unique' }
)

// workspaces: unique name por user
db.workspaces.createIndex(
	{ userId: 1, name: 1 },
	{ unique: true, name: 'workspace_user_name_unique' }
)
db.workspaces.createIndex({ userId: 1 })

// boards: unique name por workspace
db.boards.createIndex(
	{ workspaceId: 1, name: 1 },
	{ unique: true, name: 'board_workspace_name_unique' }
)
db.boards.createIndex({ workspaceId: 1, lastOpenedAt: -1 })

// columns: unique name por board
db.columns.createIndex(
	{ boardId: 1, name: 1 },
	{ unique: true, name: 'column_board_name_unique' }
)
db.columns.createIndex({ boardId: 1, position: 1 })

// cards: título único por board (evita duplicados de título en mismo tablero)
db.cards.createIndex(
	{ boardId: 1, title: 1 },
	{ unique: true, name: 'card_board_title_unique' }
)
db.cards.createIndex({ boardId: 1, columnId: 1 })
db.cards.createIndex({ createdAt: -1 })

import { ObjectId } from 'mongodb'

export const toObjectId = (value: string | ObjectId) => {
	try {
		const objectId = new ObjectId(value)
		return objectId
	} catch {
		return value // si ya es un ObjectId válido
	}
}

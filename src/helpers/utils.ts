import { ObjectId } from 'mongodb'

export const toObjectId = (value: string | ObjectId) => {
	try {
		return new ObjectId(value)
	} catch {
		return value // si ya es un ObjectId válido
	}
}

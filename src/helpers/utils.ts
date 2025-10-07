import { ObjectId } from 'mongodb'

const toObjectId = (value: string | ObjectId) => {
	try {
		return new ObjectId(value)
	} catch {
		return value // si ya es un ObjectId válido
	}
}

export { toObjectId }

import { ObjectId } from 'mongodb'

export const toObjectId = (value: string | ObjectId): ObjectId => {
	// If it's already an ObjectId, return it
	if (value instanceof ObjectId) {
		return value
	}

	// Validate that the string is a valid ObjectId format
	if (!ObjectId.isValid(value)) {
		throw new Error(
			`Invalid ObjectId format: "${value}". Expected a 24 character hex string, 12 byte Uint8Array, or an integer.`
		)
	}

	// Convert string to ObjectId
	return new ObjectId(value)
}

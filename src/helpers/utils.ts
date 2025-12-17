import { ObjectId } from 'mongodb'

/**
 * Converts a given string or ObjectId to a valid ObjectId.
 * If the given value is already an ObjectId, it is returned as is.
 * If the given value is a string, it is validated to ensure it is a valid ObjectId format (24 character hex string, 12 byte Uint8Array, or an integer).
 * If the given value is invalid, an Error is thrown.
 * @param {string | ObjectId} value - The value to convert to an ObjectId.
 * @returns {ObjectId} - The converted ObjectId.
 * @throws {Error} - If the given value is invalid.
 */
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

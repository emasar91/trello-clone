import { ObjectId } from 'mongodb'

/**
 * Convierte un valor dado a un ObjectId válido.
 * Si el valor dado ya es un ObjectId, se devuelve como está.
 * Si el valor dado es una cadena, se valida para asegurarse de que sea un formato ObjectId válido (24 caracteres hex, 12 bytes Uint8Array, o un entero).
 * Si el valor dado es inválido, se lanza un Error.
 * @param {string | ObjectId} value - El valor a convertir en ObjectId.
 * @returns {ObjectId} - El ObjectId convertido.
 * @throws {Error} - Si el valor dado es inválido.
 */
export const toObjectId = (value: string | ObjectId): ObjectId => {
	// Si el valor es ya un ObjectId, devuélvelo como está
	if (value instanceof ObjectId) {
		return value
	}

	// Validar que la cadena sea un formato ObjectId válido
	if (!ObjectId.isValid(value)) {
		throw new Error(
			`Invalid ObjectId format: "${value}". Expected a 24 character hex string, 12 byte Uint8Array, or an integer.`
		)
	}

	// Convertir string a ObjectId
	return new ObjectId(value)
}

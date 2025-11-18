// utils/getNextContainerId.ts
// Genera el próximo id basado en los ids actuales.
// Si los ids son letras únicas (A..Z) calcula siguiente letra basada en el máximo charCode.
// Si no puede derivar una letra, genera un id con prefijo 'col-' + timestamp.

export function getNextContainerIdFromKeys(existingKeys: string[]): string {
	if (!existingKeys || existingKeys.length === 0) return 'A'

	// Filtramos solo keys de 1 char (A-Z)
	const singleCharKeys = existingKeys.filter(
		(k) => k.length === 1 && /^[A-Z]$/.test(k)
	)

	if (singleCharKeys.length > 0) {
		// Tomamos la máxima letra (por charCode)
		const maxCharCode = Math.max(...singleCharKeys.map((k) => k.charCodeAt(0)))
		// Si aún hay letras libres hasta 'Z' -> siguiente, sino generamos fallback
		if (maxCharCode < 'Z'.charCodeAt(0)) {
			return String.fromCharCode(maxCharCode + 1)
		}
		// si ya tenemos Z, buscamos huecos (A..Z) y si no hay, fallback
		for (let code = 'A'.charCodeAt(0); code <= 'Z'.charCodeAt(0); code++) {
			const letter = String.fromCharCode(code)
			if (!existingKeys.includes(letter)) return letter
		}
	}

	// fallback: col-<timestamp>
	return `col-${Date.now().toString(36)}`
}

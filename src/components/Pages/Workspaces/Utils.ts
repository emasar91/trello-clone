import { AVATAR_BACKGROUND } from '@/constants'

/**
 * Función que devuelve un color aleatorio para el avatar de un usuario
 * @returns {string} - Un string que representa el color aleatorio
 */
export const getRandomAvatarColor = (): string => {
	const total = AVATAR_BACKGROUND.length

	// 1️⃣ índice aleatorio
	const index = Math.floor(Math.random() * total)

	// 2️⃣ color base
	const color1 = AVATAR_BACKGROUND[index]

	// 3️⃣ color desplazado +3 (con vuelta)
	const color2 = AVATAR_BACKGROUND[(index + 3) % total]

	// 4️⃣ Devuelve el gradiente
	return `linear-gradient(0deg, ${color1} 0%, ${color2} 100%)`
}

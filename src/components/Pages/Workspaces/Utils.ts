import { AVATAR_BACKGROUND } from '@/constants'

/**
 * Función que devuelve un color aleatorio para el avatar de un usuario
 * @returns {string} - Un string que representa el color aleatorio
 */
export const getRandomAvatarColor = (): string => {
	const total = AVATAR_BACKGROUND.length

	// índice aleatorio
	const index = Math.floor(Math.random() * total)

	// color base
	const color1 = AVATAR_BACKGROUND[index]

	// color desplazado +3 (con vuelta)
	const color2 = AVATAR_BACKGROUND[(index + 3) % total]

	return `linear-gradient(0deg, ${color1} 0%, ${color2} 100%)`
}

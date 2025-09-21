import { AVATAR_BACKGROUND } from '@/constants'

export const getRandomAvatarColor = (): string => {
	return `linear-gradient(0deg,${
		AVATAR_BACKGROUND[Math.floor(Math.random() * 6) + 1]
	} 0%, ${AVATAR_BACKGROUND[Math.floor(Math.random() * 6) + 1]} 100%)`
}

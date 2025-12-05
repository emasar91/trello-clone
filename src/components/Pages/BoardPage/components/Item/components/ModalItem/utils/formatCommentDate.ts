export const formatCommentDate = (date: Date | string, locale: string) => {
	const now = new Date()
	const target = typeof date === 'string' ? new Date(date) : date

	const diffMs = now.getTime() - target.getTime()
	const diffMinutes = Math.floor(diffMs / 1000 / 60)
	const diffHours = Math.floor(diffMinutes / 60)

	if (diffMinutes < 1) {
		return locale === 'es' ? 'recientemente' : 'recently'
	}

	// 📌 Menos de 1 hora
	if (diffMinutes < 60) {
		return locale === 'es'
			? `hace ${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''}`
			: `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`
	}

	// 📌 Entre 1 hora y 24 hs
	if (diffHours < 24) {
		return locale === 'es'
			? `hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`
			: `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
	}

	// 📌 Más de un día → formatear fecha
	const day = target.getDate()
	const months = [
		{ en: 'ene', es: 'ene' },
		{ en: 'feb', es: 'feb' },
		{ en: 'mar', es: 'mar' },
		{ en: 'abr', es: 'abr' },
		{ en: 'may', es: 'may' },
		{ en: 'jun', es: 'jun' },
		{ en: 'jul', es: 'jul' },
		{ en: 'ago', es: 'ago' },
		{ en: 'sep', es: 'sep' },
		{ en: 'oct', es: 'oct' },
		{ en: 'nov', es: 'nov' },
		{ en: 'dic', es: 'dic' },
	]
	const month =
		locale === 'es'
			? months[target.getMonth()].es
			: months[target.getMonth()].en
	const year = target.getFullYear()

	const hours = String(target.getHours()).padStart(2, '0')
	const minutes = String(target.getMinutes()).padStart(2, '0')

	return `${day} ${month} ${year}, ${hours}:${minutes}`
}

export const formatCommentDate = (date: Date | string) => {
	const now = new Date()
	const target = typeof date === 'string' ? new Date(date) : date

	const diffMs = now.getTime() - target.getTime()
	const diffMinutes = Math.floor(diffMs / 1000 / 60)
	const diffHours = Math.floor(diffMinutes / 60)

	if (diffMinutes < 1) {
		return 'hace poco'
	}

	// 📌 Menos de 1 hora
	if (diffMinutes < 60) {
		return `hace ${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''}`
	}

	// 📌 Entre 1 hora y 24 hs
	if (diffHours < 24) {
		return `hace ${diffHours} hs`
	}

	// 📌 Más de un día → formatear fecha
	const day = target.getDate()
	const months = [
		'ene',
		'feb',
		'mar',
		'abr',
		'may',
		'jun',
		'jul',
		'ago',
		'sep',
		'oct',
		'nov',
		'dic',
	]
	const month = months[target.getMonth()]
	const year = target.getFullYear()

	const hours = String(target.getHours()).padStart(2, '0')
	const minutes = String(target.getMinutes()).padStart(2, '0')

	return `${day} ${month} ${year}, ${hours}:${minutes}`
}

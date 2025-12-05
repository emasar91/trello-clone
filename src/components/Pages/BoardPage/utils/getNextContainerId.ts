import type { Items } from '../MultipleContainers/MultipleContainers'

export function getNextContainerId(items: Items) {
	const containerIds = Object.keys(items)

	const lastId =
		containerIds
			.map((id) => parseInt(id.replace('col-', ''), 10))
			.filter((n) => !isNaN(n))
			.sort((a, b) => a - b)
			.pop() || 0

	return `col-${lastId + 1}`
}

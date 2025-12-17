import type { Items } from '../MultipleContainers/MultipleContainers'

/**
 * Returns the id of the next column in the items object.
 * If there are no items, returns 'col-1'.
 * If there are items, returns the id of the column with the highest id plus 1.
 * @param {Items} items - The items object containing the columns.
 * @returns {string} The id of the next column.
 */
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

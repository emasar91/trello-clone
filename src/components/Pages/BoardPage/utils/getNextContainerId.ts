import type { Items } from '../MultipleContainers/MultipleContainers'

/**
 * getNextContainerId es una funcion que retorna el id de la siguiente columna en el objeto items.
 * Si no hay items, retorna 'col-1'.
 * Si hay items, retorna el id de la columna con el mayor id mas 1.
 * @param {Items} items - El objeto items que contiene las columnas.
 * @returns {string} El id de la siguiente columna.
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

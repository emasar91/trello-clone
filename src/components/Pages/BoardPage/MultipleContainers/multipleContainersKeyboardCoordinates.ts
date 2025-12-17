import {
	closestCorners,
	getFirstCollision,
	KeyboardCode,
	DroppableContainer,
	KeyboardCoordinateGetter,
} from '@dnd-kit/core'

const directions: string[] = [
	KeyboardCode.Down,
	KeyboardCode.Right,
	KeyboardCode.Up,
	KeyboardCode.Left,
]

/**
 * coordinateGetter es una funcion que determina las nuevas coordenadas para un item cuando
 * el usuario presiona una tecla de flecha. Considera el item activo, los rectangulos
 * droppables, los contenedores droppables y el rectangulo de colision.
 * @param {KeyboardEvent} event - El evento que desencadenó la llamada a la funcion.
 * @param {{ active: DraggableItem, droppableRects: Map<string, Rectangle>, droppableContainers: Map<string, DroppableContainer>, collisionRect: Rectangle | null }} context - El objeto de contexto que contiene el item activo, los rectangulos droppables, los contenedores droppables y el rectangulo de colision.
 * @returns {x: number, y: number} | undefined - las nuevas coordenadas para el item. Si el item no debe ser movido, retorna undefined.
 */
export const coordinateGetter: KeyboardCoordinateGetter = (
	event,
	{ context: { active, droppableRects, droppableContainers, collisionRect } }
) => {
	if (directions.includes(event.code)) {
		event.preventDefault()

		if (!active || !collisionRect) {
			return
		}

		const filteredContainers: DroppableContainer[] = []

		droppableContainers.getEnabled().forEach((entry) => {
			if (!entry || entry?.disabled) {
				return
			}

			const rect = droppableRects.get(entry.id)

			if (!rect) {
				return
			}

			const data = entry.data.current

			if (data) {
				const { type, children } = data

				if (type === 'container' && children?.length > 0) {
					if (active.data.current?.type !== 'container') {
						return
					}
				}
			}

			switch (event.code) {
				case KeyboardCode.Down:
					if (collisionRect.top < rect.top) {
						filteredContainers.push(entry)
					}
					break
				case KeyboardCode.Up:
					if (collisionRect.top > rect.top) {
						filteredContainers.push(entry)
					}
					break
				case KeyboardCode.Left:
					if (collisionRect.left >= rect.left + rect.width) {
						filteredContainers.push(entry)
					}
					break
				case KeyboardCode.Right:
					if (collisionRect.left + collisionRect.width <= rect.left) {
						filteredContainers.push(entry)
					}
					break
			}
		})

		const collisions = closestCorners({
			active,
			collisionRect: collisionRect,
			droppableRects,
			droppableContainers: filteredContainers,
			pointerCoordinates: null,
		})
		const closestId = getFirstCollision(collisions, 'id')

		if (closestId != null) {
			const newDroppable = droppableContainers.get(closestId)
			const newNode = newDroppable?.node.current
			const newRect = newDroppable?.rect.current

			if (newNode && newRect) {
				if (newDroppable.id === 'placeholder') {
					return {
						x: newRect.left + (newRect.width - collisionRect.width) / 2,
						y: newRect.top + (newRect.height - collisionRect.height) / 2,
					}
				}

				if (newDroppable.data.current?.type === 'container') {
					return {
						x: newRect.left + 20,
						y: newRect.top + 74,
					}
				}

				return {
					x: newRect.left,
					y: newRect.top,
				}
			}
		}
	}

	return undefined
}

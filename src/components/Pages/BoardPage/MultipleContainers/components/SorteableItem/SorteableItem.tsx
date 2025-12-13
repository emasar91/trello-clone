import { useState } from 'react'
import { Item } from '../../../components'
import ModalItem from '../../../components/Item/components/ModalItem/ModalItem'
import { useMountStatus } from '../../../utils/useMountStatus'
import { useSortable } from '@dnd-kit/sortable'
import { UniqueIdentifier } from '@dnd-kit/core'
import { Items } from '../../MultipleContainers'
import type { Props as ItemProps } from '../../../components/Item/Item'
import { ICardComment } from '@/types/card'

interface SortableItemProps {
	containerId: UniqueIdentifier
	id: UniqueIdentifier
	index: number
	handle: boolean
	disabled?: boolean
	displayValue: React.ReactNode
	selectedItemId: UniqueIdentifier
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
	tags: string[] | null
	description: string | null
	comments: ICardComment[]
	style(args: {
		value: UniqueIdentifier
		index: number
		overIndex: number
		isDragging: boolean
		containerId: UniqueIdentifier
		isSorting: boolean
		isDragOverlay: boolean
	}): React.CSSProperties
	getIndex(id: UniqueIdentifier): number
	renderItem?: ItemProps['renderItem']
	wrapperStyle({ index }: { index: number }): React.CSSProperties
}

/**
 * Componente que representa un elemento ordenable (drag & drop).
 * Envuelve el componente `Item` y le añade la lógica de `useSortable`.
 * También maneja la apertura del modal de detalle (`ModalItem`).
 *
 * @param props - Propiedades del componente
 * @param props.containerId - ID del contenedor (columna) donde está el item
 * @param props.id - ID único del item (card)
 * @param props.index - Índice del item en la lista
 * @param props.handle - Si true, muestra un "handle" para arrastrar
 * @param props.disabled - Si true, deshabilita el drag & drop
 * @param props.displayValue - Contenido a mostrar en el item (título de la card)
 * @param props.selectedItemId - ID del item seleccionado (para el modal)
 * @param props.setItems - Función para actualizar el estado global de items
 * @param props.items - Estado global de items (necesario para el modal)
 * @param props.tags - Etiquetas asociadas al item
 * @param props.style - Función para calcular estilos dinámicos
 * @param props.getIndex - Función para obtener el índice de un item dado su ID
 * @param props.renderItem - Render prop opcional para personalizar el item
 * @param props.wrapperStyle - Función para estilos del wrapper
 */
const SortableItem = ({
	disabled,
	id,
	index,
	handle,
	displayValue,
	renderItem,
	style,
	containerId,
	getIndex,
	wrapperStyle,
	selectedItemId,
	setItems,
	items,
	tags,
	description,
	comments,
}: SortableItemProps) => {
	const {
		setNodeRef,
		listeners,
		isDragging,
		isSorting,
		over,
		overIndex,
		transform,
		transition,
	} = useSortable({
		id,
	})
	const mounted = useMountStatus()
	const mountedWhileDragging = isDragging && !mounted
	const [openModalItem, setOpenModalItem] = useState(false)

	return (
		<>
			<Item
				ref={disabled ? undefined : setNodeRef}
				value={displayValue}
				dragging={isDragging}
				sorting={isSorting}
				handle={handle}
				index={index}
				wrapperStyle={wrapperStyle({ index })}
				style={{
					...style({
						index,
						value: id,
						isDragging,
						isSorting,
						overIndex: over ? getIndex(over.id) : overIndex,
						containerId,
						isDragOverlay: false,
					}),
				}}
				tags={tags}
				transition={transition}
				transform={transform}
				fadeIn={mountedWhileDragging}
				listeners={listeners}
				renderItem={renderItem}
				setOpenModalItem={setOpenModalItem}
				description={description}
				comments={comments}
			/>
			<ModalItem
				open={openModalItem}
				onClose={() => setOpenModalItem(false)}
				cardId={selectedItemId}
				columnId={containerId}
				items={items}
				setItems={setItems}
			/>
		</>
	)
}

export default SortableItem

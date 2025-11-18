// MultipleContainers.tsx
import React, {
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
	useMemo,
} from 'react'
import {
	CancelDrop,
	closestCenter,
	pointerWithin,
	rectIntersection,
	CollisionDetection,
	DndContext,
	getFirstCollision,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	Modifiers,
	UniqueIdentifier,
	useSensors,
	useSensor,
	MeasuringStrategy,
	KeyboardCoordinateGetter,
	type DragOverEvent,
	type DragEndEvent,
} from '@dnd-kit/core'
import {
	AnimateLayoutChanges,
	SortableContext,
	arrayMove,
	defaultAnimateLayoutChanges,
	verticalListSortingStrategy,
	horizontalListSortingStrategy,
	useSortable,
	SortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { coordinateGetter as multipleContainersCoordinateGetter } from '../utils/multipleContainersKeyboardCoordinates'

import { Item } from '../components/Item'
import { Container } from '../components/Container'
import type { ContainerProps } from '../components/Container'

import { createRange } from '../utils/createRange'
import { unstable_batchedUpdates } from 'react-dom'
import { Box } from '@mui/material'
import {
	MultipleContainersAddButtonCardStyles,
	MultipleContainersAddButtonColumnStyles,
	MultipleContainersContainerStyles,
} from './MultipleContainers.styles'
import { Plus } from '@/public/assets/icons/Plus'
import CreateCardInput from '../components/TextAreaCustom/TextAreaCustom'

import { getNextContainerIdFromKeys } from '../utils/getNextContainerId'

/**
 * Mejoras aplicadas:
 * - Medición droppable: WhileDragging (más liviano que Always)
 * - Memoización de contenedores renderizados
 * - Callbacks memoizados
 * - Mantengo el Container que ya usás (no lo cambié)
 * - Soporte para renombrar columna (onRename en Container)
 * - Menos trabajo en animateLayoutChanges para reducir repaints
 */

/* -------------------------
   animateLayoutChanges (light)
   ------------------------- */
/* Usamos defaultAnimateLayoutChanges pero solo activamos cuando realmente se está
   arrastrando un elemento (optimiza re-layouts innecesarios). */
const animateLayoutChanges: AnimateLayoutChanges = (args) =>
	defaultAnimateLayoutChanges({ ...args, wasDragging: !!args.isDragging })

/* -------------------------
   Types
   ------------------------- */
type Items = Record<UniqueIdentifier, UniqueIdentifier[]>
type ItemStyleArgs = {
	index: number
	value: UniqueIdentifier
	isDragging: boolean
	isSorting: boolean
	overIndex: number
	containerId: UniqueIdentifier
	isDragOverlay: boolean
}

/* -------------------------
   DroppableContainer
   ------------------------- */
/*
  Usamos la versión local (ligera) que llama a tu Container sin cambiar su API.
  Recibe `label` y `onEditTitle` para renombrar.
*/
function DroppableContainer({
	children,
	id,
	items,
	style,
	setItems,
	label,
	onRemove,
	onEditTitle,
}: ContainerProps & {
	id: UniqueIdentifier
	items: UniqueIdentifier[]
	style?: React.CSSProperties
	setItems: React.Dispatch<SetStateAction<Items>>
	label: string
	onRemove?: () => void
	onEditTitle: (value: string) => void
}) {
	const {
		attributes,
		isDragging,
		listeners,
		setNodeRef,
		transition,
		transform,
	} = useSortable({
		id,
		data: {
			type: 'container',
			children: items,
		},
		// animateLayoutChanges ligero (ver arriba)
		animateLayoutChanges,
	})

	const [showAddButton, setShowAddButton] = useState(false)

	const handleAddButton = useCallback(() => setShowAddButton(true), [])
	const removeAddButton = useCallback(() => setShowAddButton(false), [])

	const handleCreateCard = useCallback(
		(value: string) => {
			setItems((prev) => ({
				...prev,
				[id]: [...(prev[id] ?? []), value],
			}))
			// opcional: cerrar el input después de crear
			removeAddButton()
		},
		[id, setItems, removeAddButton]
	)

	// onRename se pasa al Container como onRename (tu Container ya lo soporta)
	// No intentamos reemplazar el Container: solo le pasamos props.

	return (
		<Container
			ref={setNodeRef}
			style={{
				...style,
				transition,
				transform: CSS.Translate.toString(transform),
				opacity: isDragging ? 0.5 : undefined,
			}}
			handleProps={{ ...attributes, ...listeners }}
			label={label}
			onRename={(newName: string) => onEditTitle(newName)}
			onRemove={onRemove}
		>
			{children}

			{!showAddButton ? (
				<Box
					onClick={handleAddButton}
					sx={MultipleContainersAddButtonCardStyles}
				>
					<Plus />
					Agregar tarjeta
				</Box>
			) : (
				<CreateCardInput
					onCreate={handleCreateCard}
					onCancel={removeAddButton}
					type="card"
				/>
			)}
		</Container>
	)
}

/* -------------------------
   SortableItem
   ------------------------- */
interface SortableItemProps {
	containerId: UniqueIdentifier
	id: UniqueIdentifier
	index: number
	style(args: ItemStyleArgs): React.CSSProperties
	getIndex(id: UniqueIdentifier): number
	renderItem(): React.ReactElement | null
	wrapperStyle({ index }: { index: number }): React.CSSProperties
}

const SortableItem = React.memo(function SortableItem({
	id,
	index,
	renderItem,
	style,
	containerId,
	getIndex,
	wrapperStyle,
}: SortableItemProps) {
	const {
		setNodeRef,
		setActivatorNodeRef,
		listeners,
		isDragging,
		isSorting,
		over,
		transform,
		transition,
	} = useSortable({ id })

	// pequeño mount status para animar entrada (reducido)
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		const t = setTimeout(() => setMounted(true), 200)
		return () => clearTimeout(t)
	}, [])

	const mountedWhileDragging = isDragging && !mounted

	return (
		<Item
			ref={setNodeRef}
			value={id}
			dragging={isDragging}
			sorting={isSorting}
			handleProps={{ ref: setActivatorNodeRef }}
			index={index}
			wrapperStyle={wrapperStyle({ index })}
			style={style({
				index,
				value: id,
				isDragging,
				isSorting,
				overIndex: over ? getIndex(over.id) : -1,
				containerId,
				isDragOverlay: false,
			})}
			transition={transition}
			transform={transform}
			fadeIn={mountedWhileDragging}
			listeners={listeners}
			renderItem={renderItem}
		/>
	)
})

/* -------------------------
   MultipleContainers (main)
   ------------------------- */
interface Props {
	adjustScale?: boolean
	cancelDrop?: CancelDrop
	containerStyle?: React.CSSProperties
	coordinateGetter?: KeyboardCoordinateGetter
	getItemStyles?(args: ItemStyleArgs): React.CSSProperties
	wrapperStyle?(args: { index: number }): React.CSSProperties
	itemCount?: number
	items?: Items
	renderItem?: () => React.ReactElement | null
	strategyContainer?: SortingStrategy
	strategyItem?: SortingStrategy
	modifiers?: Modifiers
	trashable?: boolean
	vertical?: boolean
}

export const MultipleContainers = ({
	itemCount = 13,
	cancelDrop,
	items: initialItems,
	containerStyle,
	coordinateGetter = multipleContainersCoordinateGetter,
	getItemStyles = () => ({}),
	wrapperStyle = () => ({}),
	modifiers,
	renderItem = () => null,
	strategyContainer = horizontalListSortingStrategy,
	strategyItem = verticalListSortingStrategy,
}: Props) => {
	// items state (cards grouped by containerId)
	const [items, setItems] = useState<Items>(
		() =>
			initialItems ?? {
				A: createRange(itemCount, (i) => `A${i + 1}`),
				B: createRange(itemCount, (i) => `B${i + 1}`),
				C: createRange(itemCount, (i) => `C${i + 1}`),
			}
	)

	// containers is the ordering of container ids
	const [containers, setContainers] = useState<UniqueIdentifier[]>(() =>
		Object.keys(items)
	)

	// titles map for containers: containerId -> title
	const [columnTitles, setColumnTitles] = useState<Record<string, string>>(
		() => {
			const keys = Object.keys(items)
			const map: Record<string, string> = {}
			for (const key of keys) map[key] = key // default title = id (A,B,C...)
			return map
		}
	)

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
	const lastOverId = useRef<UniqueIdentifier | null>(null)
	const recentlyMovedToNewContainer = useRef(false)
	const [clonedItems, setClonedItems] = useState<Items | null>(null)

	/* ------------------ sensors (memo) ------------------ */
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, { coordinateGetter })
	)

	/* -------- findContainer (memoized) -------- */
	const findContainer = useCallback(
		(id: UniqueIdentifier) => {
			if (id in items) return id
			return Object.keys(items).find((key) => items[key].includes(id))
		},
		[items]
	)

	const getIndex = useCallback(
		(id: UniqueIdentifier) => {
			const container = findContainer(id)
			if (!container) return -1
			return items[container].indexOf(id)
		},
		[findContainer, items]
	)

	/* -------- collision detection (optimized) -------- */
	const collisionDetectionStrategy: CollisionDetection = useCallback(
		(args) => {
			// If dragging a container itself, use closestCenter among container droppables
			if (activeId && activeId in items) {
				return closestCenter({
					...args,
					droppableContainers: args.droppableContainers.filter(
						(c) => c.id in items
					),
				})
			}

			// pointer -> rect fallback
			const pointerIntersections = pointerWithin(args)
			const intersections =
				pointerIntersections.length > 0
					? pointerIntersections
					: rectIntersection(args)
			let overId = getFirstCollision(intersections, 'id')

			if (overId != null) {
				// if over a container droppable that itself contains items, find the nearest item inside it
				if (overId in items) {
					const containerItems = items[overId]
					if (containerItems.length > 0) {
						overId = closestCenter({
							...args,
							droppableContainers: args.droppableContainers.filter(
								(container) =>
									container.id !== overId &&
									containerItems.includes(container.id)
							),
						})[0]?.id
					}
				}

				lastOverId.current = overId
				return [{ id: overId }]
			}

			// fallback to last cached
			if (recentlyMovedToNewContainer.current) lastOverId.current = activeId
			return lastOverId.current
				? [{ id: lastOverId.current as UniqueIdentifier }]
				: []
		},
		[activeId, items]
	)

	/* -------- effect to reset flag -------- */
	useEffect(() => {
		requestAnimationFrame(() => {
			recentlyMovedToNewContainer.current = false
		})
	}, [items])

	/* -------- onDragCancel -------- */
	const onDragCancel = useCallback(() => {
		if (clonedItems) setItems(clonedItems)
		setActiveId(null)
		setClonedItems(null)
	}, [clonedItems])

	/* -------- remove container -------- */
	const handleRemove = useCallback((containerID: UniqueIdentifier) => {
		setContainers((prev) => prev.filter((id) => id !== containerID))
		setItems((prev) => {
			const next = { ...prev }
			delete next[containerID as string]
			return next
		})
		setColumnTitles((prev) => {
			const next = { ...prev }
			delete next[containerID as string]
			return next
		})
	}, [])

	/* -------- add column (title optional) -------- */
	const handleAddColumn = useCallback(
		(title?: string) => {
			const newContainerId = getNextContainerIdFromKeys(Object.keys(items))
			unstable_batchedUpdates(() => {
				setContainers((c) => [...c, newContainerId])
				setItems((it) => ({ ...it, [newContainerId]: [] }))
				setColumnTitles((t) => ({
					...t,
					[newContainerId]: title?.trim() ?? String(newContainerId),
				}))
			})
		},
		[items]
	)

	/* -------- DnD handlers -------- */
	const handleDragStart = useCallback(
		({ active }: { active: { id: UniqueIdentifier } }) => {
			setActiveId(active.id)
			setClonedItems(items)
		},
		[items]
	)

	const handleDragOver = useCallback(
		({ active, over }: DragOverEvent) => {
			const overId = over?.id
			if (overId == null || active.id in items) return

			const overContainer = findContainer(overId)
			const activeContainer = findContainer(active.id)
			if (!overContainer || !activeContainer) return

			if (activeContainer !== overContainer) {
				setItems((items) => {
					const activeItems = items[activeContainer]
					const overItems = items[overContainer]
					const overIndex = overItems.indexOf(overId)
					const activeIndex = activeItems.indexOf(active.id)

					let newIndex: number
					if (overId in items) {
						newIndex = overItems.length + 1
					} else {
						const isBelow =
							over &&
							active.rect.current.translated &&
							active.rect.current.translated.top >
								over.rect.top + over.rect.height
						newIndex =
							overIndex >= 0
								? overIndex + (isBelow ? 1 : 0)
								: overItems.length + 1
					}

					recentlyMovedToNewContainer.current = true

					return {
						...items,
						[activeContainer]: items[activeContainer].filter(
							(it) => it !== active.id
						),
						[overContainer]: [
							...items[overContainer].slice(0, newIndex),
							items[activeContainer][activeIndex],
							...items[overContainer].slice(newIndex),
						],
					}
				})
			}
		},
		[findContainer, items]
	)

	const handleDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			// reorder containers if we dragged a container
			if (active.id in items && over?.id) {
				setContainers((containers) => {
					const activeIndex = containers.indexOf(active.id)
					const overIndex = containers.indexOf(over.id)
					return arrayMove(containers, activeIndex, overIndex)
				})
			}

			const activeContainer = findContainer(active.id)
			if (!activeContainer) {
				setActiveId(null)
				return
			}

			const overId = over?.id
			if (overId == null) {
				setActiveId(null)
				return
			}

			const overContainer = findContainer(overId)
			if (overContainer) {
				const activeIndex = items[activeContainer].indexOf(active.id)
				const overIndex = items[overContainer].indexOf(overId)
				if (activeIndex !== overIndex) {
					setItems((items) => ({
						...items,
						[overContainer]: arrayMove(
							items[overContainer],
							activeIndex,
							overIndex
						),
					}))
				}
			}

			setActiveId(null)
		},
		[findContainer, items]
	)

	/* -------- memoized rendered containers to avoid re-create -------- */
	const renderedContainers = useMemo(() => {
		return containers.map((containerId) => {
			const title = columnTitles[String(containerId)] ?? String(containerId)
			return (
				<DroppableContainer
					key={String(containerId)}
					id={String(containerId)}
					label={title}
					items={items[containerId] ?? []}
					style={containerStyle}
					setItems={setItems}
					onRemove={() => handleRemove(containerId)}
					onEditTitle={(newTitle) =>
						setColumnTitles((prev) => ({
							...prev,
							[String(containerId)]: newTitle.trim(),
						}))
					}
				>
					<SortableContext
						items={items[containerId] ?? []}
						strategy={strategyItem}
					>
						{(items[containerId] ?? []).map((value, index) => (
							<SortableItem
								key={value}
								id={value}
								index={index}
								style={getItemStyles}
								wrapperStyle={wrapperStyle}
								renderItem={renderItem}
								containerId={containerId}
								getIndex={getIndex}
							/>
						))}
					</SortableContext>
				</DroppableContainer>
			)
		})
		// dependencias controladas para minimizar renders
	}, [
		containers,
		columnTitles,
		items,
		containerStyle,
		strategyItem,
		getItemStyles,
		wrapperStyle,
		renderItem,
		getIndex,
		handleRemove,
		setItems,
	])

	/* -------- add column toggle -------- */
	const [showAddColumn, setShowAddColumn] = useState(false)
	const handleAddColumnButton = useCallback(() => setShowAddColumn(true), [])
	const removeAddColumnButton = useCallback(() => setShowAddColumn(false), [])

	/* -------- render -------- */
	return (
		<DndContext
			sensors={sensors}
			collisionDetection={collisionDetectionStrategy}
			autoScroll
			// Use while-dragging measuring to reduce layout thrash
			measuring={{ droppable: { strategy: MeasuringStrategy.WhileDragging } }}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			cancelDrop={cancelDrop}
			onDragCancel={onDragCancel}
			modifiers={modifiers}
		>
			<Box sx={MultipleContainersContainerStyles}>
				<SortableContext items={containers} strategy={strategyContainer}>
					{renderedContainers}
				</SortableContext>
			</Box>

			{!showAddColumn ? (
				<Box
					onClick={handleAddColumnButton}
					sx={MultipleContainersAddButtonColumnStyles}
				>
					Add Column
				</Box>
			) : (
				<CreateCardInput
					onCreate={(title) => {
						handleAddColumn(title)
						setShowAddColumn(false)
					}}
					onCancel={removeAddColumnButton}
					type={'column'}
				/>
			)}
		</DndContext>
	)
}

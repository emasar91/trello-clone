// MultipleContainers.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import {
	restrictToHorizontalAxis,
	restrictToVerticalAxis,
} from '@dnd-kit/modifiers'

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
} from '@dnd-kit/core'

import {
	AnimateLayoutChanges,
	SortableContext,
	useSortable,
	arrayMove,
	defaultAnimateLayoutChanges,
	verticalListSortingStrategy,
	SortingStrategy,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { coordinateGetter as multipleContainersCoordinateGetter } from './multipleContainersKeyboardCoordinates'

import { Item, Container, ContainerProps } from '../components'
import type { Props as ItemProps } from '../components/Item/Item'

import CreateCardInput from '../components/TextAreaCustom/TextAreaCustom'
import { Box } from '@mui/material'
import { Plus } from '@/public/assets/icons/Plus'
import { useStoreBoard } from '@/context/useStoreBoard'
import { useCreateCard } from '@/hooks/useCreateCard'
import { useCreateColumn } from '@/hooks/useCreateColumn'
import { useAuth } from '@/context/useAuthContext'
import { useUpdateColumnName } from '@/hooks/useUpdateColumnName'
import { toast } from 'react-toastify'
import ModalConfirm from '../components/ModalConfirm/ModalConfirm'
import { useDeleteColumn } from '@/hooks/useDeleteColumn'
import ModalItem from '../components/Item/components/ModalItem/ModalItem'
import { MultipleContainersAddColumnStyles } from './MultipleContainers.styles'

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
	defaultAnimateLayoutChanges({ ...args, wasDragging: true })

function DroppableContainer({
	children,
	disabled,
	id,
	items,
	style,
	label,
	onRemove,
	onRename,
	onCreateCard,
	...props
}: ContainerProps & {
	disabled?: boolean
	id: UniqueIdentifier
	items: UniqueIdentifier[]
	style?: React.CSSProperties
	label?: string
	onRemove?: () => void
	onRename?: (value: string) => void
	onCreateCard?: (value: string) => void
}) {
	const {
		active,
		attributes,
		isDragging,
		listeners,
		over,
		setNodeRef,
		transition,
		transform,
	} = useSortable({
		id,
		data: {
			type: 'container',
			children: items,
		},
		animateLayoutChanges,
	})
	const isOverContainer = over
		? (id === over.id && active?.data.current?.type !== 'container') ||
		  items.includes(over.id)
		: false

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				maxWidth: '272px',
				width: '100%',
				flexShrink: 0,
				justifyContent: 'center',
				alignItems: 'center',
				flexWrap: 'nowrap',
			}}
		>
			<Container
				ref={disabled ? undefined : setNodeRef}
				style={{
					...style,
					transition,
					transform: CSS.Translate.toString(transform),
					opacity: isDragging ? 0.5 : undefined,
				}}
				hover={isOverContainer}
				handleprops={{
					...attributes,
					...listeners,
				}}
				label={label}
				onRename={onRename}
				onRemove={onRemove}
				onCreateCard={onCreateCard}
				{...props}
			>
				{children}
				{/* Add card button / input inside container */}
			</Container>
		</div>
	)
}

export type CardItem = {
	id: UniqueIdentifier // número o string único
	text: string // el valor escrito por el usuario
}

export type ColumnData = {
	title: string
	items: CardItem[]
}

export type Items = Record<UniqueIdentifier, ColumnData>

interface Props {
	adjustScale?: boolean
	cancelDrop?: CancelDrop
	columns?: number
	containerStyle?: React.CSSProperties
	coordinateGetter?: KeyboardCoordinateGetter
	getItemStyles?(args: {
		value: UniqueIdentifier
		index: number
		overIndex: number
		isDragging: boolean
		containerId: UniqueIdentifier
		isSorting: boolean
		isDragOverlay: boolean
	}): React.CSSProperties
	wrapperStyle?(args: { index: number }): React.CSSProperties
	items: Items
	handle?: boolean
	renderItem?: ItemProps['renderItem']
	strategy?: SortingStrategy
	modifiers?: Modifiers
	minimal?: boolean
	trashable?: boolean
	scrollable?: boolean
	vertical?: boolean
}

export const TRASH_ID = 'void'
const PLACEHOLDER_ID = 'placeholder'

export function MultipleContainers({
	cancelDrop,
	handle = false,
	items: initialItems,
	containerStyle,
	coordinateGetter = multipleContainersCoordinateGetter,
	getItemStyles = () => ({}),
	wrapperStyle = () => ({}),
	renderItem,
}: Props) {
	const [items, setItems] = useState<Items>(initialItems)
	const [containers, setContainers] = useState(
		Object.keys(initialItems) as UniqueIdentifier[]
	)
	// NOTE: titles now live inside items[containerId].title

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
	const lastOverId = useRef<UniqueIdentifier | null>(null)
	const recentlyMovedToNewContainer = useRef(false)
	const isSortingContainer =
		activeId != null ? containers.includes(activeId) : false

	/* collision detection (adaptado al nuevo shape) */
	const collisionDetectionStrategy: CollisionDetection = useCallback(
		(args) => {
			// 1) Si arrastramos una columna (activeId está en items) → ser más permisivo usando rectIntersection
			if (activeId && activeId in items) {
				const intersections = rectIntersection(args)
				const overId = getFirstCollision(intersections, 'id')

				if (overId != null) {
					// Si el droppable es una columna que contiene items, intentar elegir el item más cercano dentro
					if (overId in items) {
						const containerItems = items[overId].items
						if (containerItems.length > 0) {
							const containerItemIds = containerItems.map((ci) => ci.id)
							const closest = closestCenter({
								...args,
								droppableContainers: args.droppableContainers.filter(
									(container) =>
										container.id !== overId &&
										containerItemIds.includes(container.id)
								),
							})[0]?.id
							if (closest) {
								lastOverId.current = closest
								return [{ id: closest }]
							}
						}
					}

					lastOverId.current = overId
					return [{ id: overId }]
				}

				// fallback al último over conocido
				if (recentlyMovedToNewContainer.current) lastOverId.current = activeId
				return lastOverId.current ? [{ id: lastOverId.current }] : []
			}

			// 2) Si arrastramos una card → pointerWithin primero (natural), rectIntersection segundo, closestCenter fallback
			const pointerIntersections = pointerWithin(args)
			const intersections =
				pointerIntersections.length > 0
					? pointerIntersections
					: rectIntersection(args)
			const overId = getFirstCollision(intersections, 'id')

			if (overId != null) {
				if (overId in items) {
					const containerItems = items[overId].items
					if (containerItems.length > 0) {
						const containerItemIds = containerItems.map((ci) => ci.id)
						const closest = closestCenter({
							...args,
							droppableContainers: args.droppableContainers.filter(
								(container) =>
									container.id !== overId &&
									containerItemIds.includes(container.id)
							),
						})[0]?.id
						if (closest) {
							lastOverId.current = closest
							return [{ id: closest }]
						}
					}
				}

				lastOverId.current = overId
				return [{ id: overId }]
			}

			// 3) fallback si no hay colisión actual
			if (recentlyMovedToNewContainer.current) lastOverId.current = activeId
			return lastOverId.current ? [{ id: lastOverId.current }] : []
		},
		[activeId, items]
	)
	const { deleteColumn, loading } = useDeleteColumn({ setItems })

	const [clonedItems, setClonedItems] = useState<Items | null>(null)
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, { coordinateGetter })
	)

	const findContainer = (id: UniqueIdentifier) => {
		if (id in items) {
			return id
		}

		return Object.keys(items).find((key) =>
			items[key].items.some((item) => item.id === id)
		)
	}

	const getIndex = (id: UniqueIdentifier) => {
		const container = findContainer(id)

		if (!container) {
			return -1
		}

		const index = items[container].items.findIndex((item) => item.id === id)

		return index
	}

	const onDragCancel = () => {
		if (clonedItems) {
			setItems(clonedItems)
		}

		setActiveId(null)
		setClonedItems(null)
	}

	useEffect(() => {
		console.log(items, 'ITEMS')
		console.log(containers, 'containers')
	}, [items, containers])

	useEffect(() => {
		requestAnimationFrame(() => {
			recentlyMovedToNewContainer.current = false
		})
	}, [items])

	const isDraggingCard = activeId && !containers.includes(activeId)
	const modifiers = isDraggingCard
		? [restrictToVerticalAxis]
		: [restrictToHorizontalAxis]
	const {
		board: { _id: boardId, userId },
	} = useStoreBoard()
	const { user } = useAuth()
	const { createCardInColumn } = useCreateCard({
		setItems,
		boardId,
		userId,
		items,
	})

	const { createColumnInBoard } = useCreateColumn({
		setItems,
		setContainers,
		boardId,
		user: user!,
	})
	const [openModal, setOpenModal] = useState(false)
	const [selectedContainerId, setSelectedContainerId] =
		useState<UniqueIdentifier | null>(null)

	const { updateColumnName } = useUpdateColumnName({ setItems, items })

	const handleRemoveColumns = (containerId: UniqueIdentifier) => {
		const itemsContainer = items[containerId]
		if (itemsContainer?.items.length) {
			setSelectedContainerId(containerId)
			setOpenModal(true)
		} else {
			handleRemove(containerId)
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={collisionDetectionStrategy}
			measuring={{
				droppable: {
					strategy: MeasuringStrategy.Always,
				},
			}}
			onDragStart={({ active }) => {
				setActiveId(active.id)
				setClonedItems(items)
			}}
			onDragOver={({ active, over }) => {
				const overId = over?.id

				if (overId == null || overId === TRASH_ID || active.id in items) {
					return
				}

				const overContainer = findContainer(overId)
				const activeContainer = findContainer(active.id)

				if (!overContainer || !activeContainer) {
					return
				}

				if (activeContainer !== overContainer) {
					setItems((items) => {
						const activeItems = items[activeContainer].items
						const overItems = items[overContainer].items
						const overIndex = overItems.findIndex((i) => i.id === overId)
						const activeIndex = activeItems.findIndex((i) => i.id === active.id)

						let newIndex: number

						if (overId in items) {
							newIndex = overItems.length + 1
						} else {
							const isBelowOverItem =
								over &&
								active.rect.current.translated &&
								active.rect.current.translated.top >
									(over?.rect.top ?? 0) + (over?.rect.height ?? 0)

							const modifier = isBelowOverItem ? 1 : 0

							newIndex =
								overIndex >= 0 ? overIndex + modifier : overItems.length + 1
						}

						recentlyMovedToNewContainer.current = true

						return {
							...items,
							[activeContainer]: {
								...items[activeContainer],
								items: items[activeContainer].items.filter(
									(item) => item.id !== active.id
								),
							},
							[overContainer]: {
								...items[overContainer],
								items: [
									...overItems.slice(0, newIndex),
									items[activeContainer].items[activeIndex],
									...overItems.slice(newIndex, overItems.length),
								],
							},
						}
					})
				}
			}}
			onDragEnd={({ active, over }) => {
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

				if (overId === TRASH_ID) {
					setItems((items) => ({
						...items,
						[activeContainer]: {
							...items[activeContainer],
							items: items[activeContainer].items.filter(
								(item) => item.id !== activeId
							),
						},
					}))
					setActiveId(null)
					return
				}

				if (overId === PLACEHOLDER_ID) {
					const newContainerId = getNextContainerId()

					unstable_batchedUpdates(() => {
						setContainers((containers) => {
							const newContainers = [...containers, newContainerId]
							return newContainers
						})
						setItems((items) => {
							// mover el item desde activeContainer -> newContainerId
							const itemIndex = items[activeContainer].items.findIndex(
								(i) => i.id === active.id
							)
							const movingItem =
								itemIndex >= 0 ? items[activeContainer].items[itemIndex] : null
							const newItems = {
								...items,
								[activeContainer]: {
									...items[activeContainer],
									items: items[activeContainer].items.filter(
										(item) => item.id !== active.id
									),
								},
								[newContainerId]: {
									title: String(newContainerId),
									items: movingItem ? [movingItem] : [],
								},
							}
							return newItems
						})
						// set default title for the new column is already set above
						setActiveId(null)
					})
					return
				}

				const overContainer = findContainer(overId)

				if (overContainer) {
					const activeIndex = items[activeContainer].items.findIndex(
						(i) => i.id === active.id
					)
					const overIndex = items[overContainer].items.findIndex(
						(i) => i.id === overId
					)

					if (activeIndex !== overIndex) {
						setItems((prev) => {
							const newItems = {
								...prev,
								[overContainer]: {
									...prev[overContainer],
									items: arrayMove(
										prev[overContainer].items,
										activeIndex,
										overIndex
									),
								},
							}
							return newItems
						})
					}
				}

				setActiveId(null)
			}}
			cancelDrop={cancelDrop}
			onDragCancel={onDragCancel}
			modifiers={modifiers}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'start',
					gap: '12px',
				}}
			>
				<SortableContext
					items={[...containers, PLACEHOLDER_ID]}
					strategy={horizontalListSortingStrategy}
				>
					{containers.map((containerId) => (
						<DroppableContainer
							key={containerId}
							id={containerId}
							label={items[containerId]?.title ?? String(containerId)}
							items={(items[containerId]?.items ?? []).map((item) => item.id)}
							style={containerStyle}
							onRemove={() => handleRemoveColumns(containerId)}
							onRename={updateColumnName(containerId, boardId)}
							onCreateCard={createCardInColumn(containerId)}
						>
							<SortableContext
								items={(items[containerId]?.items ?? []).map((i) => i.id)}
								strategy={verticalListSortingStrategy}
							>
								{(items[containerId]?.items ?? []).map((value, index) => {
									return (
										<SortableItem
											disabled={isSortingContainer}
											key={value.id}
											id={value.id}
											index={index}
											handle={handle}
											style={getItemStyles}
											wrapperStyle={wrapperStyle}
											displayValue={value.text}
											renderItem={renderItem}
											containerId={containerId}
											getIndex={getIndex}
											selectedItemId={value.id}
										/>
									)
								})}
							</SortableContext>
						</DroppableContainer>
					))}
				</SortableContext>
				{/* Add column input (toggle) */}
				<ColumnAdder
					onCreate={(title) => {
						handleAddColumnWithTitle(title)
					}}
				/>
				<ModalConfirm
					open={openModal}
					onClose={() => setOpenModal(false)}
					onConfirm={handleRemove}
					title="¿Estás seguro de eliminar esta columna?"
					message="Tambien se eliminaran las tarjetas que contiene, esta acción no se puede deshacer?"
					selectedContainerId={selectedContainerId}
					loading={loading}
				/>
			</div>
		</DndContext>
	)

	function handleRemove(containerID: UniqueIdentifier | null) {
		if (!containerID) return
		if (containers.length === 1) {
			toast.error('El tablero no puede quedar sin columnas')
			return
		}

		deleteColumn(containerID, boardId)
		setContainers((containers) => containers.filter((id) => id !== containerID))
		setItems((prev) => {
			const next = { ...prev }
			delete next[containerID]
			return next
		})
		setOpenModal(false)
	}

	function handleAddColumnWithTitle(title?: string) {
		const titleAlreadyExists = Object.values(items).some(
			(container) => container.title === title
		)

		if (titleAlreadyExists) {
			toast.error('Ya existe una columna con el mismo nombre')
			return
		}
		if (title?.trim()) {
			createColumnInBoard()(title.trim())
		}
	}

	function getNextContainerId() {
		const containerIds = Object.keys(items)

		const lastId =
			containerIds
				.map((id) => parseInt(id.replace('col-', ''), 10))
				.filter((n) => !isNaN(n)) // solo números válidos
				.sort((a, b) => a - b)
				.pop() || 0

		return `col-${lastId + 1}`
	}
}
/* -------------------------
   helper: SortableItem (igual que antes)
   ------------------------- */
interface SortableItemProps {
	containerId: UniqueIdentifier
	id: UniqueIdentifier
	index: number
	handle: boolean
	disabled?: boolean
	displayValue: React.ReactNode
	selectedItemId: UniqueIdentifier
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

function SortableItem({
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
}: SortableItemProps) {
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
				transition={transition}
				transform={transform}
				fadeIn={mountedWhileDragging}
				listeners={listeners}
				renderItem={renderItem}
				setOpenModalItem={setOpenModalItem}
			/>
			<ModalItem
				open={openModalItem}
				onClose={() => setOpenModalItem(false)}
				cardId={selectedItemId}
				columnId={containerId}
			/>
		</>
	)
}

function useMountStatus() {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => setIsMounted(true), 500)

		return () => clearTimeout(timeout)
	}, [])

	return isMounted
}

/* -------------------------
   small ColumnAdder component to place CreateCardInput for columns
   ------------------------- */
function ColumnAdder({ onCreate }: { onCreate: (title: string) => void }) {
	const [show, setShow] = useState(false)

	if (!show) {
		return (
			<Box onClick={() => setShow(true)} sx={MultipleContainersAddColumnStyles}>
				<Plus />
				Añade otra lista
			</Box>
		)
	}

	return (
		<CreateCardInput
			type="column"
			onCreate={(title) => {
				onCreate(title)
				setShow(false)
			}}
			onCancel={() => setShow(false)}
		/>
	)
}

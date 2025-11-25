import React, { useEffect } from 'react'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'
import './item.css'
import { useTheme } from '@mui/material/styles'
import { EyeIcon } from '@/public/assets/icons/EyeIcon'
export interface Props {
	dragOverlay?: boolean
	disabled?: boolean
	dragging?: boolean
	handle?: boolean
	height?: number
	index?: number
	fadeIn?: boolean
	transform?: Transform | null
	listeners?: DraggableSyntheticListeners
	sorting?: boolean
	style?: React.CSSProperties
	transition?: string | null
	wrapperStyle?: React.CSSProperties
	value: React.ReactNode
	onRemove?(): void
	setOpenModalItem: React.Dispatch<React.SetStateAction<boolean>>
	renderItem?(args: {
		dragOverlay: boolean
		dragging: boolean
		sorting: boolean
		index: number | undefined
		fadeIn: boolean
		listeners: DraggableSyntheticListeners
		ref: React.Ref<HTMLElement>
		style: React.CSSProperties | undefined
		transform: Props['transform']
		transition: Props['transition']
		value: Props['value']
	}): React.ReactElement | null
}

export const Item = React.memo(
	React.forwardRef<HTMLLIElement, Props>(
		(
			{
				dragOverlay,
				dragging,
				disabled,
				fadeIn,
				handle,
				index,
				listeners,
				renderItem,
				sorting,
				style,
				transition,
				transform,
				value,
				wrapperStyle,
				setOpenModalItem,
				...props
			},
			ref
		) => {
			const theme = useTheme()
			useEffect(() => {
				if (!dragOverlay) return
				document.body.style.cursor = 'grabbing'
				return () => {
					document.body.style.cursor = ''
				}
			}, [dragOverlay])

			return renderItem ? (
				renderItem({
					dragOverlay: Boolean(dragOverlay),
					dragging: Boolean(dragging),
					sorting: Boolean(sorting),
					index,
					fadeIn: Boolean(fadeIn),
					listeners,
					ref,
					style,
					transform,
					transition,
					value,
				})
			) : (
				<li
					ref={ref}
					onDoubleClick={() => alert('double click')}
					className={`Wrapper
						${fadeIn ? 'fadeIn' : ''}
						${sorting ? 'sorting' : ''}
						${dragOverlay ? 'dragOverlay' : ''}
					`}
					style={
						{
							...wrapperStyle,
							transition: [transition, wrapperStyle?.transition]
								.filter(Boolean)
								.join(', '),
							'--translate-x': transform
								? `${Math.round(transform.x)}px`
								: undefined,
							'--translate-y': transform
								? `${Math.round(transform.y)}px`
								: undefined,
							'--scale-x': transform?.scaleX
								? `${transform.scaleX}`
								: undefined,
							'--scale-y': transform?.scaleY
								? `${transform.scaleY}`
								: undefined,
							'--index': index,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							backgroundColor: theme.palette.boardPage.blackBackgroundCard,
							color: theme.palette.boardPage.textGray,
						} as React.CSSProperties
					}
				>
					<div
						className={`Item
							${dragging ? 'dragging' : ''}
							${handle ? 'withHandle' : ''}
							${dragOverlay ? 'dragOverlay' : ''}
							${disabled ? 'disabled' : ''}
						`}
						style={{
							...style,
							backgroundColor: theme.palette.boardPage.blackBackgroundCard,
							color: theme.palette.boardPage.textGray,
							width: '100%',
							whiteSpace: 'break-spaces',
						}}
						data-cypress="draggable-item"
						{...(!handle ? listeners : undefined)}
						{...props}
						tabIndex={!handle ? 0 : undefined}
					>
						{value}
					</div>
					<span
						onClick={(e) => {
							e.stopPropagation()
							setOpenModalItem(true)
						}}
						style={{ cursor: 'pointer', padding: '0 10px' }}
					>
						<EyeIcon />
					</span>
				</li>
			)
		}
	)
)

import React, { useEffect } from 'react'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'
import './item.css'
import { useTheme } from '@mui/material/styles'
import { EyeIcon } from '@/public/assets/icons/EyeIcon'
import { DescriptionIcon } from '@/public/assets/icons/DescriptionIcon'
import { ICardComment } from '@/types/card'
import { CommentIcon } from '@/public/assets/icons/CommentIcon'
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
	tags: string[] | null
	description: string | null
	comments: ICardComment[]
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
				tags,
				description,
				comments,
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
					className={`Wrapper
              ${fadeIn ? 'fadeIn' : ''}
              ${sorting ? 'sorting' : ''}
              ${dragging ? 'dragging' : ''}
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
							'--index': index,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							backgroundColor: theme.palette.boardPage.blackBackgroundCard,
							color: theme.palette.boardPage.textGray,
							zIndex: dragging || dragOverlay ? 1000 : 'auto',
						} as React.CSSProperties
					}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
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
									whiteSpace: 'pre-wrap',
									wordBreak: 'break-word',
									display: 'flex',
									alignItems: 'center',
								}}
								data-cypress="draggable-item"
								{...(!handle ? listeners : undefined)}
								{...props}
								tabIndex={!handle ? 0 : undefined}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
									}}
								>
									{tags && (
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '5px',
												marginTop: '5px',
												marginBottom: '5px',
											}}
										>
											{tags.map((color: string) => (
												<span
													key={color}
													style={{
														backgroundColor: color,
														width: '30px',
														height: '8px',
														borderRadius: '5px',
													}}
												/>
											))}
										</div>
									)}
									<span>{value}</span>

									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '5px',
										}}
									>
										{description && (
											<div>
												<DescriptionIcon />
											</div>
										)}
										{comments?.length > 0 && (
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '5px',
												}}
											>
												<CommentIcon />
												<span>{comments?.length}</span>
											</div>
										)}
									</div>
								</div>
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
						</div>
					</div>
				</li>
			)
		}
	)
)

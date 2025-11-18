import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { Handle } from '../Handle'
import { Remove } from '../Remove'

import {
	wrapperStyles,
	itemStyles,
	handleContainerStyles,
	removeContainerStyles,
	valueStyles,
} from './Item.styles'
import { useTheme } from '@mui/material'
import type { Transform } from '@dnd-kit/utilities'
import type { ButtonProps } from '../Button'

interface Props {
	dragOverlay?: boolean
	dragging?: boolean
	sorting?: boolean
	disabled?: boolean
	fadeIn?: boolean
	handleProps?: ButtonProps & {
		ref?:
			| ((instance: HTMLButtonElement | null) => void)
			| React.Ref<HTMLButtonElement>
	}
	listeners?: React.DOMAttributes<HTMLElement>
	onRemove?: React.MouseEventHandler<HTMLButtonElement>
	style?: React.CSSProperties
	transition?: string | null
	transform?: Transform | null
	value?: React.ReactNode
	wrapperStyle?: React.CSSProperties
	index?: number
	renderItem?: () => React.ReactElement | null
}

export const Item = React.memo(
	React.forwardRef<HTMLLIElement, Props>((props, ref) => {
		const theme = useTheme()

		const {
			dragOverlay,
			dragging,
			disabled,
			fadeIn,
			handleProps,
			listeners,
			onRemove,
			style,
			transition,
			transform,
			value,
			wrapperStyle,
		} = props

		useEffect(() => {
			if (dragOverlay) {
				document.body.style.cursor = 'grabbing'
				return () => {
					document.body.style.cursor = ''
				}
			}
		}, [dragOverlay])

		return (
			<Box
				component="li"
				ref={ref}
				sx={wrapperStyles({
					transform,
					fadeIn,
					dragOverlay,
					transition,
					wrapperStyle,
				})}
				style={wrapperStyle}
			>
				<Box
					sx={itemStyles({
						transform,
						dragging,
						dragOverlay,
						disabled,
						theme,
					})}
					style={style}
				>
					<Box sx={handleContainerStyles}>
						<Handle
							{...handleProps}
							{...listeners}
							style={{ padding: '10px' }}
						/>
					</Box>

					<Box sx={valueStyles}>{value}</Box>

					<Box className="Remove" sx={removeContainerStyles}>
						{onRemove && <Remove onClick={onRemove} />}
					</Box>
				</Box>
			</Box>
		)
	})
)

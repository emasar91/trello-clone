import React, { forwardRef, useState } from 'react'
import { Box, List, useTheme, IconButton } from '@mui/material'
import type { ButtonProps } from '../Button'

import { Handle } from '../Handle'
import { Remove } from '../Remove'

import {
	ContainerActionsStyles,
	ContainerDragHandleStyles,
	ContainerHeaderStyles,
	ContainerLabelStyles,
	ContainerListStyles,
	ContainerStyles,
	horizontalStyles,
	placeholderStyles,
	scrollableStyles,
	shadowStyles,
	unstyledStyles,
} from './Container.styles'
import { Plus } from '@/public/assets/icons/Plus'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
	columns?: number
	label?: string
	horizontal?: boolean
	hover?: boolean
	handleProps?: ButtonProps
	scrollable?: boolean
	shadow?: boolean
	placeholder?: boolean
	unstyled?: boolean
	onClick?(): void
	onRemove?(): void

	// NUEVO ➜ callback para guardar cambios
	onRename?: (newName: string) => void
}

export const Container = forwardRef<HTMLDivElement, Props>(
	(
		{
			children,
			columns = 1,
			handleProps,
			horizontal,
			onClick,
			onRemove,
			label,
			placeholder,
			scrollable,
			shadow,
			unstyled,
			onRename,
			...props
		}: Props,
		ref
	) => {
		const theme = useTheme()

		const [editing, setEditing] = useState(false)
		const [tempName, setTempName] = useState(label || '')

		const save = () => {
			setEditing(false)
			if (tempName.trim() && tempName !== label) {
				onRename?.(tempName.trim())
			} else {
				setTempName(label || '')
			}
		}

		const cancel = () => {
			setEditing(false)
			setTempName(label || '')
		}

		return (
			<Box
				{...props}
				ref={ref}
				sx={{
					...ContainerStyles,
					'--columns': columns,
					...(unstyled ? unstyledStyles : {}),
					...(horizontal ? horizontalStyles : {}),
					...(placeholder ? placeholderStyles : {}),
					...(scrollable ? scrollableStyles : {}),
					...(shadow ? shadowStyles : {}),
				}}
				onClick={onClick}
				tabIndex={onClick ? 0 : undefined}
			>
				{label ? (
					<Box sx={ContainerHeaderStyles(theme)}>
						<Box sx={ContainerDragHandleStyles}>
							<Handle {...handleProps} />
						</Box>

						{/* === TÍTULO O INPUT EDITABLE === */}
						<Box sx={ContainerLabelStyles}>
							{editing ? (
								<input
									autoFocus
									value={tempName}
									onChange={(e) => setTempName(e.target.value)}
									onBlur={save}
									onKeyDown={(e) => {
										if (e.key === 'Enter') save()
										if (e.key === 'Escape') cancel()
									}}
									style={{
										width: '100%',
										fontSize: 'inherit',
										fontWeight: 'inherit',
										border: '1px solid #ccc',
										borderRadius: 4,
										padding: '2px 4px',
									}}
								/>
							) : (
								label
							)}
						</Box>

						{/* === ICONOS DE ACCIÓN === */}
						<Box sx={ContainerActionsStyles}>
							{/* Botón para editar */}
							<IconButton size="small" onClick={() => setEditing(true)}>
								<Plus />
							</IconButton>

							{/* Botón para borrar */}
							{onRemove && <Remove onClick={onRemove} />}
						</Box>
					</Box>
				) : null}

				<List component="ul" sx={ContainerListStyles(theme)}>
					{children}
				</List>
			</Box>
		)
	}
)

Container.displayName = 'Container'

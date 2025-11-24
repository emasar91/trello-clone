// Container.tsx
import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import { Handle, Remove } from '../Item'
import {
	ContainerActionsStyles,
	ContainerHeaderStyles,
	ContainerStyles,
} from './Container.styles'
import { Box, useTheme } from '@mui/material'
import { Plus } from '@/public/assets/icons/Plus'
import CreateCardInput from '../TextAreaCustom/TextAreaCustom'

interface Props {
	children: React.ReactNode
	label?: string
	style?: React.CSSProperties
	onRemove?(): void
	onRename?: (title: string) => void // 👈 NUEVO
	handleprops?: React.ButtonHTMLAttributes<HTMLButtonElement>
	onCreateCard?: (value: string) => void
}

export const Container = forwardRef<HTMLDivElement | HTMLButtonElement, Props>(
	(
		{ children, label, onRename, onRemove, handleprops, style, onCreateCard },
		ref
	) => {
		const theme = useTheme()
		const [editing, setEditing] = useState(false)
		const [value, setValue] = useState('')

		// 👈 Si el label cambia desde afuera, actualizamos el input
		useEffect(() => {
			setValue(label ?? '')
		}, [editing, label])

		const finish = () => {
			if (value.trim() === label) {
				setEditing(false)
				return
			}
			if (onRename && value.trim()) {
				onRename(value.trim())
			}
			setEditing(false)
		}

		const [showAddCard, setShowAddCard] = useState(false)
		const handleOpenAddCard = useCallback(() => setShowAddCard(true), [])
		const handleCloseAddCard = useCallback(() => setShowAddCard(false), [])

		const handleCreateCard = useCallback(
			(value: string) => {
				onCreateCard?.(value)
				handleCloseAddCard()
			},
			[onCreateCard, handleCloseAddCard]
		)
		return (
			<Box
				ref={ref as React.Ref<HTMLDivElement>}
				sx={ContainerStyles({ theme, style })}
			>
				<Box
					sx={ContainerHeaderStyles(theme)}
					onDoubleClick={() => setEditing(true)}
				>
					{editing ? (
						<input
							autoFocus
							value={value}
							onChange={(e) => setValue(e.target.value)}
							onBlur={finish}
							onKeyDown={(e) => e.key === 'Enter' && finish()}
							// 👇 Para que NO active drag mientras escribís
							onMouseDown={(e) => e.stopPropagation()}
							style={{ width: '100%', fontSize: '1rem', border: 'none' }}
						/>
					) : (
						label
					)}

					<Box sx={ContainerActionsStyles}>
						{onRemove && <Remove onClick={onRemove} />}
						{/* 👈 Drag solo si NO estás editando */}
						{!editing && <Handle {...handleprops} />}
					</Box>
				</Box>
				<ol>{children}</ol>
				{!showAddCard ? (
					<Box
						onClick={handleOpenAddCard}
						sx={{
							cursor: 'pointer',
							userSelect: 'none',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							width: '272px',
							backgroundColor: theme.palette.boardPage.blackBackgroundList,
							borderBottomRightRadius: '12px',
							borderBottomLeftRadius: '12px',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								borderRadius: '8px',
								fontSize: 14,
								padding: '8px 12px',
								margin: '0 8px 8px 8px',
								gap: 1,
								width: '100%',
								'&:hover': {
									backgroundColor: '#2a2c21',
								},
							}}
						>
							<Plus />
							Agregar tarjeta
						</Box>
					</Box>
				) : (
					<CreateCardInput
						type="card"
						onCreate={handleCreateCard}
						onCancel={handleCloseAddCard}
					/>
				)}
			</Box>
		)
	}
)

export default Container.displayName = 'Container'

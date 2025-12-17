// Container.tsx
import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import { Handle, Remove } from '../Item'
import {
	ContainerActionsStyles,
	ContainerAddCardStyles,
	ContainerContentAddCardStyles,
	ContainerHeaderStyles,
	ContainerStyles,
} from './Container.styles'
import { Box, useTheme } from '@mui/material'
import { Plus } from '@/public/assets/icons/Plus'
import CreateCardInput from '../TextAreaCustom/TextAreaCustom'
import { useTranslations } from 'next-intl'

export interface Props {
	children: React.ReactNode
	label?: string
	style?: React.CSSProperties
	onRemove?(): void
	onRename?: (data: { newName: string }) => void
	handleprops?: React.ButtonHTMLAttributes<HTMLButtonElement>
	onCreateCard?: (value: string) => void
	hover?: boolean
}

export const Container = forwardRef<HTMLDivElement | HTMLButtonElement, Props>(
	(
		{ children, label, onRename, onRemove, handleprops, style, onCreateCard },
		ref
	) => {
		const theme = useTheme()
		const t = useTranslations('BoardsPage.container')

		const [editing, setEditing] = useState(false)
		const [value, setValue] = useState('')

		useEffect(() => {
			setValue(label ?? '')
		}, [editing, label])

		const finish = () => {
			if (value.trim() === label) {
				setEditing(false)
				return
			}
			if (onRename && value.trim()) {
				onRename({ newName: value.trim() })
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

		const handleLongPress = () => setEditing(true)

		let pressTimer: NodeJS.Timeout

		return (
			<Box
				ref={ref as React.Ref<HTMLDivElement>}
				sx={ContainerStyles({ theme, style })}
			>
				<Box
					sx={ContainerHeaderStyles(theme)}
					onDoubleClick={() => setEditing(true)}
				>
					<Box
						onTouchStart={() => {
							pressTimer = setTimeout(handleLongPress, 500)
						}}
						onTouchEnd={() => clearTimeout(pressTimer)}
					>
						{editing ? (
							<input
								autoFocus
								value={value}
								onChange={(e) => setValue(e.target.value)}
								onBlur={finish}
								onKeyDown={(e) => e.key === 'Enter' && finish()}
								onMouseDown={(e) => e.stopPropagation()}
								style={{
									width: '100%',
									fontSize: '1rem',
									color: theme.palette.boardPage.textColumnTitle,
									outline: `1px solid ${theme.palette.boardPage.textColumnBorder}`,
									border: `1px solid ${theme.palette.boardPage.textColumnBorder}`,
									borderRadius: '4px',
								}}
							/>
						) : (
							<span style={{ color: theme.palette.boardPage.textColumnTitle }}>
								{label}
							</span>
						)}
					</Box>

					<Box sx={ContainerActionsStyles}>
						{onRemove && <Remove onClick={onRemove} />}
						{!editing && <Handle {...handleprops} />}
					</Box>
				</Box>
				<ol style={{ marginTop: '-1px' }}>{children}</ol>
				{!showAddCard ? (
					<Box onClick={handleOpenAddCard} sx={ContainerAddCardStyles(theme)}>
						<Box sx={ContainerContentAddCardStyles(theme)}>
							<Plus />
							{t('addCard')}
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

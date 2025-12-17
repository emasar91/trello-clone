import { Box, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import {
	HeaderCloseIconStyles,
	HeaderInputStyles,
	HeaderStyles,
	HeaderTitleStyles,
} from './Header.styles'
import { CloseIcon } from '@/public/assets/icons/CloseIcon'

type IHeaderProps = {
	isEditingTitle: boolean
	setIsEditingTitle: React.Dispatch<React.SetStateAction<boolean>>
	title: string
	setTitle: React.Dispatch<React.SetStateAction<string>>
	onClose: () => void
	onSubmit: () => void
}

/**
 * Header es un componente que muestra el titulo de la tarjeta y permite editarlo.
 * @param {boolean} isEditingTitle - Indica si el titulo esta siendo editado.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsEditingTitle - Funcion para cambiar el estado de isEditingTitle.
 * @param {string} title - El titulo de la tarjeta.
 * @param {React.Dispatch<React.SetStateAction<string>>} setTitle - Funcion para actualizar el titulo de la tarjeta.
 * @param {() => void} onClose - Funcion para cerrar el modal.
 * @param {() => void} onSubmit - Funcion para enviar el titulo editado.
 * @return {JSX.Element} El Header component.
 */
const Header = ({
	isEditingTitle,
	setIsEditingTitle,
	title,
	setTitle,
	onClose,
	onSubmit,
}: IHeaderProps) => {
	const theme = useTheme()

	return (
		<Box sx={HeaderStyles}>
			{!isEditingTitle ? (
				<Typography
					onClick={() => setIsEditingTitle(true)}
					variant="h6"
					sx={HeaderTitleStyles(theme)}
				>
					{title.charAt(0).toUpperCase() + title.slice(1)}
				</Typography>
			) : (
				<form onSubmit={onSubmit} style={{ width: '100%' }}>
					<TextField
						autoFocus
						fullWidth
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						onBlur={onSubmit}
						sx={HeaderInputStyles(theme)}
					/>
				</form>
			)}
			<Box onClick={onClose} sx={HeaderCloseIconStyles(theme)}>
				<CloseIcon />
			</Box>
		</Box>
	)
}

export default Header

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
 * Header component.
 * @param {boolean} isEditingTitle - Is the title editable?
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsEditingTitle - Function to toggle isEditingTitle state.
 * @param {string} title - The title to be displayed.
 * @param {React.Dispatch<React.SetStateAction<string>>} setTitle - Function to update the title state.
 * @param {() => void} onClose - Function to be called when the close button is clicked.
 * @param {() => void} onSubmit - Function to be called when the title form is submitted.
 * @return {JSX.Element} The Header component.
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

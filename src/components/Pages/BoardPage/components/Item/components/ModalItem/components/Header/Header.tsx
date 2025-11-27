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
}

const Header = ({
	isEditingTitle,
	setIsEditingTitle,
	title,
	setTitle,
	onClose,
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
				<TextField
					autoFocus
					fullWidth
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={() => setIsEditingTitle(false)}
					sx={HeaderInputStyles(theme)}
				/>
			)}
			<Box onClick={onClose} sx={HeaderCloseIconStyles(theme)}>
				<CloseIcon />
			</Box>
		</Box>
	)
}

export default Header

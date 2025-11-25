import {
	Box,
	Checkbox,
	FormGroup,
	Menu,
	Typography,
	useTheme,
} from '@mui/material'
import React, { memo } from 'react'

import { TAGS } from '@/constants'
import {
	TagMenuBackgroundSelectionStyles,
	TagMenuContainerStyle,
	TagMenuContentStyle,
	TagMenuFormGroupStyle,
	TagMenuItemCheckboxStyle,
	TagMenuItemContainerStyle,
	TagMenuItemImageStyle,
	TagMenuTypographyContainerStyle,
	TagMenuTypographyStyle,
} from './TagMenu.styles'
import { CloseIcon } from '@/public/assets/icons/CloseIcon'

type ICreateBoardMenuProps = {
	open: boolean
	handleClose: () => void
	anchorEl: null | HTMLElement
	setSelectedTags: (tags: string[]) => void
	selectedTags: string[]
}

type ImageItemProps = {
	imgSrc: string
	onClick: () => void
}

function TagMenu({
	open,
	handleClose,
	anchorEl,
	setSelectedTags,
	selectedTags,
}: ICreateBoardMenuProps) {
	const theme = useTheme()

	// 🟢 Guardamos un array con todos los tags seleccionados

	const toggleTag = (imgSrc: string) => {
		const newTags = selectedTags.includes(imgSrc)
			? selectedTags.filter((tag) => tag !== imgSrc) // si ya está → se quita
			: [...selectedTags, imgSrc] // si no está → se agrega
		setSelectedTags(newTags)
	}

	const TagItem = memo(({ onClick, imgSrc }: ImageItemProps) => (
		<Box sx={TagMenuItemContainerStyle} onClick={onClick} role="button">
			<Box draggable={false} sx={TagMenuItemImageStyle(imgSrc)} />
		</Box>
	))
	TagItem.displayName = 'TagItem'

	return (
		<Menu
			id="create-board-menu"
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			transformOrigin={{ vertical: 'top', horizontal: 'left' }}
			disableAutoFocus
			disableEnforceFocus
			disableScrollLock
			sx={TagMenuContainerStyle(theme)}
		>
			<Box sx={TagMenuContentStyle}>
				<Box sx={TagMenuBackgroundSelectionStyles}>
					<Box sx={TagMenuTypographyContainerStyle}>
						<Typography variant="h6" sx={TagMenuTypographyStyle(theme)}>
							Etiquetas
						</Typography>
						<Box sx={{ cursor: 'pointer' }} onClick={handleClose}>
							<CloseIcon />
						</Box>
					</Box>
					<FormGroup sx={TagMenuFormGroupStyle}>
						{TAGS.map((imgSrc, index) => {
							const isSelected = selectedTags.includes(imgSrc)
							return (
								<Box key={index} sx={TagMenuItemCheckboxStyle}>
									<Checkbox
										checked={isSelected}
										onChange={() => toggleTag(imgSrc)}
										disableRipple
									/>
									<TagItem imgSrc={imgSrc} onClick={() => toggleTag(imgSrc)} />
								</Box>
							)
						})}
					</FormGroup>
				</Box>
			</Box>
		</Menu>
	)
}

export default TagMenu

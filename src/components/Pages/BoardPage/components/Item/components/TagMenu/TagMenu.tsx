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
import { UniqueIdentifier } from '@dnd-kit/core'
import { useTranslations } from 'next-intl'

type ICreateBoardMenuProps = {
	open: boolean
	handleClose: () => void
	anchorEl: null | HTMLElement
	setSelectedTags: (tags: string[]) => void
	selectedTags: string[]
	onSubmit: (cardId: UniqueIdentifier, tags: string[]) => void
	cardId: UniqueIdentifier
}

type ImageItemProps = {
	imgSrc: string
	onClick: () => void
}

/**
 * TagMenu is a component that displays a list of tags that can be selected.
 * It is used in the ModalItem component to allow the user to select tags for a card.
 * The component receives the following props:
 * - open: A boolean that indicates whether the menu is open or not.
 * - handleClose: A function that is called when the menu is closed.
 * - anchorEl: The element that the menu is anchored to.
 * - setSelectedTags: A function that is called when the user selects a tag.
 * - selectedTags: An array of strings that contains the selected tags.
 * - onSubmit: A function that is called when the user submits the selected tags.
 * - cardId: The unique identifier of the card.
 */
function TagMenu({
	open,
	handleClose,
	anchorEl,
	setSelectedTags,
	selectedTags,
	onSubmit,
	cardId,
}: ICreateBoardMenuProps) {
	const theme = useTheme()
	const t = useTranslations('ModalItem')

	/**
	 * Toggles the given tag in the selected tags array.
	 * If the tag is already in the array, it is removed.
	 * If the tag is not in the array, it is added.
	 * After toggling the tag, the onSubmit function is called with the new array of selected tags.
	 * @param {string} imgSrc - The source of the image to toggle.
	 */
	const toggleTag = (imgSrc: string) => {
		const newTags = selectedTags.includes(imgSrc)
			? selectedTags.filter((tag) => tag !== imgSrc)
			: [...selectedTags, imgSrc]
		setSelectedTags(newTags)
		onSubmit(cardId, newTags)
	}

	const TagItem = memo(({ onClick, imgSrc }: ImageItemProps) => (
		<Box sx={TagMenuItemContainerStyle} onClick={onClick} role="button">
			<Box draggable={false} sx={TagMenuItemImageStyle(imgSrc)} />
		</Box>
	))
	TagItem.displayName = 'TagItem'

	return (
		<Menu
			id="tags-menu"
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
							{t('tags')}
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

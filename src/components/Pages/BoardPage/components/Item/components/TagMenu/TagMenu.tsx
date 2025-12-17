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
 * TagMenu es un componente que muestra una lista de tags que pueden ser seleccionados.
 * Se utiliza en el ModalItem para permitir al usuario seleccionar tags para una tarjeta.
 * El componente recibe las siguientes props:
 * - open: Un booleano que indica si el menu esta abierto o no.
 * - handleClose: Una funcion que se llama cuando el menu se cierra.
 * - anchorEl: El elemento que el menu esta anclado a.
 * - setSelectedTags: Una funcion que se llama cuando el usuario selecciona un tag.
 * - selectedTags: Un array de strings que contiene los tags seleccionados.
 * - onSubmit: Una funcion que se llama cuando el usuario envia los tags seleccionados.
 * - cardId: El identificador unico de la tarjeta.
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
	 * Cambia el tag seleccionado en el array de tags seleccionados.
	 * Si el tag ya esta en el array, se remueve.
	 * Si el tag no esta en el array, se agrega.
	 * Despues de cambiar el tag, se llama a la funcion onSubmit con el nuevo array de tags seleccionados.
	 * @param {string} imgSrc - El source de la imagen a togglear.
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

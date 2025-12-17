import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material'
import { ICard } from '@/types/card'
import {
	EditDescriptionButtonCancelStyles,
	EditDescriptionButtonSaveStyles,
	EditDescriptionButtonsContainerStyles,
	EditDescriptionContainerStyles,
	EditDescriptionInputStyles,
} from './EditDescription.styles'
import { useTranslations } from 'next-intl'

interface IEditDescription {
	description: string
	setDescription: React.Dispatch<React.SetStateAction<string>>
	setShowEditDescription: React.Dispatch<React.SetStateAction<boolean>>
	cardSelected?: ICard
	onSubmit: () => void
}

/**
 * Componente para editar la descripci n de una tarjeta.
 *
 * @param {string} description - Descripci n de la tarjeta.
 * @param {React.Dispatch<React.SetStateAction<string>>} setDescription - Funcion para editar la descripci n de la tarjeta.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setShowEditDescription - Funcion para mostrar o esconder el formulario de edici n de la descripci n.
 * @param {ICard | undefined} cardSelected - Tarjeta seleccionada.
 * @param {() => void} onSubmit - Funcion para editar la descripci n de la tarjeta.
 *
 * @returns {JSX.Element} - Componente para editar la descripci n de una tarjeta.
 */
const EditDescription = ({
	description,
	setDescription,
	setShowEditDescription,
	cardSelected,
	onSubmit,
}: IEditDescription) => {
	const theme = useTheme()
	const t = useTranslations('ModalItem')

	return (
		<Box sx={EditDescriptionContainerStyles}>
			<TextField
				value={description}
				autoFocus
				onChange={(e) => {
					const text = e.target.value
					const lines = text.split('\n')

					if (lines.length <= 3) {
						setDescription(text)
					}
				}}
				multiline
				rows={3}
				variant="outlined"
				fullWidth
				maxRows={3}
				sx={EditDescriptionInputStyles(theme)}
			/>
			<Box sx={EditDescriptionButtonsContainerStyles}>
				<Button
					variant="contained"
					onClick={onSubmit}
					sx={EditDescriptionButtonSaveStyles(theme)}
				>
					{t('save')}
				</Button>
				<Button
					sx={EditDescriptionButtonCancelStyles(theme)}
					onClick={() => {
						setDescription(cardSelected?.description || '')
						setShowEditDescription(false)
					}}
				>
					{description !== cardSelected?.description
						? t('discardChanges')
						: t('cancel')}
				</Button>
			</Box>
		</Box>
	)
}

export default EditDescription

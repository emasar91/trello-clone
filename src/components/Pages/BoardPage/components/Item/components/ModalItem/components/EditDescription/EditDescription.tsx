import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material'
import { ICard } from '@/types/card'
import {
	EditDescriptionButtonCancelStyles,
	EditDescriptionButtonsContainerStyles,
	EditDescriptionContainerStyles,
	EditDescriptionInputStyles,
} from './EditDescription.styles'

interface IEditDescription {
	description: string
	setDescription: React.Dispatch<React.SetStateAction<string>>
	setShowEditDescription: React.Dispatch<React.SetStateAction<boolean>>
	cardSelected: ICard
}

const EditDescription = ({
	description,
	setDescription,
	setShowEditDescription,
	cardSelected,
}: IEditDescription) => {
	const theme = useTheme()
	return (
		<Box sx={EditDescriptionContainerStyles}>
			<TextField
				value={description}
				autoFocus
				onChange={(e) => {
					const text = e.target.value
					const lines = text.split('\n')

					if (lines.length <= 4) {
						setDescription(text)
					}
				}}
				multiline
				rows={4}
				variant="outlined"
				fullWidth
				maxRows={4}
				sx={EditDescriptionInputStyles(theme)}
			/>
			<Box sx={EditDescriptionButtonsContainerStyles}>
				<Button variant="contained">Guardar</Button>
				<Button
					sx={EditDescriptionButtonCancelStyles(theme)}
					onClick={() => {
						setDescription(cardSelected?.description || '')
						setShowEditDescription(false)
					}}
				>
					{description !== cardSelected?.description
						? 'Descartar cambios'
						: 'Cancelar'}
				</Button>
			</Box>
		</Box>
	)
}

export default EditDescription

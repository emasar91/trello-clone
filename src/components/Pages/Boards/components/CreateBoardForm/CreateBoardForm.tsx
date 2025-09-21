import {
	Box,
	TextField,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Button,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import { Typography } from '@mui/material'
import {
	CreateBoardFormContainerStyles,
	CreateBoardFormInputSelectMenuStyles,
	CreateBoardFormInputSelectStyles,
	CreateBoardFormInputTitleStyles,
	CreateBoardFormLabelSelectStyles,
	CreateBoardFormLabelTitleStyles,
	CreateBoardFormSubmitButtonStyles,
} from './CreateBoardForm.styles'
import { useTranslations } from 'next-intl'

const CreateBoardForm = () => {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const [title, setTitle] = useState('')
	const [workspace, setWorkspace] = useState('Sirena')

	const handleSubmit = () => {
		if (!title.trim()) {
			return
		}
		// lógica para crear tablero
		console.log({ title, workspace })
	}

	return (
		<Box sx={CreateBoardFormContainerStyles}>
			{/* Título */}
			<FormControl fullWidth>
				<InputLabel shrink sx={CreateBoardFormLabelTitleStyles}>
					{t('titleBoard')}
				</InputLabel>
				<TextField
					placeholder={t('writeTitle')}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					size="small"
					sx={CreateBoardFormInputTitleStyles(theme)}
				/>
				<Typography variant="caption" sx={{ color: 'gray' }}>
					{t('requiredTitle')}
				</Typography>
			</FormControl>

			{/* Espacio de trabajo */}
			<FormControl fullWidth size="small">
				<InputLabel shrink sx={CreateBoardFormLabelSelectStyles}>
					{t('workspace')}
				</InputLabel>

				<Select
					value={workspace}
					onChange={(e) => setWorkspace(e.target.value)}
					sx={CreateBoardFormInputSelectStyles}
					MenuProps={{
						PaperProps: {
							sx: CreateBoardFormInputSelectMenuStyles(theme),
						},
					}}
				>
					<MenuItem value="Sirena" disableRipple>
						Sirena
					</MenuItem>
					<MenuItem value="Dragón" disableRipple>
						Dragón
					</MenuItem>
					<MenuItem value="Fénix" disableRipple>
						Fénix
					</MenuItem>
				</Select>
			</FormControl>

			{/* Botón Crear */}
			<Button
				variant="contained"
				fullWidth
				disabled={!title.trim()}
				onClick={handleSubmit}
				sx={CreateBoardFormSubmitButtonStyles(theme)}
			>
				{t('create')}
			</Button>
		</Box>
	)
}

export default CreateBoardForm

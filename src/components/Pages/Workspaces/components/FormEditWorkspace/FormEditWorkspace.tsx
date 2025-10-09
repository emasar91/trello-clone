import {
	Box,
	Button,
	FormControl,
	InputLabel,
	TextField,
	useTheme,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import {
	FormEditWorkspaceButtonsContainer,
	FormEditWorkspaceCancelButtonStyles,
	FormEditWorkspaceInputStyles,
	FormEditWorkspaceLabelStyles,
	FormEditWorkspaceSubmitButtonStyles,
} from './FormEditWorkspace.styles'

function FormEditWorkspace({
	handleClose,
	onSubmit,
	defaultName,
	loading,
}: {
	handleClose: () => void
	onSubmit: (value1: string, value2: string, resetForm: () => void) => void
	defaultName: string
	loading: boolean
}) {
	const [newWorkspaceName, setNewWorkspaceName] = useState(defaultName)
	const [newDescription, setNewDescription] = useState('')

	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const resetForm = () => {
		setNewWorkspaceName('')
		setNewDescription('')
	}

	const handleSubmit = () => {
		onSubmit(newWorkspaceName, newDescription, resetForm)
	}

	return (
		<Box sx={{ maxWidth: '300px' }}>
			<FormControl fullWidth sx={{ mt: 2 }}>
				<InputLabel shrink sx={FormEditWorkspaceLabelStyles}>
					{t('name')}
				</InputLabel>
				<TextField
					value={newWorkspaceName}
					onChange={(e) => setNewWorkspaceName(e.target.value)}
					size="small"
					sx={FormEditWorkspaceInputStyles(theme)}
				/>
			</FormControl>

			<FormControl fullWidth sx={{ mt: 2 }}>
				<InputLabel shrink sx={FormEditWorkspaceLabelStyles}>
					{t('description')}
				</InputLabel>
				<TextField
					value={newDescription}
					multiline
					maxRows={4}
					onChange={(e) => setNewDescription(e.target.value)}
					size="small"
					sx={FormEditWorkspaceInputStyles(theme)}
				/>
			</FormControl>

			<Box sx={FormEditWorkspaceButtonsContainer}>
				<Button
					variant="contained"
					disabled={!newWorkspaceName.trim() || loading}
					onClick={handleSubmit}
					sx={FormEditWorkspaceSubmitButtonStyles(theme)}
				>
					{t('create')}
				</Button>
				<Button
					onClick={handleClose}
					sx={FormEditWorkspaceCancelButtonStyles(theme)}
				>
					{t('cancel')}
				</Button>
			</Box>
		</Box>
	)
}

export default FormEditWorkspace

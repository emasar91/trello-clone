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

/**
 * Formulario para editar un workspace existente.
 *
 * @param {() => void} handleClose - Funcion para cerrar el formulario.
 * @param {(
 *   newData: { newName: string; newDescription: string },
 *   defaultName: string,
 *   resetForm: () => void
 * ) => void} onSubmit - Funcion para editar un workspace existente.
 * @param {string} defaultName - Nombre original del workspace.
 * @param {string} defaultDescription - Descripcion original del workspace.
 * @param {boolean} loading - Indica si se est  editando el workspace.
 */
function FormEditWorkspace({
	handleClose,
	onSubmit,
	defaultName,
	defaultDescription,
	loading,
}: {
	handleClose: () => void
	onSubmit: (
		newData: { newName: string; newDescription: string },
		defaultName: string,
		resetForm: () => void
	) => void
	defaultName: string
	defaultDescription: string
	loading: boolean
}) {
	const [newWorkspaceName, setNewWorkspaceName] = useState(defaultName)
	const [newDescription, setNewDescription] = useState(defaultDescription)

	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	/**
	 * Resets the form by setting the name and description back to empty strings.
	 */
	const resetForm = () => {
		setNewWorkspaceName('')
		setNewDescription('')
	}

	/**
	 * Submits the form data to edit a workspace.
	 * If the new name and description are the same as the default name and description, the function does nothing.
	 * Otherwise, it calls the onSubmit function passed as a prop with the new data, default name, and reset form function.
	 */
	const handleSubmit = () => {
		const newData = {
			newName: newWorkspaceName === defaultName ? '' : newWorkspaceName.trim(),
			newDescription:
				newDescription === defaultDescription ? '' : newDescription.trim(),
		}
		if (newData.newName === '' && newData.newDescription === '') return

		onSubmit(newData, defaultName, resetForm)
	}

	return (
		<Box sx={{ maxWidth: '300px' }}>
			<FormControl fullWidth sx={{ mt: 2 }}>
				<InputLabel shrink sx={FormEditWorkspaceLabelStyles(theme)}>
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
				<InputLabel shrink sx={FormEditWorkspaceLabelStyles(theme)}>
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
					{t('update')}
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

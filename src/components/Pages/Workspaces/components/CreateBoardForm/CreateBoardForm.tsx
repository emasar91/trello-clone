import {
	Box,
	TextField,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Button,
	useTheme,
	CircularProgress,
} from '@mui/material'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Typography } from '@mui/material'
import {
	CreateBoardFormContainerStyles,
	CreateBoardFormInfoTextStyles,
	CreateBoardFormInputSelectMenuStyles,
	CreateBoardFormInputSelectStyles,
	CreateBoardFormInputTitleStyles,
	CreateBoardFormLabelSelectStyles,
	CreateBoardFormLabelTitleStyles,
	CreateBoardFormSubmitButtonStyles,
} from './CreateBoardForm.styles'
import { useTranslations } from 'next-intl'
import { IWorkspace } from '@/types/workspaces'
import { useGetWorkspaces } from '@/hooks/useGetWorkSpace'

/**
 * Formulario para crear un nuevo tablero en un workspace.
 *
 * @param {onSubmit} Funcion para crear un nuevo tablero.
 * @param {workspaceName} nombre del workspace donde se va a crear el tablero.
 * @param {loading} indica si se est  cargando el workspace.
 * @param {handleClose} Funcion para cerrar el modal.
 *
 * @returns JSX.Element - Formulario para crear un nuevo tablero.
 */
const CreateBoardForm = ({
	onSubmit,
	workspaceName,
	loading,
	handleClose,
}: {
	onSubmit: (args: {
		boardName: string
		boardDescription: string
		workspaceId: string
		resetForm: () => void
		handleClose?: () => void
	}) => void | Promise<void>
	workspaceName?: string
	loading?: boolean
	handleClose?: () => void
}) => {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')
	const [workspaceAvailable, setWorkspaceAvailable] = useState<IWorkspace[]>([])
	const [workspace, setWorkspace] = useState<IWorkspace | null>(null)

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const { getWorkspaces, loading: loadingWorkspace } = useGetWorkspaces()

	useLayoutEffect(() => {
		getWorkspaces(setWorkspaceAvailable)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// 📌 Cuando se cargan, buscamos el de la prop workspaceName
	useEffect(() => {
		if (!workspaceName || workspaceAvailable.length === 0) return

		const found = workspaceAvailable.find(
			(w) => w.name.toLowerCase() === workspaceName.toLowerCase()
		)

		if (found) {
			setWorkspace(found)
		}
	}, [workspaceAvailable, workspaceName])

	/**
	 * Resets the state of the form.
	 * Sets the title and description to empty strings and
	 * sets the workspace to null.
	 */
	const resetForm = () => {
		setTitle('')
		setDescription('')
		setWorkspace(null)
	}

	/**
	 * Submits the form data to create a new board.
	 * Calls the onSubmit function passed as a prop with the new data, reset form function, and handle close function if it exists.
	 * The new data contains the title, description, workspace ID, reset form function, and handle close function.
	 * If the workspace ID is null or undefined, it is set to an empty string.
	 */
	const handleSubmit = () => {
		onSubmit({
			boardName: title,
			boardDescription: description,
			workspaceId: workspace?._id?.toString() ?? '',
			resetForm,
			...(handleClose && { handleClose }),
		})
	}

	return (
		!loadingWorkspace && (
			<Box sx={CreateBoardFormContainerStyles}>
				{/* Título */}
				<FormControl fullWidth>
					<InputLabel shrink sx={CreateBoardFormLabelTitleStyles(theme)}>
						{t('titleBoard')}
					</InputLabel>
					<TextField
						placeholder={t('writeTitle')}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						size="small"
						sx={CreateBoardFormInputTitleStyles(theme)}
					/>
					<Typography
						variant="caption"
						sx={CreateBoardFormInfoTextStyles(theme)}
					>
						{t('requiredTitle')}
					</Typography>
				</FormControl>

				<FormControl fullWidth>
					<InputLabel shrink sx={CreateBoardFormLabelTitleStyles(theme)}>
						{t('descriptionBoard')}
					</InputLabel>
					<TextField
						placeholder={t('writeDescription')}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						size="small"
						sx={CreateBoardFormInputTitleStyles(theme)}
					/>
					<Typography
						variant="caption"
						sx={CreateBoardFormInfoTextStyles(theme)}
					>
						{t('optionalDescription')}
					</Typography>
				</FormControl>

				{/* Espacio de trabajo */}
				<FormControl fullWidth size="small">
					<InputLabel shrink sx={CreateBoardFormLabelSelectStyles(theme)}>
						{loadingWorkspace ? t('loading') : t('workspace')}
					</InputLabel>

					<Select
						sx={CreateBoardFormInputSelectStyles(theme)}
						disabled={loadingWorkspace}
						MenuProps={{
							PaperProps: {
								sx: CreateBoardFormInputSelectMenuStyles(theme),
							},
						}}
						value={workspace?._id ?? ''}
						onChange={(e) => {
							const selected = workspaceAvailable.find(
								(w) => w._id === e.target.value
							)
							setWorkspace(selected || null)
						}}
						renderValue={(selectedId) => {
							const selected = workspaceAvailable.find(
								(w) => w._id === selectedId
							)
							return selected ? selected.name : ''
						}}
					>
						{workspaceAvailable.map((workspace, index) => (
							<MenuItem key={index} value={workspace._id.toString()}>
								{workspace.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				{/* Botón Crear */}
				<Button
					variant="contained"
					fullWidth
					disabled={!title.trim() || loadingWorkspace || loading}
					onClick={handleSubmit}
					sx={CreateBoardFormSubmitButtonStyles(theme)}
				>
					{loading ? <CircularProgress size={20} /> : t('create')}
				</Button>
			</Box>
		)
	)
}

export default CreateBoardForm

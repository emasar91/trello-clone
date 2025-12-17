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
 * CreateBoardForm es un componente que renderiza un formulario para crear un nuevo tablero en un workspace.
 * @param {onSubmit} Funcion para crear un nuevo tablero.
 * @param {workspaceName} nombre del workspace donde se va a crear el tablero.
 * @param {loading} indica si se est  cargando el workspace.
 * @param {handleClose} Funcion para cerrar el modal.
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
	 * resetForm es una funcion que resetea el formulario.
	 */
	const resetForm = () => {
		setTitle('')
		setDescription('')
		setWorkspace(null)
	}

	/**
	 * handleSubmit es una funcion que envia los datos del formulario para crear un nuevo tablero.
	 * Llama a la funcion onSubmit pasada como prop con los nuevos datos, funcion de reseteo del formulario, y funcion de cierre si existe.
	 * Los nuevos datos contienen el titulo, descripcion, ID del workspace, funcion de reseteo del formulario, y funcion de cierre.
	 * Si el ID del workspace es null o undefined, se le asigna un string vacio.
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

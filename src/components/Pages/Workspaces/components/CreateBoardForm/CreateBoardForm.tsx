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

const CreateBoardForm = ({
	onSubmit,
	workspaceName,
}: {
	onSubmit: (args: {
		boardName: string
		boardDescription: string
		workspaceId: string
		resetForm: () => void
	}) => void
	workspaceName?: string
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

	const resetForm = () => {
		setTitle('')
		setDescription('')
		setWorkspace(null)
	}

	const handleSubmit = () => {
		onSubmit({
			boardName: title,
			boardDescription: description,
			workspaceId: workspace?._id,
			resetForm,
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
						{workspaceAvailable.map((workspace) => (
							<MenuItem key={workspace._id} value={workspace._id}>
								{workspace.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				{/* Botón Crear */}
				<Button
					variant="contained"
					fullWidth
					disabled={!title.trim() || loadingWorkspace}
					onClick={handleSubmit}
					sx={CreateBoardFormSubmitButtonStyles(theme)}
				>
					{t('create')}
				</Button>
			</Box>
		)
	)
}

export default CreateBoardForm

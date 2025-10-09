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
import { useEffect, useState } from 'react'
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
import axios from 'axios'
import { API } from '@/constants'
import { useAuth } from '@/context/useAuthContext'
import { IWorkspace } from '@/types/workspaces'

const CreateBoardForm = ({
	onSubmit,
}: {
	onSubmit: (args: {
		boardName: string
		boardDescription: string
		workspaceId: string
		resetForm: () => void
		setLoading: (loading: boolean) => void
	}) => void
}) => {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')
	const [workspaceAvailable, setWorkspaceAvailable] = useState<IWorkspace[]>([])
	const [workspace, setWorkspace] = useState<IWorkspace | null>(null)
	const [loading, setLoading] = useState(false)

	const { user } = useAuth()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const getWorkspaces = async () => {
		setLoading(true)
		const { data } = await axios.get(
			`${API.getWorkspacesUrl}?uid=${user?.uid}`,
			{
				withCredentials: true,
			}
		)
		if (data) {
			setWorkspaceAvailable(data)
			setLoading(false)
		}
	}

	useEffect(() => {
		getWorkspaces()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
			setLoading,
		})
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

			<FormControl fullWidth>
				<InputLabel shrink sx={CreateBoardFormLabelTitleStyles}>
					{t('descriptionBoard')}
				</InputLabel>
				<TextField
					placeholder={t('writeDescription')}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					size="small"
					sx={CreateBoardFormInputTitleStyles(theme)}
				/>
				<Typography variant="caption" sx={{ color: 'gray' }}>
					{t('optionalDescription')}
				</Typography>
			</FormControl>

			{/* Espacio de trabajo */}
			<FormControl fullWidth size="small">
				<InputLabel shrink sx={CreateBoardFormLabelSelectStyles}>
					{loading ? t('loading') : t('workspace')}
				</InputLabel>

				<Select
					sx={CreateBoardFormInputSelectStyles}
					disabled={loading}
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
				disabled={!title.trim() || loading}
				onClick={handleSubmit}
				sx={CreateBoardFormSubmitButtonStyles(theme)}
			>
				{t('create')}
			</Button>
		</Box>
	)
}

export default CreateBoardForm

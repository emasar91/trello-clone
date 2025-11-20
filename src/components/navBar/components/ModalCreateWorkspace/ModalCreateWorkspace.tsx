import {
	Box,
	Button,
	Fade,
	Modal,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import {
	ModalCreateWorkspaceButtonStyle,
	ModalCreateWorkspaceContainerImageMockStyle,
	ModalCreateWorkspaceContainerStyle,
	ModalCreateWorkspaceFormContainerStyle,
	ModalCreateWorkspaceImageMockStyle,
	ModalCreateWorkspaceInputStyle,
	ModalCreateWorkspaceSubTitleStyle,
	ModalCreateWorkspaceTitleStyle,
} from './ModalCreateWorkspaces'
import { useTranslations } from 'next-intl'

type IModalCreateWorkspace = {
	openModal: boolean
	handleCloseModal: () => void
	handleSubmit: (
		workspaceName: string,
		workspaceDescription: string,
		resetForm: () => void
	) => void
	loading: boolean
}

function ModalCreateWorkspace({
	openModal,
	handleCloseModal,
	handleSubmit,
	loading,
}: IModalCreateWorkspace) {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const [workspaceName, setWorkspaceName] = useState('')
	const [workspaceDescription, setWorkspaceDescription] = useState('')

	const handleOnSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		handleSubmit(workspaceName, workspaceDescription, () => {
			setWorkspaceName('')
			setWorkspaceDescription('')
		})
	}

	return (
		<Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
			<Fade in={openModal}>
				<Box sx={ModalCreateWorkspaceContainerStyle(theme)}>
					{/* Parte izquierda */}
					<Box sx={ModalCreateWorkspaceFormContainerStyle}>
						<Typography
							variant="h5"
							fontWeight="bold"
							sx={ModalCreateWorkspaceTitleStyle(theme)}
						>
							{t('modalCreateWorkspace.title')}
						</Typography>
						<Typography
							variant="body2"
							sx={ModalCreateWorkspaceSubTitleStyle(theme)}
						>
							{t('modalCreateWorkspace.subTitle')}
						</Typography>

						<TextField
							fullWidth
							label="Nombre del Espacio de trabajo"
							variant="outlined"
							value={workspaceName}
							sx={ModalCreateWorkspaceInputStyle(theme)}
							onChange={(e) => setWorkspaceName(e.target.value)}
						/>

						<TextField
							fullWidth
							label="Descripción (Opcional)"
							multiline
							rows={4}
							variant="outlined"
							value={workspaceDescription}
							sx={ModalCreateWorkspaceInputStyle(theme)}
							onChange={(e) => setWorkspaceDescription(e.target.value)}
						/>

						<Button
							onClick={handleOnSubmit}
							variant="contained"
							disabled={loading || !workspaceName.trim()}
							sx={ModalCreateWorkspaceButtonStyle(theme)}
						>
							{loading
								? t('modalCreateWorkspace.creating')
								: t('modalCreateWorkspace.create')}
						</Button>
					</Box>

					{/* Parte derecha */}
					<Box sx={ModalCreateWorkspaceContainerImageMockStyle(theme)}>
						<Box
							component="img"
							src="/assets/crearEspacio.svg"
							alt="Mockup"
							sx={ModalCreateWorkspaceImageMockStyle}
						/>
					</Box>
				</Box>
			</Fade>
		</Modal>
	)
}

export default ModalCreateWorkspace

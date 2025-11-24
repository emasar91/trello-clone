import { UniqueIdentifier } from '@dnd-kit/core'
import {
	Box,
	Button,
	CircularProgress,
	Modal,
	Typography,
	useTheme,
} from '@mui/material'
import React from 'react'
import {
	ModalConfirmButtonContainerStyles,
	ModalConfirmButtonStyles,
	ModalConfirmContainerStyles,
	ModalConfirmDescriptionStyles,
	ModalConfirmTitleStyles,
} from './ModalConfirm.styles'

type Props = {
	open: boolean
	onClose: () => void
	onConfirm: (id: UniqueIdentifier | null) => void
	title: string
	message: string
	selectedContainerId: UniqueIdentifier | null
	loading: boolean
}

function ModalConfirm({
	open,
	onClose,
	onConfirm,
	title,
	message,
	selectedContainerId,
	loading,
}: Props) {
	const theme = useTheme()

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={ModalConfirmContainerStyles(theme)}>
				<Typography variant="h6" sx={ModalConfirmTitleStyles(theme)}>
					{title}
				</Typography>
				<Typography variant="body1" sx={ModalConfirmDescriptionStyles(theme)}>
					{message}
				</Typography>
				<Box sx={ModalConfirmButtonContainerStyles}>
					<Button
						variant="contained"
						color="error"
						onClick={() => onConfirm(selectedContainerId)}
						sx={ModalConfirmButtonStyles(theme)}
						disabled={loading}
					>
						{loading ? (
							<CircularProgress size={14} color="inherit" />
						) : (
							'Eliminar'
						)}
					</Button>
					<Button onClick={onClose} sx={ModalConfirmButtonStyles(theme)}>
						Cancelar
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default ModalConfirm

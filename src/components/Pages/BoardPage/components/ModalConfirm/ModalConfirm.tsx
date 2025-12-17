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
	ModalConfirmButtonCancelStyles,
	ModalConfirmButtonContainerStyles,
	ModalConfirmButtonStyles,
	ModalConfirmContainerStyles,
	ModalConfirmDescriptionStyles,
	ModalConfirmTitleStyles,
} from './ModalConfirm.styles'
import { useTranslations } from 'next-intl'

type Props = {
	open: boolean
	onClose: () => void
	onConfirm: (id: UniqueIdentifier | null) => void
	title: string
	message: string
	selectedContainerId: UniqueIdentifier | null
	loading: boolean
}

/**
 * Un componente Modal que confirma si el usuario desea eliminar un contenedor.
 * Muestra un título, un mensaje y dos botones: 'Delete' y 'Cancel'.
 * Cuando el usuario hace clic en 'Delete', llama al callback onConfirm con el selectedContainerId.
 * Cuando el usuario hace clic en 'Cancel', llama al callback onClose.
 * Si la prop loading es true, muestra una animación de carga en lugar del botón 'Delete'.
 * @param {boolean} open - Si el modal está abierto o no.
 * @param {() => void} onClose - Un callback para llamar cuando el usuario hace clic en 'Cancel'.
 * @param {(id: UniqueIdentifier | null) => void} onConfirm - Un callback para llamar cuando el usuario hace clic en 'Delete'.
 * @param {string} title - El título del modal.
 * @param {string} message - El mensaje del modal.
 * @param {UniqueIdentifier | null} selectedContainerId - El id del contenedor a eliminar.
 * @param {boolean} loading - Si el modal está cargando o no.
 * @returns {JSX.Element} - Un JSX element representando el modal de confirmación.
 */
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
	const t = useTranslations('BoardsPage')

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
							t('delete')
						)}
					</Button>

					<Button onClick={onClose} sx={ModalConfirmButtonCancelStyles(theme)}>
						{t('cancel')}
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default ModalConfirm

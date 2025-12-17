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
 * A modal component that confirms whether the user wants to delete a container.
 * It shows a title, a message, and two buttons: 'Delete' and 'Cancel'.
 * When the user clicks on 'Delete', it calls the onConfirm callback with the selectedContainerId.
 * When the user clicks on 'Cancel', it calls the onClose callback.
 * If the loading prop is true, it shows a loading animation instead of the 'Delete' button.
 * @param {boolean} open - Whether the modal is open or not.
 * @param {() => void} onClose - A callback to call when the user clicks on 'Cancel'.
 * @param {(id: UniqueIdentifier | null) => void} onConfirm - A callback to call when the user clicks on 'Delete'.
 * @param {string} title - The title of the modal.
 * @param {string} message - The message of the modal.
 * @param {UniqueIdentifier | null} selectedContainerId - The id of the container to delete.
 * @param {boolean} loading - Whether the modal is loading or not.
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

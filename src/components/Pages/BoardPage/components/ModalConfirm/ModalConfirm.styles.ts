import { SxProps, Theme } from '@mui/material'

export const ModalConfirmContainerStyles = (theme: Theme): SxProps<Theme> => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'auto',
	bgcolor: theme.palette.modal.backgroundColor,
	outline: 'none',
	boxShadow: 24,
	p: 4,
	borderRadius: '8px',
})

export const ModalConfirmTitleStyles = (theme: Theme): SxProps<Theme> => ({
	textAlign: 'center',
	color: theme.palette.modal.textColor,
})

export const ModalConfirmDescriptionStyles = (
	theme: Theme
): SxProps<Theme> => ({
	textAlign: 'center',
	color: theme.palette.modal.textColor,
})

export const ModalConfirmButtonContainerStyles: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'end',
	gap: 2,
}

export const ModalConfirmButtonStyles = (theme: Theme): SxProps<Theme> => ({
	mt: 2,
	color: theme.palette.modal.textColor,
	padding: '8px 18px',
	borderRadius: '8px',
	display: 'flex',
	gap: '4px',
})

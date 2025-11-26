import { SxProps, Theme } from '@mui/material'

export const ModalItemContainerStyles = (theme: Theme): SxProps<Theme> => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	minWidth: '80%',
	maxWidth: '80%',
	bgcolor: theme.palette.modal.backgroundColor,
	outline: 'none',
	boxShadow: 24,
	borderRadius: '8px',
})

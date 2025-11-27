import { SxProps, Theme } from '@mui/material'

export const CreateEditCommentContainerStyles = (
	type: 'new' | 'edit'
): SxProps<Theme> => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	marginTop: type === 'edit' ? '16px' : '0',
})

export const CreateEditCommentInputStyles = (theme: Theme): SxProps<Theme> => ({
	borderColor: 'red',
	'& .MuiInputBase-input': {
		color: theme.palette.modal.textColor,
		borderColor: 'red',
	},
	'& .MuiInputBase-root': {
		borderColor: 'red',
	},
})

export const CreateEditCommentButtonsContainerStyles: SxProps<Theme> = {
	display: 'flex',
	gap: '8px',
	justifyContent: 'start',
	alignItems: 'center',
	width: '100%',
}

export const CreateEditCommentButtonCancelStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.modal.textColor,
	'&:hover': {
		bgcolor: theme.palette.modal.modalBackground,
		filter: 'brightness(1.2)',
	},
})

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
	backgroundColor: theme.palette.modal.backgroundColor,
	'& .MuiInputBase-input': {
		color: theme.palette.modal.textColor,
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
	color: theme.palette.modal.buttonCancelColor,
	bgcolor: 'transparent',
	'&:hover': {
		bgcolor: theme.palette.modal.buttonCancelBackgroundHover,
	},
})

export const CreateEditCommentButtonSaveStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.modal.buttonSubmitColor,
	bgcolor: theme.palette.modal.buttonSubmitBackground,
	'&:hover': {
		bgcolor: theme.palette.modal.buttonSubmitBackgroundHover,
	},
})

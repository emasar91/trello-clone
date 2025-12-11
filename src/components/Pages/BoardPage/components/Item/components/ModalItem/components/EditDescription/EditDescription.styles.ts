import { SxProps, Theme } from '@mui/material'

export const EditDescriptionContainerStyles: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'start',
	width: '100%',
	gap: '8px',
	flexDirection: 'column',
}

export const EditDescriptionInputStyles = (theme: Theme): SxProps<Theme> => ({
	borderColor: 'red',
	'& .MuiInputBase-input': {
		color: theme.palette.modal.textColor,
		borderColor: 'red',
	},
	'& .MuiInputBase-root': {
		borderColor: 'red',
	},
})

export const EditDescriptionButtonsContainerStyles: SxProps<Theme> = {
	display: 'flex',
	gap: '8px',
	justifyContent: 'start',
	alignItems: 'center',
	width: '100%',
}

export const EditDescriptionButtonCancelStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.modal.buttonCancelColor,
	bgcolor: 'transparent',
	'&:hover': {
		bgcolor: theme.palette.modal.buttonCancelBackgroundHover,
	},
})

export const EditDescriptionButtonSaveStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.modal.buttonSubmitColor,
	bgcolor: theme.palette.modal.buttonSubmitBackground,
	'&:hover': {
		bgcolor: theme.palette.modal.buttonSubmitBackgroundHover,
	},
})

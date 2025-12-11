import { SxProps, Theme } from '@mui/material'

export const FormEditWorkspaceButtonsContainer: SxProps<Theme> = {
	display: 'flex',
	gap: '8px',
	marginTop: '16px',
}

export const FormEditWorkspaceSubmitButtonStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.boardSection.buttonTextColor,
	backgroundColor: theme.palette.boardSection.buttonBackgroundColor,
	'&:hover': {
		backgroundColor: theme.palette.boardSection.buttonBackgroundColorHover,
	},
})

export const FormEditWorkspaceCancelButtonStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.boardSection.buttonCancelTextColor,
	backgroundColor: theme.palette.boardSection.buttonCancelBackgroundColor,
	'&:hover': {
		backgroundColor:
			theme.palette.boardSection.buttonCancelBackgroundColorHover,
	},
})

export const FormEditWorkspaceLabelStyles = (theme: Theme): SxProps<Theme> => ({
	color: theme.palette.boardSection.menuText,
	fontSize: '16px',
	lineHeight: '20px',
	marginTop: '8px',
	marginLeft: '-12px',
})

export const FormEditWorkspaceInputStyles = (theme: Theme): SxProps<Theme> => ({
	'& .MuiInputBase-input': {
		color: theme.palette.boardSection.menuText,
		fontSize: '14px',
	},
	'& .MuiOutlinedInput-root': {
		backgroundColor: 'transparent',
		color: theme.palette.boardSection.menuText,
		marginTop: '14px',
		'& fieldset': {
			borderColor: theme.palette.boardSection.borderInputsCreateBoards,
			filter: 'brightness(1.7)',
			color: theme.palette.boardSection.menuText,
		},
		'&:hover fieldset': {
			borderColor: theme.palette.primary.main,
			filter: 'brightness(1.7)',
		},
		'&.Mui-focused fieldset': {
			borderColor: theme.palette.primary.main,
			filter: 'brightness(1.7)',
		},
	},
})

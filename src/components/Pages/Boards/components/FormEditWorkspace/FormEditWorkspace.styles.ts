import { colorDark } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const FormEditWorkspaceButtonsContainer: SxProps<Theme> = {
	display: 'flex',
	gap: '8px',
	marginTop: '16px',
}

export const FormEditWorkspaceSubmitButtonStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: colorDark.black,
	backgroundColor: theme.palette.boardSection.createButtonBackground,
	'&:hover': {
		backgroundColor: theme.palette.boardSection.createButtonBackgroundHover,
	},
})

export const FormEditWorkspaceCancelButtonStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: `${colorDark.white} !important`,
	backgroundColor: theme.palette.boardSection.background,
	filter: 'brightness(1.2)',
	'&:hover': {
		filter: 'brightness(1.5)',
	},
})

export const FormEditWorkspaceLabelStyles: SxProps<Theme> = {
	color: 'white',
	fontSize: '16px',
	lineHeight: '20px',
	marginTop: '8px',
	marginLeft: '-12px',
}

export const FormEditWorkspaceInputStyles = (theme: Theme): SxProps<Theme> => ({
	'& .MuiInputBase-input': {
		color: 'white',
		fontSize: '14px',
	},
	'& .MuiOutlinedInput-root': {
		backgroundColor: 'transparent',
		color: 'white',
		marginTop: '14px',
		'& fieldset': {
			borderColor: theme.palette.boardSection.borderInputsCreateBoards,
			filter: 'brightness(1.7)',
			color: 'white',
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

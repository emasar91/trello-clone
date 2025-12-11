import { colorDark } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const CreateBoardFormContainerStyles: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
}

export const CreateBoardFormLabelTitleStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.boardSection.menuText,
	fontSize: '16px',
	lineHeight: '20px',
	marginTop: '8px',
	marginLeft: '-12px',
})

export const CreateBoardFormInputTitleStyles = (
	theme: Theme
): SxProps<Theme> => ({
	'& .MuiInputBase-input': {
		color: theme.palette.boardSection.menuText,
		fontSize: '14px',
	},
	'& .MuiInputBase-input::placeholder': {
		color: theme.palette.boardSection.menuText,
		fontSize: '14px',
		opacity: 1,
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

export const CreateBoardFormLabelSelectStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.boardSection.menuText,
	fontSize: '16px',
	lineHeight: '20px',
	marginTop: '8px',
	marginLeft: '-12px',
})

export const CreateBoardFormInputSelectStyles = (
	theme: Theme
): SxProps<Theme> => ({
	backgroundColor: 'transparent',
	marginTop: '14px',
	'& .MuiInputBase-input': {
		color: theme.palette.boardSection.menuText,
		fontSize: '14px',
	},
})

export const CreateBoardFormInputSelectMenuStyles = (
	theme: Theme
): SxProps<Theme> => ({
	backgroundColor: theme.palette.boardSection.background,
	color: theme.palette.boardSection.menuText,
	'& .MuiMenuItem-root': {
		'&.Mui-selected': {
			backgroundColor: theme.palette.boardSection.backgroundWorkSpaceSelected,
			color: theme.palette.boardSection.menuText,
		},
		'&.Mui-selected:hover': {
			backgroundColor: theme.palette.boardSection.backgroundWorkSpaceSelected,
		},
		'&:hover': {
			backgroundColor: theme.palette.boardSection.backgroundWorkSpaceHover,
		},
	},
})

export const CreateBoardFormSubmitButtonStyles = (
	theme: Theme
): SxProps<Theme> => ({
	marginTop: 1,
	color: colorDark.black,
	backgroundColor: theme.palette.boardSection.createButtonBackground,
	'&:hover': {
		backgroundColor: theme.palette.boardSection.createButtonBackgroundHover,
	},
})

export const CreateBoardFormInfoTextStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.boardSection.menuText,
})

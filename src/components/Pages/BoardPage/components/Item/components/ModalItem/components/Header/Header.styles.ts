import { SxProps, Theme } from '@mui/material'

export const HeaderStyles: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	padding: '16px 24px',
	height: '64px',
}

export const HeaderTitleStyles = (theme: Theme): SxProps<Theme> => ({
	fontSize: '20px',
	lineHeight: '32px',
	fontWeight: 'bold',
	color: theme.palette.modal.textColor,
})

export const HeaderInputStyles = (theme: Theme): SxProps<Theme> => ({
	maxWidth: '50%',
	input: {
		fontSize: '20px',
		lineHeight: '32px',
		fontWeight: 'bold',
		color: theme.palette.modal.textColor,
		padding: '4px 8px',
	},
})

export const HeaderCloseIconStyles = (theme: Theme): SxProps<Theme> => ({
	cursor: 'pointer',
	color: theme.palette.modal.textColor,
})

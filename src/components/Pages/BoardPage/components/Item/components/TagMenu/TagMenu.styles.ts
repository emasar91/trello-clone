import { SxProps, Theme } from '@mui/material'

export const TagMenuItemContainerStyle: SxProps<Theme> = {
	width: '100%',
	height: '40px',
	cursor: 'pointer',
}

export const TagMenuItemImageStyle = (imgSrc: string): SxProps<Theme> => ({
	width: '100%',
	height: '100%',
	borderRadius: '4px',
	backgroundColor: imgSrc,
})

export const TagMenuContainerStyle = (theme: Theme): SxProps<Theme> => ({
	'& .MuiPaper-root': {
		backgroundColor: theme.palette.boardSection.background,
		width: '304px',
		padding: '8px',
		marginTop: '45px',
	},
})

export const TagMenuItemCheckboxStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	width: '100%',
}

export const TagMenuFormGroupStyle: SxProps<Theme> = {
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	padding: 0,
}

export const TagMenuTypographyStyle = (theme: Theme): SxProps<Theme> => ({
	fontWeight: 'bold',
	color: theme.palette.modal.textColor,
	fontSize: '16px',
	lineHeight: '20px',
})

export const TagMenuTypographyContainerStyle: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	marginBottom: '16px',
}

export const TagMenuContentStyle: SxProps<Theme> = {
	padding: '0 8px 8px 4px',
}

export const TagMenuBackgroundSelectionStyles: SxProps<Theme> = {
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-between',
	gap: '4px',
	padding: 0,
}

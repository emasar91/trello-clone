import { SxProps, Theme } from '@mui/material'

export const ItemInfoContainerStyle = (hoverColor: string): SxProps<Theme> => ({
	width: '33.3%',
	display: 'block',
	padding: '1rem',
	textAlign: 'left',
	textDecoration: 'none',
	'&:hover': {
		backgroundColor: hoverColor || 'white',
	},
})

export const ItemInfoTitleContainerStyle: SxProps<Theme> = {
	display: 'flex',
	lineHeight: '1rem',
	paddingBottom: '0.6rem',
}

export const ItemInfoTitleIconStyle: SxProps<Theme> = {
	padding: '0.14rem 0.71rem 0px 0.15rem',
}

export const ItemInfoTitleStyle: SxProps<Theme> = {
	lineHeight: '1.5rem',
	paddingRight: '0.3rem',
	color: 'rgb(23, 43, 77)',
	fontSize: '1rem',
	fontWeight: 'normal',
	margin: '0px !important',
}

export const ItemInfoDescriptionStyle: SxProps<Theme> = {
	color: ' rgb(80, 95, 121)',
	fontSize: '0.75rem',
	lineHeight: '1rem',
	margin: '0px !important',
}

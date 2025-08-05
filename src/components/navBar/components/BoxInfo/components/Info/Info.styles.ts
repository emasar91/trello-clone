import { SxProps, Theme } from '@mui/material'

export const InfoStyle: SxProps<Theme> = {
	opacity: 1,
	margin: '0px 47.5px 0px auto',
	width: '760px',
	alignItems: 'start',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	padding: '0px 2rem 0px 1rem',
	transition: 'opacity 0.3s',
}

export const InfoContainerLinkStyle: SxProps<Theme> = {
	display: 'flex',
	cursor: 'pointer',
}

export const InfoLinkStyle: SxProps<Theme> = {
	color: 'rgb(23, 43, 77) !important',
	textDecoration: 'none',
}

export const InfoItemTitleStyle: SxProps<Theme> = {
	color: 'rgb(23, 43, 77)',
	fontSize: '1rem',
	fontWeight: 'normal',
	lineHeight: '1.5rem',
	paddingRight: '0.3rem',
	paddingBottom: '0.6rem',
}

export const InfoItemDescriptionStyle: SxProps<Theme> = {
	fontSize: '0.75rem',
}

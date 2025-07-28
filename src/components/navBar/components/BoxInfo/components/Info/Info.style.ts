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

export const InfoTitleStyle: SxProps<Theme> = {
	lineHeight: '21px',
	fontWeight: '500',
	fontFamily: "var(--font-family-text, 'Charlie Text', sans-serif)",
	borderBottom: '1px solid rgb(223, 225, 230)',
	color: 'rgb(23, 43, 77)',
	fontSize: '1rem',
	paddingBottom: '1rem',
	width: '100%',
}

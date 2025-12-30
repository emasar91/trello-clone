import { SxProps, Theme } from '@mui/material'

export const LoginTitleContainerStyle: SxProps<Theme> = {
	height: '100%',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
}

export const LoginTitleSubtitleStyle: SxProps<Theme> = { marginTop: '2rem' }

export const LoginTitleTipStyle: SxProps<Theme> = {
	backgroundColor: '#dbeafe',
	padding: '0.5rem',
	borderRadius: '0.5rem',
	textAlign: 'center',
	whiteSpace: 'pre-line',
	marginTop: '1rem',
}

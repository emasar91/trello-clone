import { SxProps, Theme } from '@mui/material'

export const PageContainerStyle: SxProps<Theme> = {
	display: 'flex',
	height: '100%',
	width: '100%',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgb(148,163,184)',
}

export const PageContainerChildStyle: SxProps<Theme> = {
	display: 'flex',
	width: '100%',
	maxWidth: '1140px !important',
	flexDirection: 'column',
	justifyContent: 'center',
	verticalAlign: 'middle',
}

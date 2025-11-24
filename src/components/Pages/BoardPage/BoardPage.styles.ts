import { SxProps, Theme } from '@mui/material'

export const BoardsPageContainerStyle = (theme: Theme): SxProps<Theme> => ({
	backgroundColor: theme.palette.background.default,
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'start',
	height: 'calc(100vh - 48px)',
	scrollbarWidth: 'thin', // Adjust width for vertical scrollbars
	scrollbarColor: '#6e6f68 #101204',
})

export const ErrorContainerStyle: SxProps<Theme> = {
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: 'calc(100vh - 48px)',
}

export const LoadingContainerStyle: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 2,
}

export const BoardImageStyle: SxProps<Theme> = {
	position: 'absolute',
	top: 48,
	left: 0,
	width: '100%',
	height: 'calc(100vh - 48px)',
	objectFit: 'cover',
	filter: 'brightness(0.8)', // opcional, para oscurecer un poco el fondo
}

export const BoardContentStyle: SxProps<Theme> = {
	position: 'relative',
	overflowX: 'auto',
	zIndex: 1,
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'row',
	p: 2,
	color: 'white',
}

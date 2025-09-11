import { SxProps, Theme } from '@mui/material'

export const BoardsContainerStyle = (theme: Theme): SxProps<Theme> => ({
	backgroundColor: theme.palette.background.default,
	width: '100%',
	height: 'calc(100vh - 48px)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'start',
})

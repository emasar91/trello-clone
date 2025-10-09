import { SxProps, Theme } from '@mui/material'

export const BoardsPageContainerStyle = (theme: Theme): SxProps<Theme> => ({
	backgroundColor: theme.palette.background.default,
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'start',
	minHeight: 'calc(100vh - 48px)',
})

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

import { SxProps, Theme } from '@mui/material'

export const BoardsContainerStyle = (theme: Theme): SxProps<Theme> => ({
	backgroundColor: theme.palette.background.default,
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'start',
	minHeight: 'calc(100vh - 48px)',
})

export const BoardsSectionStyle: SxProps<Theme> = {
	flex: '1 1 calc(100vw - 320px)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'start',
	padding: '0 48px 52px 48px',
}

import { colors } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const NavBarContainerStyle: SxProps<Theme> = {
	display: 'flex',
	width: '100%',
	zIndex: '1300',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: colors.white,
	boxShadow:
		'0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0,0,0,0.1), 0 4px 6px -4px rgb(0,0,0,0.1)',
}

export const NavBarRowStyle: SxProps<Theme> = {
	display: 'flex',
	width: '100%',
	maxWidth: '1320px',
	alignItems: 'center',
	justifyContent: 'space-between',
	overflow: 'hidden',
	backgroundColor: colors.white,
	paddingLeft: '0.5rem',
}

import { colors } from '@/constants'
import { SxProps } from '@mui/material'
import { Theme } from '@mui/system'

export const TabContainerStyle = (selected: boolean): SxProps<Theme> => ({
	fontSize: '16px',
	lineHeight: '24px',
	width: 'auto',
	padding: '16px',
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
	fontWeight: '400',
	color: selected ? colors.textNavbarSelected : colors.textNavbar,
	borderBottom: selected ? `2px solid ${colors.textNavbarSelected}` : 'none',
	borderRadius: '0px',
	boxSizing: 'border-box',
	'&:hover': {
		backgroundColor: 'transparent',
		color: colors.textNavbarSelected,
	},
})

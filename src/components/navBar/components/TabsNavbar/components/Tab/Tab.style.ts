import { colors } from '@/constants'
import { SxProps } from '@mui/material'
import { Theme } from '@mui/system'

export const TabContainerStyle = (
	selected: boolean,
	isOpen: boolean
): SxProps<Theme> => ({
	fontSize: '16px',
	lineHeight: '24px',
	width: 'auto',
	padding: '20px 16px 16px 16px',
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
	fontWeight: '400',
	color: selected && isOpen ? colors.textNavbarSelected : colors.textNavbar,
	borderRadius: '0px',
	boxSizing: 'border-box',
	'&:hover': {
		backgroundColor: 'transparent',
		color: colors.textNavbarSelected,
	},
})

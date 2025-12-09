import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const PageLoginContainerStyle: SxProps<Theme> = {
	display: 'flex',
	paddingLeft: '1rem',
	paddingRight: '1rem',
	paddingTop: '5rem',
	paddingBottom: '5rem',
	flex: '1 1 0%',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	marginTop: '3rem',
	backgroundColor: colorsLanding.mockPageBackground,
}

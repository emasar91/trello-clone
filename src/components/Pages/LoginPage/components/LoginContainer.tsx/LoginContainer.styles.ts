import { colors } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const LoginContainerStyle = (height: string): SxProps<Theme> => ({
	width: '500px',
	position: 'relative',
	padding: '32px',
	maxHeight: height,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '24px',
	borderRadius: ' 10px',
	boxShadow: `0px 0px 10px 0px ${colors.blackShadow}`,
	backgroundColor: colors.white,
})

export const LoginContainerHeaderStyle: SxProps<Theme> = {
	position: 'absolute',
	top: '16px',
	left: '16px',
	color: colors.gray,
	cursor: 'pointer',
}

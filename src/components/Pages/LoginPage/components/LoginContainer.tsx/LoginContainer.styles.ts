import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const LoginContainerStyle = (height: string): SxProps<Theme> => ({
	maxWidth: '500px',
	position: 'relative',
	width: '100%',
	padding: '32px',
	maxHeight: height,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '12px',
	borderRadius: ' 10px',
	boxShadow: `0px 0px 10px 0px ${colorsLanding.loginPageContainerFormShadow}`,
	backgroundColor: colorsLanding.loginPageContainerForm,
})

export const LoginContainerHeaderStyle: SxProps<Theme> = {
	position: 'absolute',
	top: '16px',
	left: '16px',
	cursor: 'pointer',
}

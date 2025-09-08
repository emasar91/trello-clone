import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const ResetPasswordLinkStyle: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'start',
	width: '100%',
	color: colorsLanding.loginPageFormResetPasswordButton,
	fontWeight: 500,
}

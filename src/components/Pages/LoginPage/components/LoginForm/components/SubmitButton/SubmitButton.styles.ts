import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const SubmitButtonContainerStyle = (
	disabled: boolean
): SxProps<Theme> => ({
	width: '100%',
	height: '52px',
	padding: '8px 16px',
	marginTop: '16px',
	borderRadius: '8px',
	backgroundColor: colorsLanding.loginPageFormSubmitButtonBackground,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	fontSize: '20px',
	boxSizing: 'border-box',
	opacity: disabled ? 0.5 : 1,
})

export const SubmitButtonStyle: SxProps<Theme> = {
	color: `${colorsLanding.loginPageFormSubmitButtonText} !important`,
	width: '100%',
}

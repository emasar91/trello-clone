import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const ExtraInfoTitleStyle = (mobileMenu?: boolean): SxProps<Theme> => ({
	lineHeight: '21px',
	fontWeight: '500',
	borderBottom: mobileMenu
		? 'none'
		: `1px solid ${colorsLanding.boxInfoExtraInfoTitleBorder}`,
	color: `${colorsLanding.boxInfoExtraInfoTitle} !important`,
	fontSize: '1rem',
	paddingBottom: '1rem',
	width: '100%',
	marginBottom: '1rem',
})

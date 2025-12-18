import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const ExtraInfoButtonStyle: SxProps<Theme> = {
	userSelect: 'none',
	WebkitBoxAlign: 'center',
	alignItems: 'center',
	borderRadius: '0.3rem',
	cursor: 'pointer',
	display: 'inline-flex',
	textAlign: 'center',
	transition: '250ms ease-out',
	textDecoration: 'none',
	backgroundColor: colorsLanding.boxInfoExtraInfoLinkBackground,
	border: `1px solid ${colorsLanding.boxInfoExtraInfoLinkBorder}`,
	fontSize: '1rem',
	padding: '0.7rem 1rem 0.8rem',
	color: `${colorsLanding.boxInfoExtraInfoLink} !important`,

	'&:hover': {
		backgroundColor: colorsLanding.boxInfoExtraInfoLinkHover,
	},
}

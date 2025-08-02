import { SxProps, Theme } from '@mui/material'
export const ExtraInfoStyle: SxProps<Theme> = {
	textAlign: 'left',
	display: 'flex',
	flexWrap: 'wrap',
	WebkitBoxPack: 'justify',
	justifyContent: 'space-between',
	WebkitBoxAlign: 'center',
	alignItems: 'center',
	gap: '1rem',
	width: '100%',
}

export const NavBarLogoStyle: SxProps<Theme> = {
	alignItems: 'center',
	alignSelf: 'stretch',
	display: 'flex',
	padding: '1rem',
}

export const ExtraInfoItemDescriptionStyle: SxProps<Theme> = {
	fontSize: '0.75rem',
}

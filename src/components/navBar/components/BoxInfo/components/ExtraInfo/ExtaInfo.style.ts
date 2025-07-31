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

export const ExtraInfoTitleStyle: SxProps<Theme> = {
	lineHeight: '21px',
	fontWeight: '500',
	borderBottom: '1px solid rgb(153, 141, 217);',
	color: 'rgb(23, 43, 77) !important',
	fontSize: '1rem',
	paddingBottom: '1rem',
	width: '100%',
	marginBottom: '1rem',
}

export const ExtraInfoDescriptionStyle: SxProps<Theme> = {
	fontSize: '0.75rem',
	marginBottom: '0.5rem',
}

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
	backgroundColor: 'rgb(255, 255, 255)',
	border: '1px solid rgb(101, 84, 192)',
	fontSize: '1rem',
	padding: '0.7rem 1rem 0.8rem',
	color: 'rgb(23, 43, 77) !important',
}

export const NavBarLogoStyle: SxProps<Theme> = {
	alignItems: 'center',
	alignSelf: 'stretch',
	display: 'flex',
	padding: '1rem',
}

export const ExtraInfoItemTitleStyle: SxProps<Theme> = {
	color: 'rgb(23, 43, 77)',
	fontSize: '1rem',
	fontWeight: 'normal',
	lineHeight: '1.5rem',
	paddingRight: '0.3rem',
	paddingBottom: '0.6rem',
}

export const ExtraInfoItemContainerStyle: SxProps<Theme> = {
	textAlign: 'left',
	margin: '-1rem',
	padding: '1.5rem 1rem',
	cursor: 'pointer',
	textDecoration: 'none',
	'&:hover .hover-arrow': {
		opacity: 1,
		transform: 'translateX(0)',
	},
}

export const ExtraInfoItemDescriptionStyle: SxProps<Theme> = {
	fontSize: '0.75rem',
}

export const ExtraInfoLinkStyle: SxProps<Theme> = {
	color: 'rgb(23, 43, 77) !important',
	textDecoration: 'none',
}

export const ExtraInfoContainerLinkStyle: SxProps<Theme> = {
	display: 'flex',
	cursor: 'pointer',
}

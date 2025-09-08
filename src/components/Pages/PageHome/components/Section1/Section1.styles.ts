import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const PageHomeContainerStyle: SxProps<Theme> = {
	alignItems: 'center',
	justifyContent: 'flex-start',
	display: 'flex',
	borderColor: colorsLanding.homePageSection1Container,
}

export const PageHomeContentStyle: SxProps<Theme> = {
	textAlign: 'left',
	display: 'block',
	flex: '0 0 auto',
	width: '50%',
	marginBottom: '0px',
	padding: '0 1rem 8rem 1rem',
}

export const PageHomeTitleStyle: SxProps<Theme> = {
	fontSize: '3rem',
	lineHeight: '1.25',
	fontWeight: 500,
	color: colorsLanding.homePageSection1Title,
	fontFamily: "var(--font-family-text, 'Charlie Display', sans-serif)",
}

export const PageHomeSubtitleStyle: SxProps<Theme> = {
	marginBottom: '1.5rem',
	lineHeight: '1.5',
	fontSize: '20px',
}

export const PageHomeDescriptionStyle: SxProps<Theme> = {
	marginBottom: '1.5rem',
	lineHeight: '1.5',
	fontSize: '16px',
}

export const PageHomeLinkContainerStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
	'&:hover .play-icon': {
		transform: 'translateX(4px)',
	},
}

export const PageHomeLinkStyle: SxProps<Theme> = {
	marginRight: '0.5rem',
	color: colorsLanding.homePageSection1ButtonVideo,
	textDecoration: 'underline',
}

export const PageHomeIconContainerStyle: SxProps<Theme> = {
	transition: 'transform 0.3s ease',
	display: 'flex',
	alignItems: 'center',
}

export const PageHomeVideoContainerStyle: SxProps<Theme> = {
	left: '16.6667%',
	display: 'block',
	flex: '0 0 auto',
	width: '58.3333%',
	marginTop: '0px',
	padding: '4rem 1rem 0 1rem',
}

export const PageHomeVideoStyle: SxProps<Theme> = {
	width: '100%',
	height: 'auto',
	display: 'block',
}

import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const FeatureCardButtonStyle: SxProps<Theme> = {
	userSelect: 'none',
	alignItems: 'center',
	borderRadius: '0.3rem',
	cursor: 'pointer',
	display: 'inline-flex',
	textAlign: 'center',
	transition: '250ms ease-out',
	textDecoration: 'none',
	backgroundColor: colorsLanding.homePageSection4CardButtonBackground,
	border: `1px solid ${colorsLanding.homePageSection4CardButtonBorder}`,
	fontSize: '1rem',
	padding: '0.7rem 1rem 0.8rem',
	color: `${colorsLanding.homePageSection4CardButtonText} !important`,
	'&:hover': {
		backgroundColor: colorsLanding.homePageSection4CardButtonBackgroundHover,
	},
}

export const FeatureCardDescriptionStyle: SxProps<Theme> = {
	margin: 0,
	fontWeight: 400,
	fontSize: '1rem',
	lineHeight: 1.5,
	color: colorsLanding.homePageSection4CardDescription,
}

export const FeatureCardTitleStyle: SxProps<Theme> = {
	fontWeight: 500,
	marginBottom: '0.5rem',
	marginTop: '0px',
	fontSize: '1.5rem',
	lineHeight: '2rem',
	fontFamily: "var(--font-family-text, 'Charlie Display', sans-serif)",
	color: colorsLanding.homePageSection4CardTitle,
}

export const FeatureCardContentStyle: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	height: '100%',
	justifyContent: 'space-between',
}

export const FeatureCardContentContainerStyle: SxProps<Theme> = {
	padding: '1.5rem',
	height: '100%',
	backgroundColor: colorsLanding.homePageSection4CardBackground,
	borderRadius: '0.5rem',
	overflow: 'hidden',
}

export const FeatureCardContianerStyle = (index: number): SxProps<Theme> => ({
	display: 'block',
	flex: '0 0 auto',
	width: '33.3333%',
	padding: '1rem',
	'@media (max-width: 990px)': {
		marginLeft: index !== 2 ? '0' : '25%',
		width: '50%',
	},
	'@media (max-width: 768px)': {
		width: '100%',
		marginLeft: 0,
	},
})

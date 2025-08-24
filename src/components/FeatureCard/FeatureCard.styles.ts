import { colors } from '@/constants'
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
	backgroundColor: colors.white,
	border: `1px solid ${colors.primary}`,
	fontSize: '1rem',
	padding: '0.7rem 1rem 0.8rem',
	color: `${colors.blueText} !important`,
	'&:hover': {
		backgroundColor: colors.violetLight,
	},
}

export const FeatureCardDescriptionStyle: SxProps<Theme> = {
	margin: 0,
	fontWeight: 400,
	fontSize: '1rem',
	lineHeight: 1.5,
	color: colors.darkBlue,
}

export const FeatureCardTitleStyle: SxProps<Theme> = {
	fontWeight: 500,
	marginBottom: '0.5rem',
	marginTop: '0px',
	fontSize: '1.5rem',
	lineHeight: '2rem',
	fontFamily: "var(--font-family-text, 'Charlie Display', sans-serif)",
	color: colors.darkBlue,
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
	backgroundColor: colors.whiteBackground,
	color: colors.darkBlue,
	borderRadius: '0.5rem',
	overflow: 'hidden',
}

export const FeatureCardContianerStyle: SxProps<Theme> = {
	display: 'block',
	flex: '0 0 auto',
	width: '33.3333%',
	padding: '1rem',
}

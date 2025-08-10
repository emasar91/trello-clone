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
	backgroundColor: 'rgb(255, 255, 255)',
	border: '1px solid rgb(0, 101, 255)',
	fontSize: '1rem',
	padding: '0.7rem 1rem 0.8rem',
	color: 'rgb(23, 43, 77) !important',
}

export const FeatureCardDescriptionStyle: SxProps<Theme> = {
	margin: 0,
	fontWeight: 400,
	fontSize: '1rem',
	lineHeight: 1.5,
	color: 'rgb(9, 30, 66)',
}

export const FeatureCardTitleStyle: SxProps<Theme> = {
	fontWeight: 500,
	marginBottom: '0.5rem',
	marginTop: '0px',
	fontSize: '1.5rem',
	lineHeight: '2rem',
	fontFamily: "var(--font-family-text, 'Charlie Display', sans-serif)",
	color: 'rgb(9, 30, 66)',
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
	backgroundColor: ' rgb(250, 251, 252)',
	color: ' rgb(9, 30, 66)',
	borderRadius: '0.5rem',
	overflow: 'hidden',
}

export const FeatureCardContianerStyle: SxProps<Theme> = {
	display: 'block',
	flex: '0 0 auto',
	width: '33.3333%',
	padding: '1rem',
}

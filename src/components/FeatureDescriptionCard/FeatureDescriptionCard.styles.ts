import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const FeatureDescriptionCardDescriptionStyle: SxProps<Theme> = {
	fontWeight: 400,
	color: colorsLanding.homePageSection3CardDescription,
	fontSize: '1.25rem',
	lineHeight: 1.5,
}

export const FeatureDescriptionCardTitleStyle: SxProps<Theme> = {
	fontFamily: 'var(--font-family-text, "Charlie Display", sans-serif)',
	color: colorsLanding.homePageSection3CardTitle,
	fontWeight: 600,
	fontSize: '1rem',
	lineHeight: 1.25,
	textTransform: 'uppercase',
	margin: '0px',
}

export const FeatureDescriptionCardTitleContainerStyle: SxProps<Theme> = {
	alignItems: 'center',
	display: 'flex',
	gap: '1rem',
	marginBottom: '1.5rem',
}

export const FeatureDescriptionCardTitleAndDescriptionContainerStyle: SxProps<Theme> =
	{ padding: '0px 2rem', width: '45%' }

export const FeatureDescriptionCardImageStyle: SxProps<Theme> = { width: '55%' }

export const FeatureDescriptionCardContentStyle = (
	sideImage: 'left' | 'right'
) => ({
	display: 'flex',
	flexDirection: sideImage === 'left' ? 'row' : 'row-reverse',
	backgroundColor: colorsLanding.homePageSection3CardBackground,
	alignItems: 'center',
	borderRadius: ' 0.5rem',
	boxShadow: `${colorsLanding.homePageSection3CardBackgroundShadow}8f 0px 0.5rem 1rem 0px`,
	gap: '2rem',
	textAlign: 'left',
	padding: '2rem',
})

export const FeatureDescriptionCardContainerStyle: SxProps<Theme> = {
	paddingBottom: '4rem',
	margin: '0px 1rem',
}

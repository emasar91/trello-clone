import { colorsLanding } from '@/constants'

export const FeatureCardItemsContainerStyle = {
	display: 'flex',
	margin: '0 -1rem',
	flexWrap: 'wrap',
}

export const Section4DescriptionStyle = {
	color: colorsLanding.homePageSection4Description,
	textAlign: 'start',
	fontSize: '1.25rem',
}

export const Section4TitleStyle = {
	paddingBottom: '1rem',
	fontSize: '2.25rem',
	color: colorsLanding.homePageSection4Title,
	textAlign: 'start',
	lineHeight: 1.33333,
	fontWeight: 600,
	fontFamily: "var(--font-family-text, 'Charlie Display', sans-serif)",
	'@media (max-width: 768px)': {
		fontSize: '1.5rem',
	},
}

export const Section4SubTitleStyle = {
	fontWeight: 500,
	marginBottom: '0.5rem',
	marginTop: '0px',
	fontSize: '1rem',
	lineHeight: 1.25,
	textTransform: 'uppercase',
	textAlign: 'start',
	color: colorsLanding.homePageSection4SubTitle,
}

export const Section4TextContainerStyle = {
	textAlign: 'center',
	marginTop: '175px',
	width: '55.3333%',

	'@media (max-width: 768px)': {
		width: '100%',
	},
}

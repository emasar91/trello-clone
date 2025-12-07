import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const Section2TitleStyle: SxProps<Theme> = {
	paddingBottom: '1rem',
	fontSize: '2.25rem',
	lineHeight: 1.33333,
	fontWeight: 500,
	fontFamily: "var(--font-family-text, 'Charlie Display', sans-serif)",
	'@media (max-width: 768px)': {
		fontSize: '1.5rem',
	},
}

export const Section2SubtitleStyle: SxProps<Theme> = {
	fontWeight: 500,
	marginBottom: '0.5rem',
	marginTop: '0px',
	fontSize: '1rem',
	lineHeight: '1.25',
	textTransform: 'uppercase',
	color: colorsLanding.homePageSection2SubTitle,
}

export const Section2DescriptionStyle: SxProps<Theme> = {
	color: colorsLanding.homePageSection2Description,
	fontSize: '1.25rem',
}

export const Section2TextContainerStyle: SxProps<Theme> = {
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
	display: 'flex',
	flexWrap: 'wrap',
	width: '100%',
	marginLeft: '-1rem',
	marginRight: '-1rem',
}

export const Section2TextContentStyle: SxProps<Theme> = {
	textAlign: 'left',
	order: 1,
	display: 'block',
	flex: '0 0 auto',
	width: '58.3333%',
	padding: '1rem',
	'@media (max-width: 768px)': {
		width: '100%',
	},
}

export const Section2ImageSliderStyle: SxProps<Theme> = {
	width: '100%',
	height: 'auto',
	borderRadius: 2,
	pointerEvents: 'none',
}

export const Section2ImageContainerStyle: SxProps<Theme> = { padding: '0 4px' }

export const Section2ContainerSliderStyle = (
	isDragging: boolean
): SxProps<Theme> => ({
	width: '100%',
	maxWidth: 720,
	mx: 'auto',
	cursor: isDragging ? 'grabbing' : 'grab',
})

export const Section2TabSliderStyle = (
	activeIndex: number,
	index: number
): SxProps<Theme> => ({
	minWidth: activeIndex === index ? '60px' : '8px',
	width: activeIndex === index ? '60px' : '8px',
	height: '8px',
	minHeight: '8px',
	padding: 0,
	margin: '0px 4px !important',
	borderRadius: '6px',
	backgroundColor:
		activeIndex === index
			? colorsLanding.homePageSection2SliderBackgroundActive
			: colorsLanding.homePageSection2SliderBackground,
	color: 'transparent',
	transition: 'all 0.3s ease-in-out',
	'&:hover': {
		backgroundColor:
			activeIndex === index
				? colorsLanding.homePageSection2SliderBackgroundHoverActive
				: colorsLanding.homePageSection2SliderBackgroundHover,
	},
	'& .MuiTab-wrapper': {
		display: 'none',
	},
	'&.Mui-selected': {
		color: 'transparent',
	},
})

export const Section2TabPanelStyle: SxProps<Theme> = {
	'& .MuiTabs-indicator': {
		display: 'none',
	},
	'& .MuiTabs-scroller	': {
		height: '1rem',
	},
	minHeight: '0',
	marginLeft: 'auto',
	width: 'max-content',
}

import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const CustomSliderImageStyle: SxProps<Theme> = {
	width: '100%',
	height: 'auto',
	borderRadius: 2,
	pointerEvents: 'none',
}

export const CustomSliderImageContainerStyle: SxProps<Theme> = {
	padding: '0 4px',
}

export const CustomSliderContentContainerStyle = (
	isDragging: boolean,
	showLeftItems: boolean
): SxProps<Theme> => ({
	width: '100%',
	maxWidth: showLeftItems ? 720 : 1108,
	mawHeight: showLeftItems ? 450 : 300,
	mx: 'auto',
	cursor: isDragging ? 'grabbing' : 'grab',
})

export const CustomSliderTabStyle = (
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
			? colorsLanding.customSliderDotActive
			: colorsLanding.customSliderDot,
	color: 'transparent',
	transition: 'all 0.3s ease-in-out',
	'& .MuiTab-wrapper': {
		display: 'none',
	},
	'&.Mui-selected': {
		color: 'transparent',
	},
})

export const CustomSliderTabsPanelStyle: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'& .MuiTabs-indicator': {
		display: 'none',
	},
	'& .MuiTabs-scroller	': {
		height: '1.5rem',
		display: 'flex',
		alignItems: 'center',
	},
	minHeight: '0',
	marginLeft: 'auto',
	width: 'max-content',
}

export const CustomSliderTabsArrowPanelStyle: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'& .MuiTabs-indicator': {
		display: 'none',
	},
	'& .MuiTabs-scroller	': {
		height: '1.5rem',
	},
}

export const CustomSliderLeftItemsDescriptionStyle: SxProps<Theme> = {
	fontSize: '1rem',
	lineHeight: 1.5,
	color: colorsLanding.customSliderLeftItemsDescription,
}

export const CustomSliderLeftItemsTitleStyle: SxProps<Theme> = {
	mb: '0.5rem',
	fontWeight: 600,
	color: colorsLanding.customSliderLeftItemsTitle,
}

export const CustomSliderLeftItemsContainerStyle = (
	activeIndex: number,
	index: number
): SxProps<Theme> => ({
	cursor: 'pointer',
	padding: '1rem 1rem 1rem 1.5rem',
	borderRadius: 2,
	boxShadow: activeIndex === index ? 4 : 0,
	borderLeft:
		activeIndex === index
			? `0.5rem solid ${colorsLanding.customSliderLeftItemsActiveBorder}`
			: '0.5rem solid transparent',
	transition: 'all 0.3s ease',
	bgcolor: colorsLanding.customSliderLeftItemsActiveBackground,
})

export const CustomSliderLeftItemsContainerColumnStyle: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
	minWidth: 200,
}

export const CustomSliderContainerStyle: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'row',
	gap: 4,
	padding: '1rem 1rem 5rem',
}

export const CustomSliderRightIconTabStyle: SxProps<Theme> = {
	backgroundColor: `${colorsLanding.customSliderArrowRightBackground} !important`,
	padding: '0.4rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'&:hover svg polygon': {
		fill: colorsLanding.customSliderArrowRightHover,
	},
}

export const CustomSliderLeftIconTabStyle: SxProps<Theme> = {
	backgroundColor: `${colorsLanding.customSliderArrowLeftBackground} !important`,
	padding: '0.4rem',
	margin: '0 1rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginRight: '2rem',
	'&:hover svg polygon': {
		fill: colorsLanding.customSliderArrowLeftHover,
	},
}

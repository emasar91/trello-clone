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
	isDragging: boolean
): SxProps<Theme> => ({
	width: '100%',
	maxWidth: 720,
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
	backgroundColor: activeIndex === index ? 'rgb(132,142,160)' : 'rgb(9,30,66)',
	color: 'transparent',
	transition: 'all 0.3s ease-in-out',
	'&:hover': {
		backgroundColor: activeIndex === index ? '#7A8599' : '#B0B0B0',
	},
	'& .MuiTab-wrapper': {
		display: 'none',
	},
	'&.Mui-selected': {
		color: 'transparent',
	},
})

export const CustomSliderTabsPanelStyle: SxProps<Theme> = {
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

export const CustomSliderLeftItemsDescriptionStyle: SxProps<Theme> = {
	fontSize: '1rem',
	lineHeight: 1.5,
	color: 'rgb(9, 30, 66)',
}

export const CustomSliderLeftItemsTitleStyle: SxProps<Theme> = {
	mb: '0.5rem',
	fontWeight: 600,
	color: 'rgb(9, 30, 66)',
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
		activeIndex === index ? '0.5rem solid #00c7e5' : '0.5rem solid transparent',
	transition: 'all 0.3s ease',
	bgcolor: '#fff',
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

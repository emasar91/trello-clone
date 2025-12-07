import { SxProps, Theme } from '@mui/material'

export const PageContainerStyle = (
	backgroundColor?: string,
	margin?: string
): SxProps<Theme> => ({
	display: 'flex',
	height: '100%',
	width: '100%',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: backgroundColor,
	margin: margin,
})

export const PageContainerChildStyle: SxProps<Theme> = {
	display: 'flex',
	width: '100%',
	maxWidth: '1200px',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	verticalAlign: 'middle',
	padding: '0 1rem',
	// '@media (min-width: 1200px)': {
	// 	maxWidth: '1140px ',
	// },

	// '@media (min-width: 990px)': {
	// 	maxWidth: '960px ',
	// },
	// '@media (min-width: 768px)': {
	// 	maxWidth: '720px ',
	// },

	// '@media (min-width: 576px)': {
	// 	maxWidth: '540px ',
	// },

	'@media (min-width: 1200px)': {
		maxWidth: '1140px',
	},

	/* 992px – 1199px */
	'@media (min-width: 992px) and (max-width: 1199px)': {
		maxWidth: '960px',
	},

	/* 768px – 991px */
	'@media (min-width: 768px) and (max-width: 991px)': {
		maxWidth: '720px',
	},

	/* 576px – 767px */
	'@media (min-width: 576px) and (max-width: 767px)': {
		maxWidth: '540px',
	},
}

import { SxProps, Theme } from '@mui/material'

export const Section3ContainerStyle: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}

export const Section3TitleStyle: SxProps<Theme> = {
	fontSize: '2.25rem',
	lineHeight: 1.33333,
	color: 'white',
	fontWeight: 'bold',
	fontFamily: "var(--font-family-text, 'Charlie Display', sans-serif)",
	textAlign: 'center',
	marginTop: '0.5rem',
}

export const Section3SubTitleStyle: SxProps<Theme> = {
	fontSize: '1.25rem',
	lineHeight: 1.5,
	color: 'white',
	fontFamily: "var(--font-family-text, 'Charlie Display', sans-serif)",
	textAlign: 'center',
}

export const Section3ConainterTitleAndSubStyle: SxProps<Theme> = {
	width: '66.6667%',
	padding: '4rem 1rem',
}

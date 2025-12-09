import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const MockPageContainerStyle = {
	display: 'flex',
	paddingLeft: '1rem',
	paddingRight: '1rem',
	paddingTop: '5rem',
	paddingBottom: '5rem',
	flex: '1 1 0%',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	marginTop: '3rem',
	backgroundColor: colorsLanding.mockPageBackground,
}

export const MockPageCardContainerStyle: SxProps<Theme> = { maxWidth: 500 }

export const MockPageButtonsContainerStyle: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
}

export const MockPageButtonStyle: SxProps<Theme> = {
	color: colorsLanding.mockPageLoginButtonText,
	backgroundColor: colorsLanding.mockPageLoginButtonBackground,
}

export const MockPageButtonHomeStyle: SxProps<Theme> = {
	color: colorsLanding.mockPageLoginButtonText,
}

export const MockPageTitleStyle: SxProps<Theme> = {
	marginBottom: '0.5rem',
	fontSize: '1.5rem',
	lineHeight: '2rem',
	fontWeight: 600,
	color: colorsLanding.mockPageTitle,
}

export const MockPageSubtitleStyle: SxProps<Theme> = {
	lineHeight: 1.625,
	color: colorsLanding.mockPageSubTitle,
}

export const MockPageDescriptionStyle: SxProps<Theme> = {
	fontSize: '0.875rem',
	lineHeight: 1.625,
	color: colorsLanding.mockPageDescription,
}

export const MockPageDescriptionContainerStyle: SxProps<Theme> = {
	marginBottom: '1.5rem',
	borderRadius: '0.5rem',
	backgroundColor: colorsLanding.mockPageDescriptionContainerBackground,
	padding: '1rem',
}

export const MockPageIconContainerStyle: SxProps<Theme> = {
	marginLeft: 'auto',
	marginRight: 'auto',
	marginBottom: '1rem',
	display: 'flex',
	height: '4rem',
	width: '4rem',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '100%',
	backgroundColor: colorsLanding.mockPageIconContainerBackground,
}

export const MockPageTitleAndSubtitleContainerStyle: SxProps<Theme> = {
	marginBottom: '2rem',
}

export const MockPageContentStyle: SxProps<Theme> = {
	padding: '2rem',
	textAlign: 'center',
}

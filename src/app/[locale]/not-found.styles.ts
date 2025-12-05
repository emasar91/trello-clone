import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const NotFoundContainerStyle = {
	display: 'flex',
	paddingLeft: '1rem',
	paddingRight: '1rem',
	paddingTop: '5rem',
	paddingBottom: '5rem',
	flex: '1 1 0%',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	backgroundColor: colorsLanding.page404Background,
}

export const NotFoundCardContainerStyle: SxProps<Theme> = { maxWidth: 500 }

export const NotFoundButtonsContainerStyle: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
}

export const NotFoundButtonStyle: SxProps<Theme> = {
	color: colorsLanding.page404LoginButtonText,
	backgroundColor: colorsLanding.page404LoginButtonBackground,
}

export const NotFoundButtonHomeStyle: SxProps<Theme> = {
	color: colorsLanding.page404LoginButtonText,
}

export const NotFoundTitleStyle: SxProps<Theme> = {
	marginBottom: '0.5rem',
	fontSize: '1.5rem',
	lineHeight: '2rem',
	fontWeight: 600,
	color: colorsLanding.page404Title,
}

export const NotFoundSubtitleStyle: SxProps<Theme> = {
	lineHeight: 1.625,
	color: colorsLanding.page404SubTitle,
}

export const NotFoundDescriptionStyle: SxProps<Theme> = {
	fontSize: '0.875rem',
	lineHeight: 1.625,
	color: colorsLanding.page404Description,
}

export const NotFoundDescriptionContainerStyle: SxProps<Theme> = {
	marginBottom: '1.5rem',
	borderRadius: '0.5rem',
	backgroundColor: colorsLanding.page404DescriptionContainerBackground,
	padding: '1rem',
}

export const NotFoundIconContainerStyle: SxProps<Theme> = {
	marginLeft: 'auto',
	marginRight: 'auto',
	marginBottom: '1rem',
	display: 'flex',
	height: '4rem',
	width: '4rem',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '100%',
	backgroundColor: colorsLanding.page404IconContainerBackground,
}

export const NotFoundTitleAndSubtitleContainerStyle: SxProps<Theme> = {
	marginBottom: '2rem',
}

export const NotFoundContentStyle: SxProps<Theme> = {
	padding: '2rem',
	textAlign: 'center',
}

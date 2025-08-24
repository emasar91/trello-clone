import { colors } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const InfoTitleStyle: SxProps<Theme> = {
	lineHeight: '21px',
	fontWeight: '500',
	fontFamily: "var(--font-family-text, 'Charlie Text', sans-serif)",
	borderBottom: `1px solid ${colors.whiteBackground}`,
	color: colors.darkBlue,
	fontSize: '1rem',
	paddingBottom: '1rem',
	width: '100%',
}

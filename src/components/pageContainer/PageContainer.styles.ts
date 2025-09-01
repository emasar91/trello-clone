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
	maxWidth: '1140px !important',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	verticalAlign: 'middle',
}

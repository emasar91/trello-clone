import { CSSProperties, SxProps, Theme } from '@mui/material'

export const ShowPasswordStyle: SxProps<Theme> = {
	position: 'absolute',
	justifyContent: 'center',
	alignItems: 'center',
	right: '15px',
	top: '15px',
	width: '30px',
	height: '30px',
	borderRadius: '50%',
	cursor: 'pointer',
}

export const ShowPasswordIconStyle: CSSProperties = {
	margin: 0,
	padding: 0,
	position: 'absolute',
	right: 4,
	top: 4,
}

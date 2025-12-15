import { SxProps, Theme } from '@mui/material'

export const ColumnAdderAddColumnStyles: SxProps<Theme> = {
	cursor: 'pointer',
	userSelect: 'none',
	backgroundColor: '#ffffff3d',
	padding: '8px 12px',
	fontSize: 14,
	marginTop: '50px',
	display: 'inline-flex',
	alignItems: 'center',
	gap: '8px',
	borderRadius: '8px',
	width: '272px',
	height: '44px',
	'&:hover': {
		backgroundColor: 'rgba(255, 255, 255, 0.20)',
	},
}

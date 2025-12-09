import { SxProps, Theme } from '@mui/material'

export const LoginCreateAccountContainerStyle: SxProps<Theme> = {
	display: 'flex',
	gap: '8px',
	alignItems: 'center',
	justifyContent: 'center',
	'@media (max-width: 600px)': {
		flexDirection: 'column',
	},
}

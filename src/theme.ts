'use client'
import { createTheme } from '@mui/material/styles'
import { colors } from './constants'

const theme = createTheme({
	typography: {
		fontFamily: '"Charlie Text", "Roboto", "Helvetica", "Arial", sans-serif',
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				root: {
					color: colors.blueText,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: colors.blueText,
					textTransform: 'none',
				},
			},
		},
	},
})

export default theme

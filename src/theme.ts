'use client'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		fontFamily: '"Charlie Text", "Roboto", "Helvetica", "Arial", sans-serif',
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				root: {
					color: 'rgb(23, 43, 77)',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: 'rgb(23, 43, 77)',
					textTransform: 'none', // ya que lo habías preguntado antes
				},
			},
		},
		// Otros componentes si querés: MuiInputBase, MuiFormLabel, etc.
	},
})

export default theme

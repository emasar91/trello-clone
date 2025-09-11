import { createTheme } from '@mui/material/styles'
import { colorDark, colorTokens } from './constants'

declare module '@mui/material/styles' {
	interface Palette {
		navbar: {
			containerBackground: string
			createButtonBackground: string
			createButtonText: string
			searchInputBackground?: string
			searchInputText?: string
			searchInputPlaceholder?: string
			searchInputIcon?: string
			searchInputBorder?: string
			searchInputBackgroundHover?: string
			logoHover?: string
		}
		accountMenu: {
			avatarMenuBackground?: string
			menuBackground?: string
			menuBorder?: string
			menuTitle?: string
			avatarName?: string
			avatarEmail?: string
			itemsHover?: string
			itemsText?: string
			backgroundColorItemSelected?: string
			itemsTextSelected?: string
			colorDividerMenu?: string
			itemBackgroundHover?: string
			itemSelectedBackgroundHover?: string
		}
		boardsMenu: {
			textBoards: string
			textBoardsSelected: string
			backgroundBoardsHover: string
			backgroundBoardsSelected: string
		}
	}
	interface PaletteOptions {
		navbar?: {
			containerBackground?: string
			createButtonBackground?: string
			createButtonBackgroundHover?: string
			createButtonText?: string
			searchInputBackground?: string
			searchInputText?: string
			searchInputPlaceholder?: string
			searchInputIcon?: string
			searchInputBorder?: string
			searchInputBackgroundHover?: string
			logoHover?: string
		}
		accountMenu: {
			avatarMenuBackground?: string
			menuBackground?: string
			menuBorder?: string
			menuTitle?: string
			avatarName?: string
			avatarEmail?: string
			itemsHover?: string
			itemsText?: string
			backgroundColorItemSelected?: string
			itemsTextSelected?: string
			colorDividerMenu?: string
			itemBackgroundHover?: string
			itemSelectedBackgroundHover?: string
		}
		boardsMenu: {
			textBoards: string
			textBoardsSelected: string
			backgroundBoardsHover: string
			backgroundBoardsSelected: string
		}
	}
}

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: colorTokens.brandPrimary,
		},
		background: {
			default: colorTokens.white,
			paper: colorTokens.white,
		},
		text: {
			primary: colorTokens.darkBlue,
			secondary: colorTokens.gray,
		},
		navbar: {
			containerBackground: colorDark.blackBackground,
			createButtonBackground: colorDark.brandPrimary,
			createButtonBackgroundHover: colorDark.brandPrimaryHover,
			createButtonText: colorDark.black,
			searchInputBackground: colorDark.blackBackgroundLight,
			searchInputBackgroundHover: colorDark.blackBackgroundHover,
			searchInputText: colorDark.grayLight,
			searchInputPlaceholder: colorDark.grayLight,
			searchInputIcon: colorDark.grayLight,
			searchInputBorder: colorDark.grayLight,
			logoHover: colorDark.blackBackgroundLightHover,
		},
		accountMenu: {
			avatarMenuBackground: colorDark.blackBackgroundLightHover,
			menuBackground: colorDark.blackBackgroundMenu,
			menuBorder: colorDark.gray,
			menuTitle: colorDark.grayLight,
			avatarName: colorDark.grayTextAvatar,
			avatarEmail: colorDark.grayTextAvatarSecondary,
			itemsHover: colorDark.blackBackgroundLightHover,
			itemsText: colorDark.grayTextItems,
			itemsTextSelected: colorDark.brandPrimary,
			backgroundColorItemSelected: colorDark.blueBackgroundSelected,
			colorDividerMenu: colorDark.grayLight,
		},
		boardsMenu: {
			textBoards: colorDark.grayTextItems,
			textBoardsSelected: colorDark.brandPrimary,
			backgroundBoardsHover: colorDark.grayLightHover,
			backgroundBoardsSelected: colorDark.blueBackgroundSelected,
		},
	},
	typography: {
		fontFamily: '"Charlie Text", "Roboto", "Helvetica", "Arial", sans-serif',
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: colorDark.gray, // color por defecto
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: colorDark.gray, // color en hover
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: colorDark.brandPrimary, // color en focus
						borderWidth: 2,
					},
				},
				input: {
					color: colorDark.darkBlue, // color del texto
				},
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					// elimina filtro y overlay
					backdropFilter: 'none',
					WebkitBackdropFilter: 'none',
					backgroundImage: 'none',
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					// mismo fix para Menú
					backdropFilter: 'none',
					WebkitBackdropFilter: 'none',
					backgroundImage: 'none',
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: colorTokens.blueText,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: colorTokens.blueText,
					textTransform: 'none',
				},
			},
		},
	},
})

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: colorTokens.brandPrimary,
		},
		background: {
			default: colorTokens.blackBackground,
			paper: '#1e1e2f',
		},
		text: {
			primary: colorTokens.white,
			secondary: colorTokens.grayLight,
		},
		navbar: {
			containerBackground: colorDark.blackBackground,
			createButtonBackground: colorDark.brandPrimary,
			createButtonBackgroundHover: colorDark.brandPrimaryHover,
			createButtonText: colorDark.black,
			searchInputBackground: colorDark.blackBackgroundLight,
			searchInputBackgroundHover: colorDark.blackBackgroundHover,
			searchInputText: colorDark.grayLight,
			searchInputPlaceholder: colorDark.grayLight,
			searchInputIcon: colorDark.grayLight,
			searchInputBorder: colorDark.grayLight,
			logoHover: colorDark.blackBackgroundLightHover,
		},
		accountMenu: {
			avatarMenuBackground: colorDark.blackBackgroundLightHover,
			menuBackground: colorDark.blackBackgroundMenu,
			menuBorder: colorDark.gray,
			menuTitle: colorDark.grayLight,
			avatarName: colorDark.grayTextAvatar,
			avatarEmail: colorDark.grayTextAvatarSecondary,
			itemsHover: colorDark.blackBackgroundLightHover,
			itemsText: colorDark.grayTextItems,
			itemsTextSelected: colorDark.brandPrimary,
			backgroundColorItemSelected: colorDark.blueBackgroundSelected,
			colorDividerMenu: colorDark.grayLight,
			itemBackgroundHover: colorDark.grayLightHover,
			itemSelectedBackgroundHover: colorDark.blueBackgroundSelected,
		},
		boardsMenu: {
			textBoards: colorDark.grayTextItems,
			textBoardsSelected: colorDark.brandPrimary,
			backgroundBoardsHover: colorDark.blackBackgroundLightHover,
			backgroundBoardsSelected: colorDark.blueBackgroundSelected,
		},
	},
	typography: {
		fontFamily: '"Charlie Text", "Roboto", "Helvetica", "Arial", sans-serif',
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: colorDark.gray, // color por defecto
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: colorDark.gray, // color en hover
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: colorDark.brandPrimary, // color en focus
						borderWidth: 2,
					},
				},
				input: {
					color: colorDark.darkBlue, // color del texto
				},
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					// elimina filtro y overlay
					backdropFilter: 'none',
					WebkitBackdropFilter: 'none',
					backgroundImage: 'none',
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					// mismo fix para Menú
					backdropFilter: 'none',
					WebkitBackdropFilter: 'none',
					backgroundImage: 'none',
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: colorTokens.blueText,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: colorTokens.blueText,
					textTransform: 'none',
				},
			},
		},
	},
})

import { createTheme } from '@mui/material/styles'
import { colorDark, colorTokens } from './constants'

declare module '@mui/material/styles' {
	interface Palette {
		navbar: {
			containerBackground: string
			createButtonBackground: string
			createButtonBackgroundHover?: string
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
		boardSection: {
			background: string
			seePreviousBoardsText: string
			workspacesText: string
			boardCardTitle: string
			boardCardBackground: string
			createBoardCardBackground?: string
			borderInputsCreateBoards: string
			backgroundWorkSpaceHover: string
			backgroundWorkSpaceSelected: string
			createButtonBackground: string
			createButtonBackgroundHover: string
		}
		modalCreateWorkspace: {
			backgroundImageContainer: string
			title: string
			description: string
			background: string
			buttonBackgroundColor: string
			buttonBackgroundColorHover: string
		}
		boardPage: {
			addButtonCard: string
			addButtonColumn: string
			addButtonColumnHover: string
			addButtonColumnText: string
			blackBackgroundList: string
			blackBackgroundCard: string
			textGray: string
		}
		modal: {
			backgroundColor: string
			backgroundColorActivity: string
			textColor: string
			buttonColor: string
			buttonHoverColor: string
			modalBackground: string
		}
		scrollbar: {
			color1: string
			color2: string
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
		boardSection: {
			background: string
			seePreviousBoardsText: string
			workspacesText: string
			boardCardTitle: string
			boardCardBackground: string
			createBoardCardBackground?: string
			borderInputsCreateBoards: string
			backgroundWorkSpaceHover: string
			backgroundWorkSpaceSelected: string
			createButtonBackground: string
			createButtonBackgroundHover: string
		}
		modalCreateWorkspace: {
			backgroundImageContainer: string
			title: string
			description: string
			background: string
			buttonBackgroundColor: string
			buttonBackgroundColorHover: string
		}
		boardPage: {
			addButtonCard: string
			addButtonColumn: string
			addButtonColumnHover: string
			addButtonColumnText: string
			blackBackgroundList: string
			blackBackgroundCard: string
			textGray: string
		}
		modal: {
			backgroundColor: string
			backgroundColorActivity: string
			textColor: string
			buttonColor: string
			buttonHoverColor: string
			modalBackground: string
		}
		scrollbar: {
			color1: string
			color2: string
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
		boardSection: {
			background: colorDark.blackBackgroundMenu,
			seePreviousBoardsText: colorDark.grayTextItems,
			workspacesText: colorDark.grayTextItems,
			boardCardTitle: colorDark.grayTextItems,
			boardCardBackground: colorDark.blackBackground,
			createBoardCardBackground: colorDark.grayCreateBoard,
			borderInputsCreateBoards: colorDark.gray,
			backgroundWorkSpaceHover: colorDark.blackBackgroundLightHover,
			backgroundWorkSpaceSelected: colorDark.blueBackgroundSelected,
			createButtonBackground: colorDark.brandPrimary,
			createButtonBackgroundHover: colorDark.brandPrimaryHover,
		},
		modalCreateWorkspace: {
			backgroundImageContainer: colorDark.iconBackground,
			title: colorDark.grayTextItems,
			description: colorDark.grayTextItems,
			background: colorDark.blackBackgroundMenu,
			buttonBackgroundColor: colorDark.brandPrimary,
			buttonBackgroundColorHover: colorDark.brandPrimaryHover,
		},
		boardPage: {
			addButtonCard: colorDark.grayCreateBoard,
			addButtonColumn: colorDark.grayCreateBoard,
			addButtonColumnHover: colorDark.grayTransparent,
			addButtonColumnText: colorDark.blueText,
			blackBackgroundList: colorDark.blackBackgroundList,
			blackBackgroundCard: colorDark.blackCard,
			textGray: colorDark.grayTextCard,
		},
		modal: {
			backgroundColor: colorDark.blackCard,
			textColor: colorDark.grayTextCard,
			buttonColor: colorDark.brandPrimary,
			buttonHoverColor: colorDark.brandPrimaryHover,
			backgroundColorActivity: colorDark.blackCardDark,
			modalBackground: colorDark.modalBackground,
		},
		scrollbar: {
			color1: colorDark.scrollbarColor1,
			color2: colorDark.scrollbarColor2,
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
			searchInputBackground: colorDark.blackBackgroundMenu,
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
		boardSection: {
			background: colorDark.blackBackgroundMenu,
			seePreviousBoardsText: colorDark.grayTextItems,
			workspacesText: colorDark.grayTextItems,
			boardCardTitle: colorDark.grayTextItems,
			boardCardBackground: colorDark.blackBackground,
			createBoardCardBackground: colorDark.grayCreateBoard,
			borderInputsCreateBoards: colorDark.gray,
			backgroundWorkSpaceHover: colorDark.blackBackgroundLightHover,
			backgroundWorkSpaceSelected: colorDark.blueBackgroundSelected,
			createButtonBackground: colorDark.brandPrimary,
			createButtonBackgroundHover: colorDark.brandPrimaryHover,
		},
		modalCreateWorkspace: {
			backgroundImageContainer: colorDark.iconBackground,
			title: colorDark.grayTextItems,
			description: colorDark.grayTextItems,
			background: colorDark.blackBackgroundMenu,
			buttonBackgroundColor: colorDark.brandPrimary,
			buttonBackgroundColorHover: colorDark.brandPrimaryHover,
		},
		boardPage: {
			addButtonCard: colorDark.grayCreateBoard,
			addButtonColumn: colorDark.grayTransparent,
			addButtonColumnText: colorDark.blueText,
			addButtonColumnHover: colorDark.grayTransparentHover,
			blackBackgroundList: colorDark.blackBackgroundList,
			blackBackgroundCard: colorDark.blackCard,
			textGray: colorDark.grayTextCard,
		},
		modal: {
			backgroundColor: colorDark.blackCard,
			textColor: colorDark.grayTextCard,
			buttonColor: colorDark.brandPrimary,
			buttonHoverColor: colorDark.brandPrimaryHover,
			backgroundColorActivity: colorDark.blackCardDark,
			modalBackground: colorDark.modalBackground,
		},
		scrollbar: {
			color1: colorDark.scrollbarColor1,
			color2: colorDark.scrollbarColor2,
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

import { createTheme } from '@mui/material/styles'
import { colorDark, colorLight, colorTokens } from './constants'

declare module '@mui/material/styles' {
	interface Palette {
		navbar: {
			logoColor: string
			containerBackground: string
			borderBottom: string
			createButtonBackground: string
			createButtonBackgroundHover: string
			createButtonText: string
			searchInputBackground: string
			searchInputText: string
			searchInputPlaceholder: string
			searchInputIcon: string
			searchInputBorder: string
			searchInputBackgroundHover: string
			logoHover: string
			boxSearch: {
				backgroundColor: string
				backgroundHover: string
				textColor: string
				borderColor: string
				secondaryTextColor: string
			}
		}
		accountMenu: {
			avatarMenuBackground: string
			menuBackground: string
			menuBorder: string
			menuTitle: string
			avatarName: string
			avatarEmail: string
			itemsHover: string
			itemsText: string
			backgroundColorItemSelected: string
			itemsTextSelected: string
			colorDividerMenu: string
			itemBackgroundHover: string
			itemSelectedBackgroundHover: string
		}
		boardsMenu: {
			textBoards: string
			textBoardsSelected: string
			backgroundBoardsHover: string
			backgroundBoardsSelected: string
		}
		boardSection: {
			menuText: string
			textAvatar: string
			background: string
			seePreviousBoardsText: string
			workspacesText: string
			boardCardTitle: string
			boardCardBackground: string
			boardCardBackgroundHover: string
			createBoardCardBackground: string
			borderInputsCreateBoards: string
			backgroundWorkSpaceHover: string
			backgroundWorkSpaceSelected: string
			createButtonBackground: string
			createButtonBackgroundHover: string
			buttonBackgroundColor: string
			buttonBackgroundColorHover: string
			buttonTextColor: string
			buttonCancelBackgroundColor: string
			buttonCancelBackgroundColorHover: string
			buttonCancelTextColor: string
		}
		modalCreateWorkspace: {
			backgroundImageContainer: string
			title: string
			description: string
			background: string
			buttonBackgroundColor: string
			buttonBackgroundColorHover: string
			buttonTextColor: string
		}
		boardPage: {
			addButtonCard: string
			addButtonColumn: string
			addButtonColumnHover: string
			addButtonColumnText: string
			blackBackgroundList: string
			blackBackgroundCard: string
			textGray: string
			addButtonCardHover: string
			textColumnTitle: string
			textColumnBorder: string
		}
		modal: {
			backgroundColor: string
			backgroundColorActivity: string
			textColor: string
			buttonColor: string
			buttonHoverColor: string
			modalBackground: string
			buttonEditBackground: string
			buttonSubmitBackground: string
			buttonSubmitBackgroundHover: string
			buttonSubmitColor: string
			buttonCancelColor: string
			buttonCancelBackground: string
			buttonCancelBackgroundHover: string
			commentBackgroundHover: string
			colorTextDeleteButton: string
		}
		scrollbar: {
			color1: string
			color2: string
		}
	}
	interface PaletteOptions {
		navbar: {
			containerBackground: string
			borderBottom: string
			logoColor: string
			createButtonBackground: string
			createButtonBackgroundHover: string
			createButtonText: string
			searchInputBackground: string
			searchInputText: string
			searchInputPlaceholder: string
			searchInputIcon: string
			searchInputBorder: string
			searchInputBackgroundHover: string
			logoHover: string
			boxSearch: {
				backgroundColor: string
				backgroundHover: string
				textColor: string
				borderColor: string
				secondaryTextColor: string
			}
		}
		accountMenu: {
			avatarMenuBackground: string
			menuBackground: string
			menuBorder: string
			menuTitle: string
			avatarName: string
			avatarEmail: string
			itemsHover: string
			itemsText: string
			backgroundColorItemSelected: string
			itemsTextSelected: string
			colorDividerMenu: string
			itemBackgroundHover: string
			itemSelectedBackgroundHover: string
		}
		boardsMenu: {
			textBoards: string
			textBoardsSelected: string
			backgroundBoardsHover: string
			backgroundBoardsSelected: string
		}
		boardSection: {
			menuText: string
			textAvatar: string
			background: string
			seePreviousBoardsText: string
			workspacesText: string
			boardCardTitle: string
			boardCardBackground: string
			boardCardBackgroundHover: string
			createBoardCardBackground: string
			borderInputsCreateBoards: string
			backgroundWorkSpaceHover: string
			backgroundWorkSpaceSelected: string
			createButtonBackground: string
			createButtonBackgroundHover: string
			buttonBackgroundColor: string
			buttonBackgroundColorHover: string
			buttonTextColor: string
			buttonCancelBackgroundColor: string
			buttonCancelBackgroundColorHover: string
			buttonCancelTextColor: string
		}
		modalCreateWorkspace: {
			backgroundImageContainer: string
			title: string
			description: string
			background: string
			buttonBackgroundColor: string
			buttonBackgroundColorHover: string
			buttonTextColor: string
		}
		boardPage: {
			addButtonCard: string
			addButtonColumn: string
			addButtonColumnHover: string
			addButtonColumnText: string
			blackBackgroundList: string
			blackBackgroundCard: string
			textGray: string
			addButtonCardHover: string
			textColumnTitle: string
			textColumnBorder: string
		}
		modal: {
			backgroundColor: string
			backgroundColorActivity: string
			textColor: string
			buttonColor: string
			buttonHoverColor: string
			modalBackground: string
			buttonEditBackground: string
			buttonSubmitBackground: string
			buttonSubmitBackgroundHover: string
			buttonSubmitColor: string
			buttonCancelColor: string
			buttonCancelBackground: string
			buttonCancelBackgroundHover: string
			commentBackgroundHover: string
			colorTextDeleteButton: string
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
			logoColor: colorTokens.black,
			containerBackground: colorLight.blackBackground,
			borderBottom: colorLight.border,
			createButtonBackground: colorLight.blueButton,
			createButtonBackgroundHover: colorLight.blueButtonHover,
			createButtonText: colorDark.white,
			searchInputBackground: colorDark.blackBackgroundLight,
			searchInputBackgroundHover: colorLight.lightSearchHover,
			searchInputText: colorLight.blackTextMenuAccount,
			searchInputPlaceholder: colorDark.grayLight,
			searchInputIcon: colorDark.grayLight,
			searchInputBorder: colorDark.grayLight,
			logoHover: colorLight.lightLogoHover,
			boxSearch: {
				backgroundColor: colorLight.blackBackground,
				backgroundHover: colorLight.lightSearchHover,
				textColor: colorLight.blackTextMenuAccount,
				borderColor: colorLight.grayBorder,
				secondaryTextColor: colorLight.brandPrimary,
			},
		},
		accountMenu: {
			avatarMenuBackground: colorLight.lightLogoHover,
			menuBackground: colorLight.white,
			menuBorder: colorLight.grayBorder,
			menuTitle: colorLight.blackTextMenuAccount,
			avatarName: colorLight.blackTextMenuAccount,
			avatarEmail: colorLight.blackTextMenuAccount,
			itemsHover: colorLight.itemMenuAccountHover,
			itemsText: colorLight.blackTextMenuAccount,
			itemsTextSelected: colorLight.brandPrimary,
			backgroundColorItemSelected: colorLight.blueBackgroundSelected,
			colorDividerMenu: colorDark.grayLight,
			itemBackgroundHover: colorLight.itemMenuAccountHover,
			itemSelectedBackgroundHover: colorLight.blueBackgroundSelected,
		},
		boardsMenu: {
			textBoards: colorLight.blackTextMenuAccount,
			textBoardsSelected: colorLight.blueButton,
			backgroundBoardsHover: colorLight.lightLogoHover,
			backgroundBoardsSelected: colorLight.blueBackgroundSelected,
		},
		boardSection: {
			menuText: colorLight.blackTextMenuAccount,
			textAvatar: colorLight.white,
			background: colorLight.white,
			seePreviousBoardsText: colorLight.blackTextMenuAccount,
			workspacesText: colorLight.blackTextMenuAccount,
			boardCardTitle: colorLight.blackTextMenuAccount,
			boardCardBackground: colorLight.white,
			boardCardBackgroundHover: colorLight.lightLogoHover,
			createBoardCardBackground: colorLight.itemMenuAccountHover,
			borderInputsCreateBoards: colorDark.gray,
			backgroundWorkSpaceHover: colorLight.itemMenuAccountHover,
			backgroundWorkSpaceSelected: colorLight.blueBackgroundSelected,
			createButtonBackground: colorDark.brandPrimary,
			createButtonBackgroundHover: colorDark.brandPrimaryHover,
			buttonBackgroundColor: colorLight.blueButton,
			buttonBackgroundColorHover: colorLight.blueButtonHover,
			buttonTextColor: colorLight.white,
			buttonCancelBackgroundColor: colorLight.itemMenuAccountHover,
			buttonCancelBackgroundColorHover: colorLight.lightLogoHover,
			buttonCancelTextColor: colorLight.blackTextMenuAccount,
		},
		modalCreateWorkspace: {
			backgroundImageContainer: colorDark.iconBackground,
			title: colorLight.blackTextMenuAccount,
			description: colorLight.grayTextMenuAccount,
			background: colorLight.white,
			buttonBackgroundColor: colorLight.blueButton,
			buttonBackgroundColorHover: colorLight.blueButtonHover,
			buttonTextColor: colorLight.white,
		},
		boardPage: {
			addButtonCard: colorDark.grayCreateBoard,
			addButtonColumn: colorDark.grayCreateBoard,
			addButtonColumnHover: colorDark.grayTransparent,
			addButtonColumnText: colorLight.white,
			blackBackgroundList: colorLight.backgroundGrayItems,
			blackBackgroundCard: colorLight.white,
			textGray: colorLight.blackTextMenuAccount,
			addButtonCardHover: colorLight.backgroundGrayAddCardHover,
			textColumnTitle: colorLight.blackTextMenuAccount,
			textColumnBorder: colorLight.brandPrimary,
		},
		modal: {
			backgroundColor: colorLight.white,
			textColor: colorLight.blackTextMenuAccount,
			buttonColor: colorDark.brandPrimary,
			buttonHoverColor: colorDark.brandPrimaryHover,
			backgroundColorActivity: colorLight.backgroundGrayItems,
			modalBackground: colorLight.white,
			buttonEditBackground: colorLight.lightLogoHover,
			buttonSubmitBackground: colorLight.brandPrimary,
			buttonSubmitBackgroundHover: colorLight.blueButtonHover,
			buttonSubmitColor: colorLight.white,

			buttonCancelColor: colorLight.blackTextMenuAccount,
			buttonCancelBackground: colorLight.lightLogoHover,
			buttonCancelBackgroundHover: colorLight.lightLogoHover,
			commentBackgroundHover: colorLight.backgroundGrayItems,
			colorTextDeleteButton: colorLight.white,
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
						borderColor: colorDark.gray,
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: colorDark.gray,
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: colorDark.brandPrimary,
						borderWidth: 2,
					},
				},
				input: {
					color: colorDark.darkBlue,
				},
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					backdropFilter: 'none',
					WebkitBackdropFilter: 'none',
					backgroundImage: 'none',
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
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
			logoColor: colorTokens.white,
			containerBackground: colorDark.blackBackground,
			borderBottom: colorDark.gray,
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
			boxSearch: {
				backgroundColor: colorDark.blackBackground,
				backgroundHover: colorDark.blackBackgroundHover,
				textColor: colorDark.grayLight,
				borderColor: colorDark.grayLight,
				secondaryTextColor: colorDark.brandPrimary,
			},
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
			menuText: colorDark.grayTextItems,
			textAvatar: colorDark.black,
			background: colorDark.blackBackgroundMenu,
			seePreviousBoardsText: colorDark.grayTextItems,
			workspacesText: colorDark.grayTextItems,
			boardCardTitle: colorDark.grayTextItems,
			boardCardBackground: colorDark.blackBackground,
			boardCardBackgroundHover: colorDark.cardBackgroundHoverLight,
			createBoardCardBackground: colorDark.grayCreateBoard,
			borderInputsCreateBoards: colorDark.gray,
			backgroundWorkSpaceHover: colorDark.blackBackgroundLightHover,
			backgroundWorkSpaceSelected: colorDark.blueBackgroundSelected,
			createButtonBackground: colorDark.brandPrimary,
			createButtonBackgroundHover: colorDark.brandPrimaryHover,
			buttonBackgroundColor: colorDark.brandPrimary,
			buttonBackgroundColorHover: colorDark.brandPrimaryHover,
			buttonTextColor: colorDark.black,
			buttonCancelBackgroundColor: colorDark.grayCreateBoard,
			buttonCancelBackgroundColorHover: colorDark.cardBackgroundHoverLight,
			buttonCancelTextColor: colorDark.grayTextItems,
		},
		modalCreateWorkspace: {
			backgroundImageContainer: colorDark.iconBackground,
			title: colorDark.grayTextItems,
			description: colorDark.grayTextItems,
			background: colorDark.blackBackgroundMenu,
			buttonBackgroundColor: colorDark.brandPrimary,
			buttonBackgroundColorHover: colorDark.brandPrimaryHover,
			buttonTextColor: colorDark.black,
		},
		boardPage: {
			addButtonCard: colorDark.grayCreateBoard,
			addButtonColumn: colorDark.grayTransparent,
			addButtonColumnText: colorDark.blueText,
			addButtonColumnHover: colorDark.grayTransparentHover,
			blackBackgroundList: colorDark.blackBackgroundList,
			blackBackgroundCard: colorDark.blackCard,
			textGray: colorDark.grayTextCard,
			addButtonCardHover: colorDark.cardBackgroundHover,
			textColumnTitle: colorDark.white,
			textColumnBorder: colorDark.brandPrimary,
		},
		modal: {
			backgroundColor: colorDark.blackCard,
			textColor: colorDark.grayTextCard,
			buttonColor: colorDark.brandPrimary,
			buttonHoverColor: colorDark.brandPrimaryHover,
			backgroundColorActivity: colorDark.blackCardDark,
			modalBackground: colorDark.modalBackground,
			buttonEditBackground: colorDark.cardBackgroundHoverLight,
			buttonSubmitBackground: colorDark.brandPrimary,
			buttonSubmitBackgroundHover: colorDark.brandPrimaryHover,
			buttonSubmitColor: colorDark.black,

			buttonCancelColor: colorDark.grayTextCard,
			buttonCancelBackground: colorDark.black,
			buttonCancelBackgroundHover: colorDark.cardBackgroundHoverLight,
			commentBackgroundHover: colorDark.cardBackgroundHoverLight,
			colorTextDeleteButton: colorDark.grayTextCard,
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
						borderColor: colorDark.gray,
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: colorDark.gray,
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: colorDark.brandPrimary,
						borderWidth: 2,
					},
				},
				input: {
					color: colorDark.darkBlue,
				},
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					backdropFilter: 'none',
					WebkitBackdropFilter: 'none',
					backgroundImage: 'none',
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
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

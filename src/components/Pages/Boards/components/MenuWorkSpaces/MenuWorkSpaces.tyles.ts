import { SxProps, Theme } from '@mui/material'

export const MenuWorkSpacesListItemCollapsableStyle = (
	menuActive: boolean,
	theme: Theme
): SxProps<Theme> => ({
	padding: '4px 8px 4px 48px',
	height: '32px',
	borderRadius: '8px',
	backgroundColor: menuActive
		? theme.palette.boardsMenu.backgroundBoardsSelected
		: 'transparent',
	'&:hover': {
		backgroundColor: menuActive
			? theme.palette.boardsMenu.backgroundBoardsSelected
			: theme.palette.boardsMenu.backgroundBoardsHover,
	},
})

export const MenuWorkSpacesTextItemCollapsableStyle = (
	menuActive: boolean,
	theme: Theme
): SxProps<Theme> => ({
	'.MuiListItemText-primary': {
		color: menuActive
			? theme.palette.boardsMenu.textBoardsSelected
			: theme.palette.boardsMenu.textBoards,
		fontSize: '14px',
		lineHeight: '20px',
	},
})

export const MenuWorkSpacesContainerItemCollapsableStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	gap: 1,
}

export const MenuWorkSpacesItemTextStyle = (theme: Theme): SxProps<Theme> => ({
	'.MuiListItemText-primary': {
		color: `${theme.palette.accountMenu.avatarName} !important`,
		fontSize: '14px',
		lineHeight: '20px',
	},
})

export const MenuWorkSpacesIconContainerStyle: SxProps<Theme> = {
	width: '24px',
	height: '24px',
	padding: '0',
	margin: '0',
	textAlign: 'center',
	borderRadius: '4px',
	fontWeight: '700',
	background:
		'linear-gradient(0deg,rgba(103, 162, 239, 1) 0%, rgba(108, 194, 225, 1) 100%)',
}

export const MenuWorkSpacesItemContainerStyle: SxProps<Theme> = {
	display: 'flex',
	gap: '8px',
	alignItems: 'center',
	padding: '6px 8px',
}

export const MenuWorkSpacesListItemStyle: SxProps<Theme> = {
	padding: 0,
	margin: 0,
	height: '36px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	borderRadius: '8px',
}

export const MenuWorkSpacesContainerListStyle: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
}

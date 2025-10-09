import { SxProps, Theme } from '@mui/material'

export const MenuBoardsContainerStyle: SxProps<Theme> = {
	minWidth: '288px',
	paddingLeft: '32px',
	paddingTop: '40px',
}

export const MenuBoardsItemTextStyle = (
	active: boolean,
	theme: Theme
): SxProps<Theme> => ({
	fontWeight: 500,
	color: active
		? theme.palette.boardsMenu.textBoardsSelected
		: theme.palette.boardsMenu.textBoards,
	fontSize: '14px',
	lineHeight: '20px',
	paddingLeft: '4px',
})

export const MenuBoardsItemContainerStyle = (
	active: boolean,
	theme: Theme
): SxProps<Theme> => ({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	width: '100%',
	padding: '6px 8px 6px 12px',
	borderRadius: '8px',
	marginBottom: '8px',
	height: '36px',
	cursor: 'pointer',
	backgroundColor: active
		? theme.palette.boardsMenu.backgroundBoardsSelected
		: 'transparent',
	'&:hover': {
		backgroundColor: active
			? theme.palette.boardsMenu.backgroundBoardsSelected
			: theme.palette.boardsMenu.backgroundBoardsHover,
	},
})

export const MenuBoardsItemTextWorkSpaceStyle = (
	theme: Theme
): SxProps<Theme> => ({
	fontWeight: 500,
	margin: '16px 0',
	color: theme.palette.accountMenu.itemsText,
	fontSize: '12px',
	lineHeight: '16px',
	paddingLeft: '4px',
})

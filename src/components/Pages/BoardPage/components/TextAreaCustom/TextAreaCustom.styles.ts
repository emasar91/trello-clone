import { Theme } from '@mui/material'
import type { CSSProperties } from 'react'

export const TextAreaCustomStyles = (theme: Theme): CSSProperties => ({
	width: '100%',
	minHeight: '38px',
	maxHeight: 'calc(1.4em * 3)',
	fontSize: '14px',
	lineHeight: '1.4em',
	borderRadius: '6px',
	padding: '8px 10px',
	overflow: 'hidden',
	wordBreak: 'break-word',
	whiteSpace: 'pre-wrap',
	color: theme.palette.boardPage.textGray,
	backgroundColor: theme.palette.boardPage.blackBackgroundCard,
	outline: 'none',
	resize: 'none',
})

export const TextAreaCustomContainerStylesColumn = (
	theme: Theme
): CSSProperties => ({
	backgroundColor: theme.palette.boardPage.blackBackgroundList,
	height: '105px',
	marginTop: '50px',
	width: '100%',
	borderRadius: '8px',
	padding: '8px 12px',
	color: theme.palette.boardPage.textGray,
})

export const TextAreaCustomContainerStylesCard = (
	theme: Theme
): CSSProperties => ({
	backgroundColor: theme.palette.boardPage.blackBackgroundList,
	height: '115px',
	width: '272px',
	borderBottomRightRadius: '8px',
	borderBottomLeftRadius: '8px',
	padding: '0 8px',
	color: theme.palette.boardPage.textGray,
})

export const TextAreaCustomStylesColumn = (theme: Theme): CSSProperties => ({
	backgroundColor: theme.palette.boardPage.blackBackgroundCard,
	width: '272px',
	borderRadius: '8px',
	padding: '8px 12px',
	fontSize: '14px',
	color: theme.palette.boardPage.textGray,
})

export const ButtonStyles = (theme: Theme) => ({
	backgroundColor: theme.palette.modalCreateWorkspace.buttonBackgroundColor,
	color: theme.palette.boardPage.addButtonColumnText,
	'&:hover': {
		backgroundColor:
			theme.palette.modalCreateWorkspace.buttonBackgroundColorHover,
	},
})

export const ButtonContainerStyles = {
	display: 'flex',
	gap: '8px',
	alignItems: 'center',
	marginTop: '5px',
}

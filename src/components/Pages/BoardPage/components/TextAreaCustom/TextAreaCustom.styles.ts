import { SxProps, Theme } from '@mui/material'
import type { CSSProperties } from 'react'

export const TextAreaCustomStyles: CSSProperties = {
	width: '100%',
	minHeight: '38px',
	maxHeight: 'calc(1.4em * 3)',
	fontSize: '14px',
	lineHeight: '1.4em',
	borderRadius: '6px',
	padding: '8px 10px',
	border: '1px solid #ccc',
	resize: 'none',
	overflow: 'hidden',
	wordBreak: 'break-word',
	whiteSpace: 'pre-wrap',
	outline: 'none',
	marginBottom: '8px',
}

export const TextAreaCustomStylesColumn = (theme: Theme): SxProps<Theme> => ({
	backgroundColor: theme.palette.boardPage.addButtonColumn,
	height: '50px',
	margin: '10px',
	width: '100%',
	minWidth: '250px',
	maxWidth: '250px',
	color: theme.palette.boardPage.addButtonColumnText,
	'&:hover': { backgroundColor: theme.palette.boardPage.addButtonColumnHover },
})

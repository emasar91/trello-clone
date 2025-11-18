import { SxProps, Theme } from '@mui/material'

export const MultipleContainersAddButtonColumnStyles: SxProps<Theme> = (
	theme: Theme
) => ({
	backgroundColor: theme.palette.boardPage.addButtonColumn,
	height: '50px',
	margin: '10px',
	width: '100%',
	minWidth: '250px',
	maxWidth: '250px',
	display: 'flex',
	color: theme.palette.boardPage.addButtonColumnText,
	'&:hover': { backgroundColor: theme.palette.boardPage.addButtonColumnHover },
	justifyContent: 'center',
	alignItems: 'center',
})
export const MultipleContainersAddButtonCardStyles: SxProps<Theme> = (
	theme: Theme
) => ({
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	gap: '8px',
	cursor: 'pointer',
	padding: '6px 8px',
	borderRadius: '8px',
	marginBottom: '8px',
	'&:hover': { backgroundColor: theme.palette.boardPage.addButtonCard },
})

export const MultipleContainersContainerStyles: SxProps<Theme> = {
	display: 'flex',
	boxSizing: 'border-box',
	gridAutoFlow: 'column',
}

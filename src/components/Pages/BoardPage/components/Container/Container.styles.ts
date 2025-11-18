import { SxProps, Theme } from '@mui/material'

export const ContainerHeaderStyles = (theme: Theme): SxProps<Theme> => ({
	display: 'flex',
	padding: '5px 20px',
	paddingRight: '8px',
	alignItems: 'center',
	backgroundColor: theme.palette.boardPage.blackBackgroundList,
	borderTopLeftRadius: 5,
	borderTopRightRadius: 5,
	borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
})

export const ContainerDragHandleStyles = {
	marginLeft: '-12px',
}

export const ContainerLabelStyles = {
	width: '100%',
	textAlign: 'left',
}

export const ContainerActionsStyles = {
	display: 'flex',
}

export const ContainerStyles = {
	display: 'flex',
	flexDirection: 'column',
	gridAutoRows: 'max-content',
	overflow: 'hidden',
	boxSizing: 'border-box',
	appearance: 'none',
	outline: 'none',
	minWidth: '272px',
	margin: '10px',
	borderRadius: '5px',
	minHeight: '200px',
	transition: 'background-color 350ms ease',
	border: '1px solid rgba(0, 0, 0, 0.05)',
	fontSize: '1em',
	'& ul': {
		display: 'grid',
		gap: '10px',
		gridTemplateColumns: 'repeat(var(--columns, 1), 1fr)',
		listStyle: 'none',
		padding: '4px 8px',
		margin: 0,
	},
	'&:focus-visible': {
		borderColor: 'transparent',
		boxShadow: '0 0 0 2px rgba(255, 255, 255, 0), 0 0px 0px 2px #4c9ffe',
	},
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	'&::-webkit-scrollbar-track': {
		display: 'none',
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'none',
	},
}

export const unstyledStyles = {
	overflow: 'visible',
	backgroundColor: 'transparent !important',
	border: 'none !important',
}

export const horizontalStyles = {
	width: '100%',
	'& ul': {
		gridAutoFlow: 'column',
	},
}

export const placeholderStyles = {
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	color: 'rgba(0, 0, 0, 0.5)',
	backgroundColor: 'transparent',
	borderStyle: 'dashed',
	borderColor: 'rgba(0, 0, 0, 0.08)',
	'&:hover': {
		borderColor: 'rgba(0, 0, 0, 0.15)',
	},
}

export const scrollableStyles = {
	'& ul': {
		overflowY: 'auto',
	},
}

export const shadowStyles = {
	boxShadow: '0 1px 10px 0 rgba(34, 33, 81, 0.1)',
}

export const ContainerListStyles = (theme: Theme): SxProps<Theme> => ({
	backgroundColor: theme.palette.boardPage.blackBackgroundList,
	borderBottomLeftRadius: '5px',
	borderBottomRightRadius: '5px',
	padding: '4px',
	'& .MuiList-root': {
		padding: '4px',
	},
})

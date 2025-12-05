import { SxProps, Theme } from '@mui/material'

export const ContainerHeaderStyles = (theme: Theme): SxProps<Theme> => ({
	display: 'flex',
	padding: '5px 20px',
	paddingRight: '8px',
	alignItems: 'center',
	justifyContent: 'space-between',
	backgroundColor: theme.palette.boardPage.blackBackgroundList,
	borderTopLeftRadius: 5,
	borderTopRightRadius: 5,
	borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
	'&:hover .actions > *': {
		opacity: 1,
	},
})

export const ContainerActionsStyles = {
	display: 'flex',
	'& > *:first-child:not(:last-child)': {
		opacity: 1,
	},

	'& > *:first-child:not(:last-child):focus-visible': {
		opacity: 1,
	},
}

interface ContainerProps {
	horizontal?: boolean
	hover?: boolean
	shadow?: boolean
	unstyled?: boolean
	placeholder?: boolean
	theme: Theme
	style?: React.CSSProperties
}

export const ContainerStyles = ({
	horizontal,
	hover,
	shadow,
	unstyled,
	placeholder,
	theme,
	style,
}: ContainerProps) => ({
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
	boxSizing: 'border-box',
	outline: 'none',
	margin: '10px',
	marginBottom: '0',
	maxWidth: '272px',
	width: '100%',
	flexShrink: 0,
	borderTopLeftRadius: '12px',
	borderTopRightRadius: '12px',
	borderBottomLeftRadius: '0',
	borderBottomRightRadius: '0',
	transition: 'background-color 350ms ease',
	backgroundColor: 'transparent',
	fontSize: '1em',

	// ---- ul ----
	'& ol': {
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		gap: '10px',
		padding: '0 8px 8px 8px',
		listStyle: 'none',
		overflowY: 'auto',
		width: '100%',
		overflowX: 'hidden',
		backgroundColor: theme.palette.boardPage.blackBackgroundList,
		scrollbarWidth: 'thin', // Adjust width for vertical scrollbars
		scrollbarColor: `${theme.palette.scrollbar.color1} ${theme.palette.scrollbar.color2}`,
	},

	// ---- placeholder ----
	...(placeholder && {
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
	}),

	// ---- hover ----
	...(hover && {
		border: `3px solid ${theme.palette.primary.main}`,
	}),

	// ---- unstyled ----
	...(unstyled && {
		overflow: 'visible',
		backgroundColor: 'transparent !important',
		border: 'none !important',
	}),

	// ---- horizontal ----
	...(horizontal && {
		width: '100%',
	}),

	// ---- shadow ----
	...(shadow && {
		boxShadow: '0 1px 10px 0 rgba(34, 33, 81, 0.1)',
	}),

	// ---- focus-visible ----
	'&:focus-visible': {
		borderColor: 'transparent',
		boxShadow: `0 0 0 2px transparent, 0 0 0 2px ${theme.palette.primary.main}`,
	},
	...style,
})

export const ContainerContentAddCardStyles = (
	theme: Theme
): SxProps<Theme> => ({
	display: 'flex',
	alignItems: 'center',
	borderRadius: '8px',
	fontSize: 14,
	padding: '8px 12px',
	margin: '0 8px 8px 8px',
	gap: 1,
	width: '100%',
	'&:hover': {
		backgroundColor: theme.palette.boardPage.addButtonCardHover,
	},
})

export const ContainerAddCardStyles = (theme: Theme): SxProps<Theme> => ({
	cursor: 'pointer',
	userSelect: 'none',
	display: 'flex',
	alignItems: 'center',
	gap: 1,
	width: '272px',
	backgroundColor: theme.palette.boardPage.blackBackgroundList,
	borderBottomRightRadius: '12px',
	borderBottomLeftRadius: '12px',
})

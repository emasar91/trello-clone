import { Theme } from '@mui/material'

export const SearchBoxContainerStyle = (theme: Theme) => ({
	backgroundColor: theme.palette.navbar.boxSearch.backgroundColor,
	border: `1px solid ${theme.palette.navbar.boxSearch.borderColor}`,
	borderRadius: '4px',
	boxShadow: '0px 4px 16px rgba(0,0,0,0.12)',
	overflow: 'hidden',
})

export const SearchBoxHeaderStyle = (theme: Theme) => ({
	padding: '0.2rem 0.5rem',
	fontWeight: 700,
	letterSpacing: 0.5,
	color: theme.palette.navbar.boxSearch.textColor,
})

export const SearchBoxEmptyStateStyle = (theme: Theme) => ({
	p: '0 0.5rem 0.5rem 0.5rem',
	fontWeight: 500,
	fontSize: '1rem',
	color: theme.palette.navbar.boxSearch.textColor,
})

export const SearchBoxItemStyle = (theme: Theme) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0.2rem 0.5rem',
	gap: '0.5rem',
	'&:hover': {
		backgroundColor: theme.palette.navbar.boxSearch.backgroundHover,
	},
})

export const SearchBoxItemIconStyle = (theme: Theme) => ({
	color: theme.palette.navbar.boxSearch.textColor,
})

export const SearchBoxItemPrimaryTextStyle = (theme: Theme) => ({
	fontWeight: 500,
	color: theme.palette.navbar.boxSearch.textColor,
})

export const SearchBoxItemSecondaryTextStyle = (theme: Theme) => ({
	color: theme.palette.navbar.boxSearch.secondaryTextColor,
})

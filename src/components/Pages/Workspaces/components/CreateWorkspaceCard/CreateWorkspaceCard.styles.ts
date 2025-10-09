import { SxProps, Theme } from '@mui/material'

export const CreateWorkspaceCardImageContainerStyle = (
	theme: Theme,
	isSelected: boolean
): SxProps<Theme> => ({
	position: 'relative',
	width: '64px',
	height: '40px',
	borderRadius: '0.25rem',
	overflow: 'hidden',
	cursor: 'pointer',
	border: isSelected
		? `2px solid ${theme.palette.primary.main}`
		: '2px solid transparent',
	'&:hover img': {
		filter: 'brightness(1.2)',
	},
})

export const CreateWorkspaceCardContainerStyle = (
	theme: Theme
): SxProps<Theme> => ({
	borderRadius: 2,
	backgroundColor: theme.palette.boardSection.createBoardCardBackground,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	height: '108px',
	cursor: 'pointer',
	'&:hover': { filter: 'brightness(1.2)' },
})

export const CreateWorkspaceCardRemainingTextStyle = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.boardSection.boardCardTitle,
	fontSize: '11px',
	fontWeight: '500',
	lineHeight: '20px',
})

export const CreateWorkspaceCardCreateTextStyle = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.boardSection.boardCardTitle,
	fontSize: '14px',
	fontWeight: '500',
	lineHeight: '20px',
})

import { SxProps, Theme } from '@mui/material'

export const CreateBoardCardCheckIconStyle: SxProps<Theme> = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	color: 'white',
	width: '24px',
	height: '24px',
	pointerEvents: 'none',
}

export const CreateBoardCardImageStyle: SxProps<Theme> = {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	display: 'block',
}

export const CreateBoardCardImageContainerStyle = (
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

export const CreateBoardCardContainerStyle = (
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
	'&:hover': {
		backgroundColor: theme.palette.boardSection.boardCardBackgroundHover,
	},
})

export const CreateBoardCardRemainingTextStyle = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.boardSection.boardCardTitle,
	fontSize: '11px',
	fontWeight: '500',
	lineHeight: '20px',
})

export const CreateBoardCardCreateTextStyle = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.boardSection.boardCardTitle,
	fontSize: '14px',
	fontWeight: '500',
	lineHeight: '20px',
})

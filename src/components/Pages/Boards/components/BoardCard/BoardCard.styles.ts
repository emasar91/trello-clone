import { SxProps, Theme } from '@mui/material'

export const BoardCardTitleStyle = (theme: Theme): SxProps<Theme> => ({
	padding: 0,
	margin: '8px',
	color: theme.palette.boardSection.boardCardTitle,
})

export const BoardCardImageStyle: SxProps<Theme> = {
	width: '100%',
	height: '72px',
	backgroundPosition: 'center center',
	backgroundSize: 'cover',
	objectFit: 'cover',
}

export const BoardCardStyle = (theme: Theme): SxProps<Theme> => ({
	width: '100%',
	height: '108px',
	borderRadius: 2,
	overflow: 'hidden',
	bgcolor: theme.palette.boardSection.boardCardBackground,
	cursor: 'pointer',
	'&:hover img': {
		filter: 'brightness(0.7)',
	},
})

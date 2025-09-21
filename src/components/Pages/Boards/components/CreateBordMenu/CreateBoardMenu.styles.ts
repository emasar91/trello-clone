import { SxProps, Theme } from '@mui/material'

export const CreateBoardMenuBackgroundSelectionStyles: SxProps<Theme> = {
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-between',
	gap: '4px',
	marginBottom: '16px',
}

export const CreateBoardMenuBackgroundSelectionTitleStyles = (
	theme: Theme
): SxProps<Theme> => ({
	textAlign: 'start',
	fontSize: '14px',
	lineHeight: '40px',
	color: theme.palette.boardSection.boardCardTitle,
})

export const CreateBoardMenuItemSkeletonStyle: SxProps<Theme> = {
	position: 'absolute',
	top: '58px',
	left: '60px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '3px',
	background: 'none',
	backgroundPosition: 'center center',
	backgroundSize: 'cover',
	objectFit: 'cover',
	margin: '0 auto',
}

export const CreateBoardMenuItemImageStyle: SxProps<Theme> = {
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '3px',
	background: 'none',
	backgroundPosition: 'center center',
	backgroundSize: 'cover',
	objectFit: 'cover',
	margin: '0 auto',
}

export const CreateBoardMenuCreateTitleStyles = (
	theme: Theme
): SxProps<Theme> => ({
	textAlign: 'center',
	fontSize: '14px',
	lineHeight: '40px',
	color: theme.palette.boardSection.boardCardTitle,
})

export const CreateBoardMenuContentStyle: SxProps<Theme> = {
	padding: '0 12px 12px 12px',
}

export const CreateBoardMenuContainerStyle = (
	theme: Theme
): SxProps<Theme> => ({
	ml: '8px',
	'& .MuiPaper-root': {
		backgroundColor: theme.palette.boardSection.background,
		width: '304px',
	},
})

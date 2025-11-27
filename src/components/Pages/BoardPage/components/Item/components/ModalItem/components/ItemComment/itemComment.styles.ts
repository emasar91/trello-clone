import { SxProps, Theme } from '@mui/material'

export const ItemCommentContainerStyles: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	marginTop: '12px',
}

export const ItemCommentBoxStyles: SxProps<Theme> = {
	display: 'flex',
	gap: '8px',
	alignItems: 'center',
}

export const ItemCommentAuthorStyles: SxProps<Theme> = {
	color: (theme) => theme.palette.modal.textColor,
	fontSize: '14px',
	lineHeight: '20px',
}

export const ItemCommentDateStyles: SxProps<Theme> = {
	color: '#669df1',
	fontSize: '12px',
	lineHeight: '20px',
}

export const ItemCommentCommentTextStyles = (theme: Theme): SxProps<Theme> => ({
	color: theme.palette.modal.textColor,
	fontSize: '14px',
	lineHeight: '20px',
	bgcolor: theme.palette.modal.modalBackground,
	borderRadius: '8px',
	width: '100%',
	padding: '6px 12px',
	wordBreak: 'break-word',
	margin: '4px 0',
})

export const ItemCommentButtonsContainerStyles: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'start',
	gap: '8px',
}

export const ItemCommentButtonStyles = (theme: Theme): SxProps<Theme> => ({
	color: theme.palette.modal.textColor,
	fontSize: '12px',
	lineHeight: '20px',
	padding: 0,
	margin: 0,
	minWidth: 'auto',
	':hover': {
		bgcolor: 'transparent',
	},
})

import { SxProps, Theme } from '@mui/material'

export const ModalItemContainerStyles = (theme: Theme): SxProps<Theme> => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	maxWidth: '1080px',
	bgcolor: theme.palette.modal.backgroundColor,
	outline: 'none',
	boxShadow: 24,
	borderRadius: '8px',
})

export const ModalItemCreateCommentButtonStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.modal.textColor,
	fontWeight: 'bold',
	bgcolor: theme.palette.modal.modalBackground,
	padding: '6px 12px',
	textAlign: 'start',
	borderRadius: '8px',
	boxShadow: 0,
	justifyContent: 'flex-start', // ⭐ CLAVE
	':hover': {
		bgcolor: theme.palette.modal.modalBackground,
		filter: 'brightness(1.2)',
		boxShadow: 0,
	},
})

export const ModalItemActivityContentContainerStyles: SxProps<Theme> = {
	width: '100%',
}

export const ModalItemUnsavedChangesStyles = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.modal.textColor,
	fontWeight: 'bold',
	fontSize: '11px',
	lineHeight: '16px',
	border: '1px solid #fca700',
	borderRadius: '4px',
	padding: '0 2px',
})

export const ModalItemActivityTypographyStyles = (
	theme: Theme
): SxProps<Theme> => ({
	fontWeight: 'bold',
	lineHeight: '20px',
	fontSize: '14px',
	color: theme.palette.modal.textColor,
})

export const ModalItemActivityTitleContainerStyles = (
	theme: Theme
): SxProps<Theme> => ({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	width: '100%',
	color: theme.palette.modal.textColor,
})

export const ModalItemActivityContainerStyles = (
	theme: Theme
): SxProps<Theme> => ({
	display: 'flex',
	alignItems: 'start',
	justifyContent: 'start',
	bgcolor: theme.palette.modal.backgroundColorActivity,
	width: '100%',
	padding: '24px',
	paddingTop: '40px',
	flexDirection: 'column',
	gap: '14px',
	maxHeight: '50vh',
	overflowY: 'auto',
	scrollbarWidth: 'thin',
	scrollbarColor: `${theme.palette.scrollbar.color1} ${theme.palette.scrollbar.color2}`,
})

export const ModalItemDescriptionContentContainerStyles = (
	theme: Theme
): SxProps<Theme> => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'start',
	width: '100%',
	gap: '8px',
	color: theme.palette.modal.textColor,
	flexDirection: 'column',
})

export const ModalItemEditDescriptionButtonStyles = (
	theme: Theme
): SxProps<Theme> => ({
	bgcolor: theme.palette.modal.modalBackground,
	color: theme.palette.modal.textColor,
	'&:hover': {
		filter: 'brightness(1.2)',
	},
})

export const ModalItemDescriptionTypographyStyles: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
}

export const ModalItemDescriptionTitleStyles = (
	theme: Theme
): SxProps<Theme> => ({
	fontWeight: 'bold',
	lineHeight: '20px',
	fontSize: '14px',
	color: theme.palette.modal.textColor,
})

export const ModalItemDescriptionTitleContainerStyles: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	width: '100%',
	justifyContent: 'space-between',
}

export const ModalItemDescriptionContainerStyles = (
	theme: Theme
): SxProps<Theme> => ({
	display: 'flex',
	alignItems: 'center',
	bgcolor: theme.palette.modal.backgroundColor,
	flexDirection: 'column',
	justifyContent: 'start',
	gap: '16px',
	width: '100%',
	padding: '24px',
	marginTop: '16px',
})

export const ModalItemTagContentContainerStyles = (
	theme: Theme
): SxProps<Theme> => ({
	display: 'flex',
	alignItems: 'start',
	justifyContent: 'start',
	width: '100%',
	gap: '8px',
	color: theme.palette.modal.textColor,
	flexDirection: 'column',
})

export const ModalItemTagTitleStyles = (theme: Theme): SxProps<Theme> => ({
	fontWeight: 'bold',
	lineHeight: '20px',
	fontSize: '14px',
	color: theme.palette.modal.textColor,
})

export const ModalItemTagsContainerStyles: SxProps<Theme> = {
	display: 'flex',
	gap: '8px',
}

export const ModalItemTagItemStyles = (
	theme: Theme,
	tag: string
): SxProps<Theme> => ({
	backgroundColor: tag,
	borderRadius: '4px',
	height: '32px',
	width: '48px',
	color: theme.palette.modal.textColor,
})

export const ModalItemTagButtonStyles = (theme: Theme): SxProps<Theme> => ({
	bgcolor: '#303134',
	width: '32px',
	height: '32px',
	minWidth: '32px',
	padding: '0',
	margin: '0',
	overflow: 'hidden',
	boxSizing: 'border-box',
	color: theme.palette.modal.textColor,
	'&:hover': {
		filter: 'brightness(1.2)',
	},
})

export const ModalItemDescriptionTextStyles = (
	theme: Theme
): SxProps<Theme> => ({
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

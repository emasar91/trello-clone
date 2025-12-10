import { SxProps, Theme } from '@mui/material'

export const ModalCreateWorkspaceImageMockStyle: SxProps<Theme> = {
	width: '70%',
	maxWidth: 400,
	position: 'absolute',
	top: '10%',
	'@media (max-width: 900px)': {
		top: '3%',
	},
}

export const ModalCreateWorkspaceContainerImageMockStyle = (
	theme: Theme
): SxProps<Theme> => ({
	flex: 1,
	bgcolor: theme.palette.modalCreateWorkspace.backgroundImageContainer,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
})

export const ModalCreateWorkspaceTitleStyle = (
	theme: Theme
): SxProps<Theme> => ({
	marginBottom: 2,
	color: theme.palette.modalCreateWorkspace.title,
})

export const ModalCreateWorkspaceSubTitleStyle = (
	theme: Theme
): SxProps<Theme> => ({
	marginBottom: 2,
	color: theme.palette.modalCreateWorkspace.description,
})

export const ModalCreateWorkspaceLabelStyle = (
	theme: Theme
): SxProps<Theme> => ({
	marginBottom: '0.5rem',
	color: theme.palette.modalCreateWorkspace.description,
})

export const ModalCreateWorkspaceInputStyle = (
	theme: Theme
): SxProps<Theme> => ({
	marginBottom: 3,
	'& .MuiInputBase-input': {
		color: theme.palette.modalCreateWorkspace.title,
	},
	'& .MuiInputBase-input::placeholder': {
		color: '#93969b',
		opacity: 1,
	},
})

export const ModalCreateWorkspaceFormContainerStyle: SxProps<Theme> = {
	flex: 1,
	color: 'white',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	px: 6,
	py: 4,
	position: 'relative',
}

export const ModalCreateWorkspaceContainerStyle = (
	theme: Theme
): SxProps<Theme> => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	display: 'flex',
	width: '80%',
	maxWidth: 1200,
	height: '100vh',
	maxHeight: 475,
	overflow: 'hidden',
	backgroundColor: theme.palette.modalCreateWorkspace.background,
	borderRadius: '10px',
	boxShadow: 24,
	'@media (max-width: 900px)': {
		display: 'flex',
		flexDirection: 'column-reverse',
		alignItems: 'center',
		justifyContent: 'center',
		maxHeight: '800px',
		maxWidth: '720px',
	},
})

export const ModalCreateWorkspaceButtonStyle = (
	theme: Theme
): SxProps<Theme> => ({
	backgroundColor: theme.palette.modalCreateWorkspace.buttonBackgroundColor,
	'&:hover': {
		backgroundColor:
			theme.palette.modalCreateWorkspace.buttonBackgroundColorHover,
	},
})

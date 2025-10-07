import { SxProps, Theme } from '@mui/material'

export const ModalCreateWorkspaceImageMockStyle: SxProps<Theme> = {
	width: '70%',
	maxWidth: 400,
	position: 'absolute',
	top: '10%',
}

export const ModalCreateWorkspaceContainerImageMockStyle = (
	theme: Theme
): SxProps<Theme> => ({
	flex: 1,
	bgcolor: theme.palette.modalCreateWorkspace.backgroundImageContainer,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
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

export const ModalCreateWorkspaceInputStyle = (
	theme: Theme
): SxProps<Theme> => ({
	marginBottom: 3,
	'& .MuiInputBase-input': {
		color: theme.palette.modalCreateWorkspace.title,
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
	width: '100%',
	maxWidth: 1200,
	height: '100vh',
	maxHeight: 475,
	overflow: 'hidden',
	backgroundColor: theme.palette.modalCreateWorkspace.background,
	borderRadius: '10px',
	boxShadow: 24,
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

import { SxProps, Theme } from '@mui/material'

export const WorkSpacesTitleStyle = (theme: Theme): SxProps<Theme> => ({
	fontSize: '16px',
	fontWeight: '500',
	lineHeight: '20px',
	color: theme.palette.boardSection.workspacesText,
})

export const WorkSpacesAvatarStyle = (
	bgColor: string,
	theme: Theme
): SxProps<Theme> => ({
	width: 32,
	height: 32,
	background: bgColor,
	borderRadius: 1,
	fontWeight: 'bold',
	color: theme.palette.boardSection.textAvatar,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
})

export const WorkSpacesAvatarContainerStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	marginBottom: '16px',
	gap: 1,
}

export const WorkSpacesContainerStyle: SxProps<Theme> = { marginBottom: '32px' }

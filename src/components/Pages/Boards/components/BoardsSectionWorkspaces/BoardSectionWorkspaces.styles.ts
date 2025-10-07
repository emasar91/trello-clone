import { colorDark } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const WorkSpacesTitleStyle = (theme: Theme): SxProps<Theme> => ({
	fontSize: '20px',
	fontWeight: '500',
	lineHeight: '24px',
	color: theme.palette.boardSection.workspacesText,
})

export const WorkSpacesTitleBoardsStyle = (theme: Theme): SxProps<Theme> => ({
	fontSize: '16px',
	fontWeight: '400',
	lineHeight: '20px',
	color: theme.palette.boardSection.workspacesText,
})

export const WorkSpacesAvatarStyle = (
	bgColor: string | undefined
): SxProps<Theme> => ({
	width: 60,
	height: 60,
	background: bgColor,
	borderRadius: 1,
	fontWeight: 'bold',
	color: colorDark.black,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '32px',
})

export const WorkSpacesAvatarContainerStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	gap: 1,
	padding: '32px',
}

export const WorkSpacesContainerStyle: SxProps<Theme> = {
	flex: '1 1 calc(100vw - 320px)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'start',
	padding: '0 48px 52px 48px',
}

export const WorkSpacesStyle: SxProps<Theme> = {
	maxWidth: '914px',
	width: '100%',
	overflowY: 'auto',
	margin: '40px 210px 0 210px',
	display: 'flex',
	flexDirection: 'column',
}

export const WorkSpacesBoardsAvatarContainerStyle: SxProps<Theme> = {
	marginTop: '20px',
	marginBottom: '16px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	gap: '8px',
}

export const DividerStyle: SxProps<Theme> = { margin: '16px 0' }

export const WorkSpacesBoardsContainerStyle: SxProps<Theme> = {
	paddingLeft: '16px',
}

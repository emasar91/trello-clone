import { SxProps, Theme } from '@mui/material'

export const BoardSectionUserStyle: SxProps<Theme> = {
	maxWidth: '914px',
	width: '100%',
	overflowY: 'auto',
	margin: '40px 210px 0 210px',
	display: 'flex',
	flexDirection: 'column',
	gap: '32px',
}

export const BoardSectionUserTitleContainerStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	marginBottom: '16px',
}

export const BoardSectionUserTitleStyle = (theme: Theme): SxProps<Theme> => ({
	color: theme.palette.boardSection.seePreviousBoardsText,
	fontSize: '16px',
	lineHeight: '20px',
	fontWeight: 650,
})

export const BoardSectionUserTitleContainerWorkspaceStyle = (
	theme: Theme
): SxProps<Theme> => ({
	fontSize: '16px',
	lineHeight: '24px',
	fontWeight: 'bold',
	color: theme.palette.boardSection.workspacesText,
	margin: '12px 0 20px 0',
})

import { Box, Typography, useTheme } from '@mui/material'
import BoardGrid from '../BoardsList/BoardsList'
import {
	WorkSpacesAvatarContainerStyle,
	WorkSpacesAvatarStyle,
	WorkSpacesContainerStyle,
	WorkSpacesTitleStyle,
} from './WorkSpaces.styles'
import { IWorkspace } from '@/types/workspaces'

/**
 * Component that renders a workspace section with the workspace avatar and title.
 * It also renders a BoardGrid component with the boards of the workspace.
 *
 * @param {{ workspace: IWorkspace }} - The workspace to render.
 */
const WorkspaceSection = ({ workspace }: { workspace: IWorkspace }) => {
	const theme = useTheme()
	return (
		<Box sx={WorkSpacesContainerStyle}>
			{/* Header workspace */}
			<Box sx={WorkSpacesAvatarContainerStyle}>
				<Box sx={WorkSpacesAvatarStyle(workspace.avatarColor, theme)}>
					{workspace.name.charAt(0).toUpperCase()}
				</Box>
				<Typography variant="h6" sx={WorkSpacesTitleStyle(theme)}>
					{workspace.name}
				</Typography>
			</Box>

			<BoardGrid boards={workspace.boards} workspaceName={workspace.name} />
		</Box>
	)
}

export default WorkspaceSection

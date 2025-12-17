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
 * WorkspaceSection es un componente que renderiza una sección de workspace con el avatar y el título del workspace.
 * También renderiza un BoardGrid con los tableros del workspace.
 * @param {{ workspace: IWorkspace }} - El workspace a renderizar.
 */
const WorkspaceSection = ({ workspace }: { workspace: IWorkspace }) => {
	const theme = useTheme()
	return (
		<Box sx={WorkSpacesContainerStyle}>
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

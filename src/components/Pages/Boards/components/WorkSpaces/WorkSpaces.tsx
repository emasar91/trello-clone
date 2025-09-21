import { Box, Typography, useTheme } from '@mui/material'
import BoardGrid from '../BoardsList/BoardsList'
import { getRandomAvatarColor } from '@/components/Pages/Boards/Utils'
import {
	WorkSpacesAvatarContainerStyle,
	WorkSpacesAvatarStyle,
	WorkSpacesContainerStyle,
	WorkSpacesTitleStyle,
} from './WorkSpaces.styles'

type IWorkspace = {
	id: string
	name: string
	color: string
	boards: {
		id: string
		title: string
		image?: string
	}[]
}

const WorkspaceSection = ({ workspace }: { workspace: IWorkspace }) => {
	const theme = useTheme()
	const color = getRandomAvatarColor()
	return (
		<Box sx={WorkSpacesContainerStyle}>
			{/* Header workspace */}
			<Box sx={WorkSpacesAvatarContainerStyle}>
				<Box sx={WorkSpacesAvatarStyle(color)}>
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

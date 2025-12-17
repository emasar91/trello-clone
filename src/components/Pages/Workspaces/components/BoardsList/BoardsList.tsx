import Grid from '@mui/material/Grid'
import BoardCard from '../BoardCard/BoardCard'
import CreateBoardCard from '../CreateBoardCard/CreateBoardCard'
import { BoardListGridStyle } from './BoardsList.styles'
import { IBoard } from '@/types/workspaces'

/**
 * Component to render a grid of boards.
 * It will render a BoardCard component for each board in the given array.
 * If the createBoard prop is true, it will also render a CreateBoardCard component.
 * The CreateBoardCard component will only be rendered if there are less than 4 boards in the given array.
 *
 * @param {IBoard[]} boards - The array of boards to render.
 * @param {string} workspaceName - The name of the workspace.
 * @param {boolean} [createBoard=true] - Whether to render the CreateBoardCard component.
 */
const BoardGrid = ({
	boards,
	workspaceName,
	createBoard = true,
}: {
	boards: IBoard[]
	workspaceName: string
	createBoard?: boolean
}) => {
	const availableCreate = createBoard && (!boards || boards.length < 4)

	return (
		<Grid sx={BoardListGridStyle}>
			{boards.map((b) => (
				<Grid key={b.name}>
					<BoardCard board={b} workspaceName={workspaceName} />
				</Grid>
			))}
			{availableCreate && (
				<CreateBoardCard
					remainingBoards={4 - boards.length}
					workspaceName={workspaceName}
				/>
			)}
		</Grid>
	)
}

export default BoardGrid

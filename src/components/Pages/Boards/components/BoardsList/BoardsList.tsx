import Grid from '@mui/material/Grid'
import BoardCard from '../BoardCard/BoardCard'
import CreateBoardCard from '../CreateBoardCard/CreateBoardCard'
import { BoardListGridStyle } from './BoardsList.styles'
import { IBoard } from '@/types/workspaces'

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
	console.log('🚀 ~ BoardGrid ~ availableCreate:', availableCreate)

	console.log('🚀 ~ BoardGrid ~ boards:', boards)
	return (
		<Grid sx={BoardListGridStyle}>
			{boards.map((b) => (
				<Grid key={b.name}>
					<BoardCard board={b} workspaceName={workspaceName} />
				</Grid>
			))}
			{/* Botón Crear tablero */}
			{availableCreate && (
				<CreateBoardCard remainingBoards={4 - boards.length} />
			)}
		</Grid>
	)
}

export default BoardGrid

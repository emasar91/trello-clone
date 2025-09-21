import Grid from '@mui/material/Grid'
import BoardCard from '../BoardCard/BoardCard'
import CreateBoardCard from '../CreateBoardCard/CreateBoardCard'
import { BoardListGridStyle } from './BoardsList.styles'
type Board = {
	id: string
	title: string
	image?: string
}
const BoardGrid = ({
	boards,
	workspaceName,
	createBoard = true,
}: {
	boards: Board[]
	workspaceName: string
	createBoard?: boolean
}) => {
	const availableCreate = createBoard && boards.length < 4

	return (
		<Grid sx={BoardListGridStyle}>
			{boards.map((b) => (
				<Grid key={b.id}>
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

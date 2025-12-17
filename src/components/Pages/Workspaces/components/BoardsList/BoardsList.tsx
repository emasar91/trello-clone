import Grid from '@mui/material/Grid'
import BoardCard from '../BoardCard/BoardCard'
import CreateBoardCard from '../CreateBoardCard/CreateBoardCard'
import { BoardListGridStyle } from './BoardsList.styles'
import { IBoard } from '@/types/workspaces'

/**
 * BoardGrid es un componente que renderiza una grilla de tableros.
 * Renderiza un BoardCard para cada tablero en el array dado.
 * Si el prop createBoard es true, tambien renderiza un CreateBoardCard.
 * El CreateBoardCard solo se renderizara si hay menos de 4 tableros en el array dado.
 * @param {IBoard[]} boards - El array de tableros a renderizar.
 * @param {string} workspaceName - El nombre del workspace.
 * @param {boolean} [createBoard=true] - Si se renderizara el CreateBoardCard.
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

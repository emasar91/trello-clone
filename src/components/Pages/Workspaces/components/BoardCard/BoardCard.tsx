import { Card, Box, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import {
	BoardCardImageStyle,
	BoardCardStyle,
	BoardCardTitleStyle,
} from './BoardCard.styles'
import { IBoard } from '@/types/workspaces'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import { useTranslations } from 'next-intl'

/**
 * BoardCard es un componente que renderiza un card de un tablero.
 * @param {IBoard} board - Información del tablero.
 * @param {string} workspaceName - Nombre del workspace actual.
 * @returns {JSX.Element} - Elemento JSX del componente BoardCard.
 */
const BoardCard = ({
	board,
	workspaceName,
}: {
	board: IBoard
	workspaceName: string
}) => {
	const router = useRouter()
	const theme = useTheme()
	const { workspaces } = useWorkSpaceStore()
	const t = useTranslations('BoardsPage')

	/**
	 * handleRedirect es una funcion que redirige al usuario a la pagina del tablero.
	 * @param {IBoard} board - Información del tablero.
	 */
	const handleRedirect = (board: IBoard) => {
		let resolvedWorkspace = workspaceName

		if (workspaceName === t('recently')) {
			const wsFound = workspaces.find((ws) =>
				ws.boards.some((b) => b.boardId === board.boardId)
			)

			if (!wsFound) {
				return
			}

			resolvedWorkspace = wsFound.name
		}

		router.push(
			`/b/${resolvedWorkspace.toLowerCase()}/${board.name
				.toLowerCase()
				.replace(/\s+/g, '-')}`
		)
	}

	return (
		<Card onClick={() => handleRedirect(board)} sx={BoardCardStyle(theme)}>
			<Box>
				<Box
					component={'img'}
					loading="lazy"
					sx={BoardCardImageStyle}
					src={board.image}
				/>

				<Typography variant="body2" sx={BoardCardTitleStyle(theme)} noWrap>
					{board.name}
				</Typography>
			</Box>
		</Card>
	)
}
export default BoardCard

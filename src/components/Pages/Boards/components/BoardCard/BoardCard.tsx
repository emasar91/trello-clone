import { Card, Box, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import {
	BoardCardImageStyle,
	BoardCardStyle,
	BoardCardTitleStyle,
} from './BoardCard.styles'

type IBoard = {
	id: string
	title: string
	image?: string
}

const BoardCard = ({
	board,
	workspaceName,
}: {
	board: IBoard
	workspaceName: string
}) => {
	const router = useRouter()
	const theme = useTheme()

	const handleRedirect = () => {
		//workspaceName es recientes se tiene que buscar el primer espacio de trabajo que tenga ese tablero
		router.push(
			`/b/${workspaceName.toLowerCase()}/${board.title
				.toLowerCase()
				.replace(/\s+/g, '-')}`
		)
	}

	return (
		<Card onClick={() => handleRedirect()} sx={BoardCardStyle(theme)}>
			<Box>
				<Box
					component={'img'}
					loading="lazy"
					sx={BoardCardImageStyle}
					src={`/assets/fondos/${board.image}`}
				/>
				<Typography variant="body2" sx={BoardCardTitleStyle(theme)} noWrap>
					{board.title}
				</Typography>
			</Box>
		</Card>
	)
}
export default BoardCard

import { Card, Grid, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import {
	CreateBoardCardContainerStyle,
	CreateBoardCardCreateTextStyle,
	CreateBoardCardRemainingTextStyle,
} from './CreateBoardCard.styles'
import { useTranslations } from 'next-intl'
import CreateBoardMenu from '../CreateBordMenu/CreateBoardMenu'

/**
 * Componente para criar um novo tablero.
 *
 * @param {number} remainingBoards - Número de espaços restantes para criar um tablero.
 * @param {string} workspaceName - Nome do workspace atual.
 *
 * @returns {JSX.Element} - Elemento JSX do componente CreateBoardCard.
 */
const CreateBoardCard = ({
	remainingBoards,
	workspaceName,
}: {
	remainingBoards: number
	workspaceName: string
}) => {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	/**
	 * Handles a click event on the card, setting the anchor element to the current target.
	 * This is used to open the CreateBoardMenu when the card is clicked.
	 */
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	/**
	 * Closes the CreateBoardMenu by setting the anchor element to null.
	 */
	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)

	return (
		<>
			<Grid onClick={handleClick}>
				<Card sx={CreateBoardCardContainerStyle(theme)}>
					<Typography sx={CreateBoardCardCreateTextStyle(theme)}>
						{t('createNewBoard')}
					</Typography>
					<Typography sx={CreateBoardCardRemainingTextStyle(theme)}>
						{remainingBoards} {t('remainingBoards')}
					</Typography>
				</Card>
			</Grid>

			<CreateBoardMenu
				open={open}
				handleClose={handleClose}
				anchorEl={anchorEl}
				workspaceName={workspaceName}
			/>
		</>
	)
}

export default CreateBoardCard

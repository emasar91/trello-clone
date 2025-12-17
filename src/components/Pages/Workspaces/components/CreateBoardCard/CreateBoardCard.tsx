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
 * CreateBoardCard es un componente que renderiza un card para crear un nuevo tablero.
 * @param {number} remainingBoards - Número de espaços restantes para criar um tablero.
 * @param {string} workspaceName - Nome do workspace atual.
 * @returns {JSX.Element} - Elemento JSX del componente CreateBoardCard.
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
	 * handleClick es una funcion que maneja el evento de click en el card, estableciendo el anchor element al elemento actual.
	 * Se usa para abrir el CreateBoardMenu cuando el card es clickeado.
	 */
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	/**
	 * handleClose es una funcion que cierra el CreateBoardMenu estableciendo el anchor element a null.
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

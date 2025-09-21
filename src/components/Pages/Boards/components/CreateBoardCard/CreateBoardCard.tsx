import { Card, Grid, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import {
	CreateBoardCardContainerStyle,
	CreateBoardCardCreateTextStyle,
	CreateBoardCardRemainingTextStyle,
} from './CreateBoardCard.styles'
import { useTranslations } from 'next-intl'
import CreateBoardMenu from '../CreateBordMenu/CreateBoardMenu'

const CreateBoardCard = ({ remainingBoards }: { remainingBoards: number }) => {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

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
			/>
		</>
	)
}

export default CreateBoardCard

import { Card, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

import { useTranslations } from 'next-intl'
import {
	CreateWorkspaceCardContainerStyle,
	CreateWorkspaceCardCreateTextStyle,
	CreateWorkspaceCardRemainingTextStyle,
} from './CreateWorkspaceCard.styles'

const CreateWorkspaceCard = ({
	remainingBoards,
}: {
	remainingBoards: number
}) => {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	return (
		<>
			<Grid onClick={() => {}}>
				<Card sx={CreateWorkspaceCardContainerStyle(theme)}>
					<Typography sx={CreateWorkspaceCardCreateTextStyle(theme)}>
						{t('createWorkspace')}
					</Typography>
					<Typography sx={CreateWorkspaceCardRemainingTextStyle(theme)}>
						{remainingBoards} {t('remainingBoards')}
					</Typography>
				</Card>
			</Grid>
		</>
	)
}

export default CreateWorkspaceCard

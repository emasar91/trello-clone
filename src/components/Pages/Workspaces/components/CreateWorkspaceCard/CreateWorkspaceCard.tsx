import { Card, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

import { useTranslations } from 'next-intl'
import {
	CreateWorkspaceCardContainerStyle,
	CreateWorkspaceCardCreateTextStyle,
	CreateWorkspaceCardRemainingTextStyle,
} from './CreateWorkspaceCard.styles'

/**
 * Componente para criar um novo workspace.
 *
 * @param {number} remainingBoards - Número de espaços restantes para criar um workspace.
 *
 * @returns {JSX.Element} - Elemento JSX do componente CreateWorkspaceCard.
 */
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

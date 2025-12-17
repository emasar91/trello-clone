'use client'

import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import {
	NotFoundButtonHomeStyle,
	NotFoundButtonsContainerStyle,
	NotFoundButtonStyle,
	NotFoundCardContainerStyle,
	NotFoundContainerStyle,
	NotFoundContentStyle,
	NotFoundDescriptionContainerStyle,
	NotFoundDescriptionStyle,
	NotFoundIconContainerStyle,
	NotFoundTitleAndSubtitleContainerStyle,
	NotFoundTitleStyle,
} from './not-found.styles'
import { useTranslations } from 'next-intl'

/**
 * Componente que se encarga de mostrar una página cuando el usuario no se encuentra.
 * Muestra una imagen de error, un título, una descripción y dos botones, uno para iniciar sesión y otro para volver a la página de inicio.
 * @returns {React.ReactElement | null} El componente NotFound cuando el usuario no se encuentra, de lo contrario null.
 */
export default function NotFound() {
	const t = useTranslations('NotFound')

	return (
		<main style={NotFoundContainerStyle}>
			<Card sx={NotFoundCardContainerStyle}>
				<CardContent sx={NotFoundContentStyle}>
					<Box sx={NotFoundTitleAndSubtitleContainerStyle}>
						<Box sx={NotFoundIconContainerStyle}>
							<Box component={'img'} src="/assets/error.png" />
						</Box>
						<Typography variant="h1" sx={NotFoundTitleStyle}>
							{t('title')}
						</Typography>
					</Box>

					<Box sx={NotFoundDescriptionContainerStyle}>
						<Typography variant="body1" sx={NotFoundDescriptionStyle}>
							{t('description')}
						</Typography>
					</Box>

					<Box sx={NotFoundButtonsContainerStyle}>
						<Button
							variant="contained"
							component="a"
							href="/login"
							sx={NotFoundButtonStyle}
						>
							{t('buttonLogin')}
						</Button>
						<Button
							sx={NotFoundButtonHomeStyle}
							component="a"
							href="/"
							variant="outlined"
						>
							{t('buttonHome')}
						</Button>
					</Box>
				</CardContent>
			</Card>
		</main>
	)
}

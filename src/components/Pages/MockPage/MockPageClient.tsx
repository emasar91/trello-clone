'use client'

import { NoDisponibleIcon } from '@/public/assets/icons/NoDisponibleIcon'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import {
	MockPageButtonHomeStyle,
	MockPageButtonsContainerStyle,
	MockPageButtonStyle,
	MockPageCardContainerStyle,
	MockPageContainerStyle,
	MockPageContentStyle,
	MockPageDescriptionContainerStyle,
	MockPageDescriptionStyle,
	MockPageIconContainerStyle,
	MockPageSubtitleStyle,
	MockPageTitleAndSubtitleContainerStyle,
	MockPageTitleStyle,
} from './MockPage.styles'
import { useTranslations } from 'next-intl'

type MockPageProps = {
	route: string
}

/**
 * MockPageClient es el componente de la pagina de mock.
 * Renderiza una pagina con un titulo, subtitulo, descripcion y dos botones.
 * @param {string} route - El parametro de la ruta para reemplazar [route] en las claves de traduccion.
 * @returns {ReactNode} El componente de la pagina de mock.
 */
export default function MockPageClient({ route }: MockPageProps) {
	const t = useTranslations('MockPage')

	return (
		<main style={MockPageContainerStyle}>
			<Card sx={MockPageCardContainerStyle}>
				<CardContent sx={MockPageContentStyle}>
					<Box sx={MockPageTitleAndSubtitleContainerStyle}>
						<Box sx={MockPageIconContainerStyle}>
							<NoDisponibleIcon />
						</Box>

						<Typography variant="h1" sx={MockPageTitleStyle}>
							{t('title')}
						</Typography>

						<Typography variant="body1" sx={MockPageSubtitleStyle}>
							{t('subTitle').replace('[route]', route.toUpperCase() || '')}
						</Typography>
					</Box>

					<Box sx={MockPageDescriptionContainerStyle}>
						<Typography variant="body1" sx={MockPageDescriptionStyle}>
							{t('description')}
						</Typography>
					</Box>

					<Box sx={MockPageButtonsContainerStyle}>
						<Button
							variant="contained"
							component="a"
							href="/login"
							sx={MockPageButtonStyle}
						>
							{t('buttonLogin')}
						</Button>

						<Button
							component="a"
							href="/"
							variant="outlined"
							sx={MockPageButtonHomeStyle}
						>
							{t('buttonHome')}
						</Button>
					</Box>
				</CardContent>
			</Card>
		</main>
	)
}

import { Box, Link } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'
import Typography from '@mui/material/Typography'
import {
	FeatureCardButtonStyle,
	FeatureCardContentContainerStyle,
	FeatureCardContentStyle,
	FeatureCardContianerStyle,
	FeatureCardDescriptionStyle,
	FeatureCardTitleStyle,
} from './FeatureCard.styles'

type Props = { title: string; translate: string; index: number }

/**
 * FeatureCard es un componente que renderiza una tarjeta de descripción de característica con título, descripción y botón.
 * @param {string} title - Título de la tarjeta de descripción de característica.
 * @param {string} translate - Clave de traducción que se usa para traducir el texto.
 * @param {number} index - Índice de la tarjeta de descripción de característica.
 * @returns {React.ReactElement} - Componente de tarjeta de descripción de característica.
 */
function FeatureCard({ title, translate, index }: Props) {
	const t = useTranslations(translate)

	return (
		<Box sx={FeatureCardContianerStyle(index)}>
			<Box sx={FeatureCardContentContainerStyle}>
				<Box sx={FeatureCardContentStyle}>
					<Box
						component={'img'}
						src={t(`${title}.image`)}
						width={'96px'}
						height={'97px'}
					/>
					<Box>
						<Typography sx={FeatureCardTitleStyle}>
							{t(`${title}.title`)}{' '}
						</Typography>
						<Typography sx={FeatureCardDescriptionStyle}>
							{t(`${title}.description`)}{' '}
						</Typography>
					</Box>
					<Box>
						<Box
							component={Link}
							href={'/' + t(`${title}.buttonLink`)}
							sx={FeatureCardButtonStyle}
						>
							{t(`${title}.button`)}
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default FeatureCard

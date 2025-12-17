import { Box, Card } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import {
	FeatureDescriptionCardContainerStyle,
	FeatureDescriptionCardContentStyle,
	FeatureDescriptionCardDescriptionStyle,
	FeatureDescriptionCardImageStyle,
	FeatureDescriptionCardTitleAndDescriptionContainerStyle,
	FeatureDescriptionCardTitleContainerStyle,
	FeatureDescriptionCardTitleStyle,
} from './FeatureDescriptionCard.styles'
import { useTranslations } from 'next-intl'

type Props = {
	sideImage: 'left' | 'right'
	title: string
	icon: React.ReactNode
	translate: string
}

/**
 * FeatureDescriptionCard es un componente que renderiza una tarjeta de descripción de característica con título, descripción y icono.
 * También soporta diferentes imágenes laterales para diferentes características.
 * @param sideImage - El lado de la imagen.
 * @param title - El título de la característica.
 * @param icon - El icono de la característica.
 * @param translate - La clave de traducción de la característica.
 * @returns Un componente de tarjeta de descripción de característica con los parámetros dados.
 */
const FeatureDescriptionCard = ({
	sideImage,
	title,
	icon,
	translate,
}: Props) => {
	const t = useTranslations(translate)

	return (
		<Box sx={FeatureDescriptionCardContainerStyle}>
			<Card sx={FeatureDescriptionCardContentStyle(sideImage)}>
				<Box
					component={'img'}
					src={t(`${title}.image`)}
					sx={FeatureDescriptionCardImageStyle}
				/>
				<Box sx={FeatureDescriptionCardTitleAndDescriptionContainerStyle}>
					<Box sx={FeatureDescriptionCardTitleContainerStyle}>
						{icon}
						<Typography sx={FeatureDescriptionCardTitleStyle}>
							{title}
						</Typography>
					</Box>
					<Box>
						<Typography sx={FeatureDescriptionCardDescriptionStyle}>
							{t(`${title}.description`)}
						</Typography>
					</Box>
				</Box>
			</Card>
		</Box>
	)
}

export default FeatureDescriptionCard

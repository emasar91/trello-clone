import { Box } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import { useTranslations } from 'next-intl'
import {
	Section3ConainterTitleAndSubStyle,
	Section3ContainerStyle,
	Section3SubTitleStyle,
	Section3TitleStyle,
} from './Section3.styles'
import FeatureDescriptionCard from '@/components/FeatureDescriptionCard/FeatureDescriptionCard'
import { featureSection3 } from '@/constants'

/**
 * Section 3 es el componente de la seccion 3 de la pagina de inicio.
 * Renderiza un texto con el titulo, subtitulo y descripcion de la seccion 3.
 * Renderiza una lista de FeatureDescriptionCard con los items de la seccion 3.
 * @returns {JSX.Element} Section 3 componente
 */
const Section3 = () => {
	const t = useTranslations('PageHome.section3')

	return (
		<Box sx={Section3ContainerStyle}>
			<Box sx={Section3ConainterTitleAndSubStyle}>
				<Typography sx={Section3TitleStyle}>{t('title')}</Typography>

				<Typography sx={Section3SubTitleStyle}>{t('subTitle')}</Typography>
			</Box>
			{featureSection3.map((feature, index) => (
				<FeatureDescriptionCard
					key={index}
					sideImage={feature.sideImage as 'left' | 'right'}
					icon={feature.icon}
					title={feature.title}
					translate={'PageHome.section3.items'}
				/>
			))}
		</Box>
	)
}

export default Section3

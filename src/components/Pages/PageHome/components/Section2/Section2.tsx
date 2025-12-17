import { Box, Typography } from '@mui/material'
import {
	Section2DescriptionStyle,
	Section2SubtitleStyle,
	Section2TextContainerStyle,
	Section2TextContentStyle,
	Section2TitleStyle,
} from './Section2.styles'
import { useTranslations } from 'next-intl'
import { CustomSlider } from '@/components/CustomSlider/CustomSlider'
import { itemsSliderSection2 } from '@/constants'

/**
 * Section 2 es el componente de la seccion 2 de la pagina de inicio.
 * Renderiza un texto con el titulo, subtitulo y descripcion de la seccion 2.
 * Renderiza un CustomSlider con los items de la seccion 2.
 * @returns {JSX.Element} Section 2 componente
 *
 * El CustomSlider se muestra con los items de la izquierda y los items se traducen usando next-intl.
 */
const Section2 = () => {
	const t = useTranslations('PageHome.section2')

	return (
		<>
			<Box sx={Section2TextContainerStyle}>
				<Box sx={Section2TextContentStyle}>
					<Box>
						<Typography component="p" sx={Section2SubtitleStyle}>
							{t('subTitle')}
						</Typography>

						<Typography component={'h2'} sx={Section2TitleStyle}>
							{t('title')}
						</Typography>
					</Box>

					<Box>
						<Typography sx={Section2DescriptionStyle}>
							{t('description')}
						</Typography>
					</Box>
				</Box>
			</Box>
			<CustomSlider
				showLeftItems={true}
				items={itemsSliderSection2}
				translate={'PageHome.section2.slider.items'}
			/>
		</>
	)
}

export default Section2

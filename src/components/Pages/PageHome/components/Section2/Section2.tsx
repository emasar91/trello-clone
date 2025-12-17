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
 * Section 2 component
 *
 * This component renders a section with a title, subtitle, description and a custom slider with items.
 *
 * The title, subtitle and description are translated using next-intl.
 *
 * The custom slider is shown with the left items and the items are translated using next-intl.
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

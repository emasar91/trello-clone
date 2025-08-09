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

const Section2 = () => {
	const t = useTranslations('PageHome.section2')

	return (
		<Box>
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
		</Box>
	)
}

export default Section2

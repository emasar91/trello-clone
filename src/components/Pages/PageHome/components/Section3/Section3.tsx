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
import { EmilMagicIcon } from '@/public/assets/icons/EmailMagicIcon'
import { CalendarIcon } from '@/public/assets/icons/CalendarIcon'

const Section3 = () => {
	const t = useTranslations('PageHome.section3')

	return (
		<Box sx={Section3ContainerStyle}>
			<Box sx={Section3ConainterTitleAndSubStyle}>
				<Typography sx={Section3TitleStyle}>{t('title')}</Typography>
				<Typography sx={Section3SubTitleStyle}>{t('subTitle')}</Typography>
			</Box>

			<FeatureDescriptionCard
				sideImage={'left'}
				imageSrc="/assets/email-todos.webp"
				icon={<EmilMagicIcon />}
				title={t('cardFeature1.title')}
				description={t('cardFeature1.description')}
			/>
			<FeatureDescriptionCard
				sideImage={'right'}
				imageSrc="/assets/slackteams-to-inbox.webp"
				icon={<CalendarIcon />}
				title={t('cardFeature2.title')}
				description={t('cardFeature2.description')}
			/>
		</Box>
	)
}

export default Section3

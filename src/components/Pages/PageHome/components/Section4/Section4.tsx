import { Box } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import FeatureCard from '@/components/FeatureCard/FeatureCard'
import { featureItemsSection4 } from '@/constants'
import { useTranslations } from 'next-intl'
import {
	FeatureCardItemsContainerStyle,
	Section4DescriptionStyle,
	Section4SubTitleStyle,
	Section4TextContainerStyle,
	Section4TitleStyle,
} from './Section4.styles'

/**
 * Section 4 component
 *
 * @returns {JSX.Element} Section 4 component
 */
const Section4 = () => {
	const t = useTranslations('PageHome.section4')
	return (
		<>
			<Box sx={Section4TextContainerStyle}>
				<Typography sx={Section4SubTitleStyle}>{t('subTitle')}</Typography>
				<Typography sx={Section4TitleStyle}>{t('title')}</Typography>
				<Typography sx={Section4DescriptionStyle}>
					{t('description')}
				</Typography>
			</Box>
			<Box sx={FeatureCardItemsContainerStyle}>
				{featureItemsSection4.map((item, index) => (
					<FeatureCard
						key={`index-${index}`}
						title={item.title}
						translate={'PageHome.section4.items'}
						index={index}
					/>
				))}
			</Box>
		</>
	)
}

export default Section4

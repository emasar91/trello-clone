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
 * A component that renders a feature description card with title, description and icon.
 * It also supports different side images for different features.
 * @param sideImage - The side of the image.
 * @param title - The title of the feature.
 * @param icon - The icon of the feature.
 * @param translate - The translate key of the feature.
 * @returns A feature description card component with the given parameters.
 * @example
 * <FeatureDescriptionCard sideImage="left" title="analytics" icon={<AnalyticsIcon />} translate="translation" />
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

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

type Props = { title: string; translate: string }

/**
 * The FeatureCard component renders a feature card with image, title, description and button.
 *
 * @param {{ title: string, translate: string }} props
 * @returns {JSX.Element}
 * @example
 * <FeatureCard title="analytics" translate="translation" />
 */
function FeatureCard({ title, translate }: Props) {
	const t = useTranslations(translate)

	return (
		<Box sx={FeatureCardContianerStyle}>
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
							href={t(`${title}.buttonLink`)}
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

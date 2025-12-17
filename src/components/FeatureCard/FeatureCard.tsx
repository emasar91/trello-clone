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
 * Component that renders a feature description card with title, description and button.
 * @param {string} title - Title of the feature description card.
 * @param {string} translate - Translate key that is used to translate the text.
 * @param {number} index - Index of the feature description card.
 * @returns {React.ReactElement} - Feature description card component.
 * @example
 * <FeatureCard title="analytics" translate="translation" index={1} />
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

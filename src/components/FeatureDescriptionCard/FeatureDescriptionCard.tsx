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
 * The FeatureDescriptionCard component renders a feature description card with
 * image, title, icon and description. The component accepts four props: sideImage
 * (left or right), title (string), icon (React Node), and translate (string that
 * is used to translate the text using next-intl). The component uses useTranslations
 * hook from next-intl to translate the text. The component renders a Card with
 * image, title, icon and description. The title and description are rendered inside
 * a Box with a custom style. The icon is rendered inside a Box with a custom style.
 * The component uses the Box component from @mui/material to render the Card and
 * the Box components.
 *
 * @param {{ sideImage: 'left' | 'right', title: string, icon: React.ReactNode, translate: string }} props
 * @returns {React.ReactElement}
 * @example
 * <FeatureDescriptionCard sideImage="left" title="analytics" icon={<Analytics />} translate="translation" />
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

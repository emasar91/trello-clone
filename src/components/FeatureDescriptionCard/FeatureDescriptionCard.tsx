import { Box } from '@mui/material'
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

type Props = {
	imageSrc: string
	sideImage: 'left' | 'right'
	title: string
	description: string
	icon: React.ReactNode
}

const FeatureDescriptionCard = ({
	imageSrc,
	sideImage,
	title,
	description,
	icon,
}: Props) => {
	return (
		<Box sx={FeatureDescriptionCardContainerStyle}>
			<Box sx={FeatureDescriptionCardContentStyle(sideImage)}>
				<Box
					component={'img'}
					src={imageSrc}
					sx={FeatureDescriptionCardImageStyle}
				></Box>
				<Box sx={FeatureDescriptionCardTitleAndDescriptionContainerStyle}>
					<Box sx={FeatureDescriptionCardTitleContainerStyle}>
						{icon}
						<Typography sx={FeatureDescriptionCardTitleStyle}>
							{title}
						</Typography>
					</Box>
					<Box>
						<Typography sx={FeatureDescriptionCardDescriptionStyle}>
							{description}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default FeatureDescriptionCard

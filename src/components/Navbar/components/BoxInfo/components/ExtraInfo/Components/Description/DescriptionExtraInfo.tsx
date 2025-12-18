import Typography from '@mui/material/Typography'
import React from 'react'
import { ExtraInfoDescriptionStyle } from './DescriptionExtraInfo.styles'

type Props = { text: string }

/**
 * A Typography component that displays a paragraph of text
 * with the default styling of an ExtraInfo component.
 *
 * @param {{ text: string }} props
 * @prop {string} text - The text to display in the description
 * @returns {React.ReactElement} A Typography component with the
 *         desired styling.
 */
const DescriptionExtraInfo = ({ text }: Props) => {
	return (
		<Typography component="p" sx={ExtraInfoDescriptionStyle}>
			{text}
		</Typography>
	)
}

export default DescriptionExtraInfo

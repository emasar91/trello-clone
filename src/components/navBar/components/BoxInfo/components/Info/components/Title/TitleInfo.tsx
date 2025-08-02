import Typography from '@mui/material/Typography'
import React from 'react'
import { InfoTitleStyle } from './TitleInfo.style'

type Props = { text: string }

/**
 * TitleInfo component renders a heading text with a specific style.
 *
 * @param {object} props - Component props.
 * @param {string} props.text - The text to display as the title.
 *
 * @returns {JSX.Element} The Typography component with the styled title.
 */

function TitleInfo({ text }: Props) {
	return (
		<Typography variant="h3" sx={InfoTitleStyle}>
			{text}
		</Typography>
	)
}

export default TitleInfo

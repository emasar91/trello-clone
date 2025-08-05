import Typography from '@mui/material/Typography'
import React from 'react'
import { ExtraInfoTitleStyle } from './TitleExtraInfo.styles'

type Props = { text: string }

/**
 * TitleExtraInfo component that renders a title text using Typography component
 * with the specified styles.
 *
 * @param {object} props - The properties object.
 * @param {string} props.text - The text to be displayed as the title.
 * @returns {JSX.Element} A Typography component displaying the title text.
 */

const TitleExtraInfo = ({ text }: Props) => {
	return (
		<Typography variant="h3" sx={ExtraInfoTitleStyle}>
			{text}
		</Typography>
	)
}

export default TitleExtraInfo

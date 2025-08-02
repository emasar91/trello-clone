import { Box, Link } from '@mui/material'
import React from 'react'
import { ExtraInfoButtonStyle } from './buttonExtraInfo.style'

type Props = { text: string; linkButton: string }

/**
 * Renders a button with a link to a specific page.
 *
 * @param {string} text The text displayed in the button.
 * @param {string} linkButton The link to the button.
 * @returns A Box component with a Link component inside styled with ExtraInfoButtonStyle.
 */
function ButtonExtraInfo({ text, linkButton }: Props) {
	return (
		<Box component={Link} href={linkButton} sx={ExtraInfoButtonStyle}>
			{text}
		</Box>
	)
}

export default ButtonExtraInfo

import React from 'react'
import { Box } from '@mui/material'
import { UnderlineStyle } from './Underline.styles'

type Props = {
	underlineStyle: {
		left: number
		width: number
		origin: string
		active: boolean
	}
}

/**
 * Underline component renders a Box with an underline style.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.underlineStyle - The style properties for the underline.
 * @param {number} props.underlineStyle.left - The left position of the underline.
 * @param {number} props.underlineStyle.width - The width of the underline.
 * @param {string} props.underlineStyle.origin - The origin of the underline, either 'left' or 'right'.
 * @param {boolean} props.underlineStyle.active - Determines if the underline is active.
 *
 * @returns {JSX.Element} A Box component styled as an underline.
 */

const Underline = ({ underlineStyle }: Props) => {
	return <Box sx={UnderlineStyle(underlineStyle)} />
}

export default Underline

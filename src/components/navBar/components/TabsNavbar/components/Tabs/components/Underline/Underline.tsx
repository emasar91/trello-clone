import React from 'react'
import { Box } from '@mui/material'
import { UnderlineStyle } from './Underline.style'

type Props = {
	underlineStyle: {
		left: number
		width: number
		origin: 'left' | 'right'
		active: boolean
	}
}

const Underline = ({ underlineStyle }: Props) => {
	return <Box sx={UnderlineStyle(underlineStyle)} />
}

export default Underline

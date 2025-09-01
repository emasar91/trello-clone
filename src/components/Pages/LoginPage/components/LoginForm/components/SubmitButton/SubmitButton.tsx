import { Box, Button } from '@mui/material'
import React from 'react'
import {
	SubmitButtonContainerStyle,
	SubmitButtonStyle,
} from './SubmitButton.styles'

interface SubmitButtonProps {
	onClick: () => void
	disabled: boolean
	text: string
}

/**
 * SubmitButton is a component that wraps a Button with a Box and applies some
 * styles to it. It takes three props: onClick, disabled, and text.
 *
 * onClick is a function that gets called when the button is clicked.
 *
 * disabled is a boolean that determines whether the button is disabled or not.
 *
 * text is a string that is the text to display inside the button.
 *
 * @param {{ onClick: () => void, disabled: boolean, text: string }} props
 * @returns {React.ReactElement}
 */
const SubmitButton: React.FC<SubmitButtonProps> = ({
	onClick,
	disabled,
	text,
}) => (
	<Box sx={SubmitButtonContainerStyle(disabled)}>
		<Button onClick={onClick} disabled={disabled} sx={SubmitButtonStyle}>
			{text}
		</Button>
	</Box>
)

export default SubmitButton

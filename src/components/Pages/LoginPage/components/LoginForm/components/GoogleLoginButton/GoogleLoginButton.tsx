import { Box, Button } from '@mui/material'
import React from 'react'

interface GoogleLoginButtonProps {
	onClick: () => void
	text: string
}

/**
 * A button that can be clicked to login with a Google account.
 *
 * @param {GoogleLoginButtonProps} props
 * @param {() => void} props.onClick - The function to call when the button is clicked.
 * @param {string} props.text - The text to display on the button.
 * @returns {React.ReactElement} A button component with a Google logo and the given text.
 */
const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
	onClick,
	text,
}) => (
	<Box>
		<Button
			onClick={onClick}
			startIcon={
				<Box component={'img'} src={'/assets/googleIcon.png'} width={40} />
			}
		>
			{text}
		</Button>
	</Box>
)

export default GoogleLoginButton

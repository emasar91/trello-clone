import { Box, Button } from '@mui/material'
import React from 'react'

interface GoogleLoginButtonProps {
	onClick: () => void
	text: string
}

/**
 * GoogleLoginButton es un boton que se puede hacer click para iniciar sesion con una cuenta de Google.
 * @param {GoogleLoginButtonProps} props
 * @param {() => void} props.onClick - La funcion a ejecutar cuando se hace click en el boton.
 * @param {string} props.text - El texto a mostrar en el boton.
 * @returns {React.ReactElement} un Box con el Button
 */
const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
	onClick,
	text,
}) => (
	<Box>
		<Button
			sx={{
				width: '100%',
				marginTop: '1rem',
			}}
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

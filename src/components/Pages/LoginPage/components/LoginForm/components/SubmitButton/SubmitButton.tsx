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
 * SubmitButton es un componente que envuelve un Button con un Box y aplica
 * algunos estilos a él. Recibe tres props: onClick, disabled, y text.
 * onClick es una funcion que se llama cuando se hace click en el boton.
 * disabled es un booleano que determina si el boton esta deshabilitado o no.
 * text es un string que es el texto a mostrar dentro del boton.
 * @param {SubmitButtonProps} props
 * @returns {React.ReactElement} un Box con el Button
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

import * as React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'
import { ShowPasswordIconStyle, ShowPasswordStyle } from './ShowPassword.styles'

interface IShowPasswordProps {
	showPassword: boolean
	handleShowPassword: () => void
}

/**
 * ShowPassword es un componente que muestra un boton para alternar la visibilidad de la contrasena.
 * @param {IShowPasswordProps} props
 * @param {boolean} props.showPassword - Indica si la contrasena es visible o no.
 * @param {() => void} props.handleShowPassword - La funcion a ejecutar cuando se hace click en el boton.
 * @returns El boton.
 */
const ShowPassword: React.FunctionComponent<IShowPasswordProps> = ({
	showPassword,
	handleShowPassword,
}) => {
	return (
		<Box sx={ShowPasswordStyle} onClick={handleShowPassword}>
			{showPassword ? (
				<Image
					src={'/assets/see.png'}
					width={20}
					height={20}
					alt="eye"
					style={ShowPasswordIconStyle}
				/>
			) : (
				<Image
					src={'/assets/unsee.png'}
					width={20}
					height={20}
					alt="eye"
					style={ShowPasswordIconStyle}
				/>
			)}
		</Box>
	)
}

export default ShowPassword

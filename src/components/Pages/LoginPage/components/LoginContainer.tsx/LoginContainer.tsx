import * as React from 'react'
import { Box } from '@mui/material'
import {
	LoginContainerHeaderStyle,
	LoginContainerStyle,
} from './LoginContainer.styles'

interface ILoginPageContainerProps {
	children: React.ReactNode
	register: boolean
	recover: boolean
}

/**
 * LoginContainer es un componente que renderiza un container para la pagina de login.
 * Recibe tres propiedades booleanas, `register`, `recover`, y `children`.
 * Si `register` es true, renderiza un header con un boton de regresar y establece
 * la altura del container a 560px. Si `recover` es true, renderiza un header
 * con un boton de regresar y establece la altura del container a 450px. De lo contrario,
 * establece la altura del container a 700px.
 *
 * @param {ILoginPageContainerProps} props
 * @returns {React.ReactElement} un Box con el children
 */
const LoginPageContainer: React.FunctionComponent<ILoginPageContainerProps> = ({
	children,
	register,
	recover,
}) => {
	const height = register ? '560px' : recover ? '450px' : '700px'
	return (
		<Box sx={LoginContainerStyle(height)}>
			{(register || recover) && (
				<Box sx={LoginContainerHeaderStyle}>
					<Box
						component="img"
						loading="lazy"
						width={20}
						alt="back"
						src="/assets/back.png"
						onClick={() => window.history.back()}
					/>
				</Box>
			)}
			{children}
		</Box>
	)
}

export default LoginPageContainer

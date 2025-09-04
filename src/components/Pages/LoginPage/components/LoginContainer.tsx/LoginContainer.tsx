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
 * LoginPageContainer component that renders a container for the login page.
 * It takes three boolean props, `register`, `recover`, and `children`.
 * If `register` is true, it renders a header with a back button and sets
 * the container height to 560px. If `recover` is true, it renders a header
 * with a back button and sets the container height to 450px. Otherwise, it
 * sets the container height to 700px.
 *
 * @param {{ children: React.ReactNode, register: boolean, recover: boolean }}
 * @returns {React.ReactElement}
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

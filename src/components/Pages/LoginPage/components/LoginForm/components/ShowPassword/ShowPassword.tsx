import * as React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'
import { ShowPasswordIconStyle, ShowPasswordStyle } from './ShowPassword.styles'

interface IShowPasswordProps {
	showPassword: boolean
	handleShowPassword: () => void
}

/**
 * A component that displays a button to toggle the show password visibility.
 *
 * @param {IShowPasswordProps} props
 * @param {boolean} props.showPassword - Whether the password is visible or not.
 * @param {() => void} props.handleShowPassword - The function to call when the button is clicked.
 * @returns The button component.
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

import { Logo } from '@/public/assets/Logo'
import { Box, Typography } from '@mui/material'
import * as React from 'react'
import {
	LoginTitleContainerStyle,
	LoginTitleSubtitleStyle,
} from './LoginTitle.styles'
import { useTranslations } from 'next-intl'

interface ILoginTitleProps {
	register?: boolean
}

/**
 * A component to display the login title and subtitle.
 *
 * @param {ILoginTitleProps} props
 * @param {boolean} [props.register=false] - Whether to use the 'Register' subtitle or not.
 * @returns The component.
 */
const LoginTitle: React.FunctionComponent<ILoginTitleProps> = ({
	register,
}) => {
	const t = useTranslations('LoginTitle')

	const subtitleText: string = !register ? t('login') : t('register')

	return (
		<Box sx={LoginTitleContainerStyle}>
			<Logo />
			<Typography sx={LoginTitleSubtitleStyle} variant="body1">
				{subtitleText}
			</Typography>
		</Box>
	)
}

export default LoginTitle

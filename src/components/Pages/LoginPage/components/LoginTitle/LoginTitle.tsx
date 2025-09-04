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
	recover?: boolean
}

/**
 * Renders the title of the login page, with a Logo and a subtitle
 * depending of the page is for login, register or recover password
 *
 * @param {{ register?: boolean; recover?: boolean }} props
 * @param {boolean} [props.register=false] if true, the subtitle is
 * the text for register
 * @param {boolean} [props.recover=false] if true, the subtitle is
 * the text for recover password
 * @returns {React.ReactElement} A Box component with the Logo and the
 * subtitle
 */
const LoginTitle: React.FunctionComponent<ILoginTitleProps> = ({
	register,
	recover,
}) => {
	const t = useTranslations('LoginPage')

	const subtitleText: string = recover
		? t('recover')
		: !register
		? t('login')
		: t('register')

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

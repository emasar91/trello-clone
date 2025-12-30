import { Logo } from '@/public/assets/Logo'
import { Box, Typography } from '@mui/material'
import * as React from 'react'
import {
	LoginTitleContainerStyle,
	LoginTitleSubtitleStyle,
	LoginTitleTipStyle,
} from './LoginTitle.styles'
import { useTranslations } from 'next-intl'

interface ILoginTitleProps {
	register?: boolean
	recover?: boolean
}

/**
 * LoginTitle es el componente del titulo de la pagina de login.
 * Renderiza un Logo y un subtitulo dependiendo de la pagina
 * es para login, registro o restablecimiento de contrasena
 * @param {{ register?: boolean; recover?: boolean }} props
 * @param {boolean} [props.register=false] si es true, el subtitulo es
 * el texto para registro
 * @param {boolean} [props.recover=false] si es true, el subtitulo es
 * el texto para restablecimiento de contrasena
 * @returns {React.ReactElement} un Box con el Logo y el subtitulo
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

	const showTip: boolean = t('login') === subtitleText

	return (
		<Box sx={LoginTitleContainerStyle}>
			<Logo />
			<Typography sx={LoginTitleSubtitleStyle} variant="body1">
				{subtitleText}
			</Typography>
			{showTip && (
				<Typography sx={LoginTitleTipStyle} variant="body1">
					{t('tip')}
				</Typography>
			)}
		</Box>
	)
}

export default LoginTitle

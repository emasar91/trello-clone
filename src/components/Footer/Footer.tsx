'use client'
import React from 'react'
import PageContainer from '../pageContainer/PageContainer'
import { Box, Link } from '@mui/material'
import { LogoFooter } from '@/public/assets/LogoFooter'
import Typography from '@mui/material/Typography'
import { colorsLanding, footerItems } from '@/constants'
import { useTranslations } from 'next-intl'
import {
	FooterContainerStyle,
	FooterContentStyle,
	FooterItemRowStyle,
	FooterItemsContainerStyle,
	FooterLogInContainerStyle,
	FooterLogInLinkStyle,
	FooterLogInStyle,
	FooterSubTitleStyle,
	FooterTitleStyle,
} from './Footer.styles'
import { useAuth } from '@/context/useAuthContext'

/**
 * Footer es un componente que renderiza un pie de página con un enlace de inicio de sesión y una lista de elementos con
 * títulos y subtítulos.
 * Cuando el usuario está autenticado, el componente renderiza null.
 * @returns {React.ReactElement | null} El componente Footer cuando el usuario no  esta logged in, si no es null.
 */

const Footer = () => {
	const t = useTranslations('Footer')

	const { user, loading } = useAuth()

	if (loading) return null

	if (user) {
		return null
	}

	return (
		<PageContainer backgroundColor={colorsLanding.footerBackground}>
			<Box sx={FooterContainerStyle}>
				<Box sx={FooterContentStyle}>
					<Box sx={FooterLogInContainerStyle}>
						<LogoFooter />
						<Box component={Link} href="/login" sx={FooterLogInLinkStyle}>
							<Typography sx={FooterLogInStyle}>{t('loging')}</Typography>
						</Box>
					</Box>

					<Box sx={FooterItemRowStyle}>
						{footerItems.map((item, index) => {
							return (
								<Box
									key={`index-${index}-${item}`}
									component={Link}
									href={'/' + t(`items.${item}.link`)}
									sx={FooterItemsContainerStyle}
								>
									<Typography sx={FooterTitleStyle}>
										{t(`items.${item}.title`)}
									</Typography>
									<Typography sx={FooterSubTitleStyle}>
										{t(`items.${item}.subTitle`)}
									</Typography>
								</Box>
							)
						})}
					</Box>
				</Box>
			</Box>
		</PageContainer>
	)
}

export default Footer

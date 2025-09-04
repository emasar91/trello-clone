'use client'
import React from 'react'
import PageContainer from '../pageContainer/PageContainer'
import { Box, Link } from '@mui/material'
import { LogoFooter } from '@/public/assets/LogoFooter'
import Typography from '@mui/material/Typography'
import { colors, footerItems } from '@/constants'
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
 * Footer component, renders a footer with a login link and a list of items with
 * titles and subtitles.
 *
 * When the user is logged in, the component renders null.
 *
 * @returns {React.ReactElement | null} The Footer component when the user is not
 * logged in, otherwise null.
 */

const Footer = () => {
	const t = useTranslations('Footer')

	const { user, loading } = useAuth()

	if (loading) return null

	if (user) {
		return null
	}

	return (
		<PageContainer backgroundColor={colors.darkBlue}>
			<Box sx={FooterContainerStyle}>
				<Box sx={FooterContentStyle}>
					<Box sx={FooterLogInContainerStyle}>
						<LogoFooter />
						<Box component={Link} href="/loging" sx={FooterLogInLinkStyle}>
							<Typography sx={FooterLogInStyle}>{t('loging')}</Typography>
						</Box>
					</Box>

					<Box sx={FooterItemRowStyle}>
						{footerItems.map((item, index) => {
							return (
								<Box
									key={`index-${index}-${item}`}
									component={Link}
									href={t(`items.${item}.link`)}
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

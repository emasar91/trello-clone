import React from 'react'
import PageContainer from '../pageContainer/PageContainer'
import { Box, Link } from '@mui/material'
import { LogoFooter } from '@/public/assets/LogoFooter'
import Typography from '@mui/material/Typography'
import { footerItems } from '@/constants'
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

const Footer = () => {
	const t = useTranslations('Footer')
	return (
		<PageContainer backgroundColor="#172b4d">
			<Box sx={FooterContainerStyle}>
				<Box sx={FooterContentStyle}>
					<Box sx={FooterLogInContainerStyle}>
						<LogoFooter />
						<Box component={Link} href="/loging" sx={FooterLogInLinkStyle}>
							<Typography sx={FooterLogInStyle}>{t('loging')}</Typography>
						</Box>
					</Box>

					<Box sx={FooterItemRowStyle}>
						{footerItems.map((item, index) => (
							<Box
								key={`index-${index}-${item}`}
								component={Link}
								href={item}
								sx={FooterItemsContainerStyle}
							>
								<Typography sx={FooterTitleStyle}>
									{t(`items.${item}.title`)}
								</Typography>
								<Typography sx={FooterSubTitleStyle}>
									{t(`items.${item}.subTitle`)}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</PageContainer>
	)
}

export default Footer

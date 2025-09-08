import { HelpIcon } from '@/public/assets/icons/HelpIcon'
import { LogoIcon } from '@/public/assets/icons/LogoIcon'
import { MegafonoIcon } from '@/public/assets/icons/MegafonoIcon'
import { NotificationIcon } from '@/public/assets/icons/NotificationIcon'
import { SearchIcon } from '@/public/assets/icons/SearchIcon'
import {
	Box,
	Button,
	Input,
	InputAdornment,
	Link,
	useTheme,
} from '@mui/material'
import React from 'react'
import AccountMenu from './components/AccountMenu/AccounMenu'
import {
	NavbarLoggedActionsStyle,
	NavbarLoggedAdormentIconStyle,
	NavbarLoggedContainerStyle,
	NavbarLoggedCreateButtonStyle,
	NavbarLoggedInnerWrapperStyle,
	NavbarLoggedLogoWrapperStyle,
	NavbarLoggedSearchContainerStyle,
	NavbarLoggedSearchInputStyle,
	NavbarLoggedSearchSectionStyle,
	NavbarLoggedSearchWrapperStyle,
} from './NavBarLogged.styles'
import { useTranslations } from 'next-intl'

const NavbarLogged = () => {
	const t = useTranslations('NavbarLogged')
	const theme = useTheme()

	return (
		<Box sx={NavbarLoggedContainerStyle(theme)}>
			<Box sx={NavbarLoggedInnerWrapperStyle}>
				<Box sx={NavbarLoggedLogoWrapperStyle(theme)}>
					<Box component={Link} href="/appTrello">
						<LogoIcon />
					</Box>
				</Box>
				``
				<Box sx={NavbarLoggedSearchSectionStyle}>
					<Box sx={NavbarLoggedSearchWrapperStyle}>
						<Box sx={NavbarLoggedSearchContainerStyle}>
							<Input
								disableUnderline
								placeholder="Buscar"
								fullWidth
								sx={NavbarLoggedSearchInputStyle(theme)}
								startAdornment={
									<InputAdornment
										position="start"
										sx={NavbarLoggedAdormentIconStyle}
									>
										<SearchIcon />
									</InputAdornment>
								}
							/>
						</Box>
					</Box>
					<Button variant="contained" sx={NavbarLoggedCreateButtonStyle(theme)}>
						{t('create')}
					</Button>
				</Box>
				<Box sx={NavbarLoggedActionsStyle}>
					<MegafonoIcon />
					<NotificationIcon />
					<HelpIcon />

					<AccountMenu />
				</Box>
			</Box>
		</Box>
	)
}

export default NavbarLogged

import { LogoIcon } from '@/public/assets/icons/LogoIcon'
import { SearchIcon } from '@/public/assets/icons/SearchIcon'
import {
	Box,
	Button,
	Input,
	InputAdornment,
	Link,
	useTheme,
} from '@mui/material'
import React, { useState } from 'react'
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
import CreateBoardMenu from '../Pages/Workspaces/components/CreateBordMenu/CreateBoardMenu'

const NavbarLogged = () => {
	const t = useTranslations('NavbarLogged')
	const theme = useTheme()

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)

	return (
		<Box sx={NavbarLoggedContainerStyle(theme)}>
			<Box sx={NavbarLoggedInnerWrapperStyle}>
				<Box sx={NavbarLoggedLogoWrapperStyle(theme)}>
					<Box component={Link} href="/u">
						<LogoIcon color={theme.palette.navbar.logoColor} />
					</Box>
				</Box>
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
					<Button
						variant="contained"
						sx={NavbarLoggedCreateButtonStyle(theme)}
						onClick={handleClick}
					>
						{t('create')}
					</Button>
					<CreateBoardMenu
						open={open}
						handleClose={handleClose}
						anchorEl={anchorEl}
					/>
				</Box>
				<Box sx={NavbarLoggedActionsStyle}>
					<AccountMenu />
				</Box>
			</Box>
		</Box>
	)
}

export default NavbarLogged

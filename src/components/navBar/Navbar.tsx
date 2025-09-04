'use client'

import React from 'react'
import TabsNavbar from '@/components/Navbar/components/TabsNavbar/TabsNavbar'
import { Box, Link } from '@mui/material'
import {
	NavBarButtonsLoginStyle,
	NavBarContainerStyle,
	NavBarLangSwitcherStyle,
	NavBarLoginStyle,
	NavBarLogoStyle,
	NavBarRegisterStyle,
	NavBarRowStyle,
} from './NavBar.styles'
import { Logo } from '../../../public/assets/Logo'
import { useTranslations } from 'next-intl'
import LangSwitcher from './components/LangSwitcher/LangSwitcher'
import BoxInfo from './components/BoxInfo/BoxInfo'
import NavbarLogged from './NavbarLogged'
import { useAuth } from '@/context/useAuthContext'

/**
 * The Navbar component for the Trelo clone.
 *
 * This component displays the navbar across the top of the page, which
 * includes the logo, tabs, and two buttons for logging in and getting a free
 * trial.
 *
 * @returns {React.ReactElement} The rendered navbar component.
 */
const NavBar = () => {
	const t = useTranslations('NavBarLogin.buttonLogin')

	const { user, loading } = useAuth()

	if (loading) return null

	if (user) {
		return <NavbarLogged />
	}

	return (
		<>
			<Box sx={NavBarContainerStyle}>
				<Box sx={NavBarRowStyle}>
					<Link href={'/'} sx={NavBarLogoStyle}>
						<Logo />
					</Link>
					<Box>
						<TabsNavbar />
					</Box>
					<Box sx={NavBarButtonsLoginStyle}>
						<Box sx={NavBarLangSwitcherStyle}>
							<LangSwitcher />
						</Box>
						<Box component={Link} href={'/login'} sx={NavBarLoginStyle}>
							{t('login')}
						</Box>
						<Box component={Link} href={'/register'} sx={NavBarRegisterStyle}>
							{t('getFree')}
						</Box>
					</Box>
				</Box>
			</Box>
			<BoxInfo />
		</>
	)
}

export default NavBar

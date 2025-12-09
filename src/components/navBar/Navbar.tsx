'use client'

import React, { useEffect, useState } from 'react'
import TabsNavbar from '@/components/Navbar/components/TabsNavbar/TabsNavbar'
import { Box, Link, Typography, useMediaQuery } from '@mui/material'
import {
	backBase,
	backHidden,
	backVisible,
	logoContainerStyle,
	logoHidden,
	logoMobile,
	logoVisible,
	NavBarBurguerMenuContainerStyle,
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
import { ExpandableMenu } from './NavbarMobile'
import BurguerIconMenu from './components/BurguerIconMenu/BurguerIconMenu'
import { useStoreTrello } from '@/context/useStoreTrello'
import { ArrowLeftIcon } from '@/public/assets/icons/ArrowLeftIcon'

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
	const tt = useTranslations('NavBar')
	const [open, setOpen] = useState(false)
	const width = useMediaQuery('(max-width:990px)')
	const { setDrawerOpen } = useStoreTrello()
	const [submenuOpen, setSubmenuOpen] = useState(open)

	const { user, loading } = useAuth()

	useEffect(() => {
		if (!open) {
			setTimeout(() => {
				setSubmenuOpen(false)
			}, 300)
		}
	}, [open])

	useEffect(() => {
		if (open && !width) {
			setOpen(false)
			setSubmenuOpen(true)
		}

		if (!open && width) {
			setDrawerOpen(false)
		}
		//eslint-disable-next-line
	}, [width])

	if (loading) return null

	if (user && !loading) {
		return <NavbarLogged />
	}

	return (
		<>
			<Box sx={NavBarContainerStyle}>
				<Box sx={NavBarRowStyle(width)}>
					<Box sx={logoContainerStyle}>
						<Link href={'/'} style={logoMobile}>
							<Box
								sx={[
									NavBarLogoStyle,
									!submenuOpen && logoVisible,
									submenuOpen && logoHidden,
								]}
							>
								<Logo />
							</Box>
						</Link>
						<Box sx={[backBase, submenuOpen ? backVisible : backHidden]}>
							<ArrowLeftIcon />
							<Typography onClick={() => setSubmenuOpen(false)} fontSize={20}>
								{tt('back')}
							</Typography>
						</Box>
					</Box>
					{width ? (
						<Box display={'flex'} gap={'1rem'} alignItems={'center'}>
							<LangSwitcher />
							<Box
								onClick={() => {
									setOpen(!open)
								}}
								sx={NavBarBurguerMenuContainerStyle}
							>
								<BurguerIconMenu />
							</Box>
						</Box>
					) : (
						<>
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
								<Box
									component={Link}
									href={'/register'}
									sx={NavBarRegisterStyle}
								>
									{t('getFree')}
								</Box>
							</Box>
						</>
					)}
				</Box>
			</Box>
			<BoxInfo />
			<ExpandableMenu
				open={open}
				navbarHeight={61}
				submenuOpen={submenuOpen}
				setSubmenuOpen={setSubmenuOpen}
			/>
		</>
	)
}

export default NavBar

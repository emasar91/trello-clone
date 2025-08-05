'use client'

import React from 'react'
import TabsNavbar from '@/components/Navbar/components/TabsNavbar/TabsNavbar'
import { Box, Link } from '@mui/material'
import {
	NavBarButtonsLoginStyle,
	NavBarContainerStyle,
	NavBarLogoStyle,
	NavBarRowStyle,
} from './NavBar.styles'
import { Logo } from '../../../public/assets/Logo'
import { useTranslations } from 'next-intl'

/**
 * The Navbar component for the Trelo clone.
 *
 * This component displays the navbar across the top of the page, which
 * includes the logo, tabs, and two buttons for logging in and getting a free
 * trial.
 *
 * @returns {React.ReactElement} The rendered navbar component.
 */
export default function NavBar() {
	const t = useTranslations('NavBarLogin.buttonLogin')

	return (
		<Box sx={NavBarContainerStyle}>
			<Box sx={NavBarRowStyle}>
				<Link href={'/'} sx={NavBarLogoStyle}>
					<Logo />
				</Link>
				<Box>
					<TabsNavbar />
				</Box>
				<Box sx={NavBarButtonsLoginStyle}>
					<Link
						sx={{
							alignItems: 'center',
							alignSelf: 'stretch',
							color: 'rgb(23, 43, 77)',
							display: 'flex',
							fontSize: '1.2rem',
							height: '100%',
							padding: '0.5rem 1.5rem',
							textDecoration: 'none',
						}}
					>
						{t('login')}
					</Link>
					<Link
						sx={{
							backgroundColor: 'rgb(0, 101, 255)',
							WebkitBoxAlign: 'center',
							alignItems: 'center',
							alignSelf: 'stretch',
							color: 'rgb(255, 255, 255)',
							display: 'flex',
							fontSize: '1.2rem',
							height: '100%',
							padding: '0.5rem 1.5rem',
							textDecoration: 'none',
						}}
					>
						{t('getFree')}
					</Link>
				</Box>
			</Box>
		</Box>
	)
}

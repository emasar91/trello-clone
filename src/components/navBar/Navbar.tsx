'use client'

import Image from 'next/image'
import React from 'react'
import ButtonLogin from '../Button/Button'
import TabsNavbar from '@/components/Navbar/components/TabsNavbar/TabsNavbar'
import { Box } from '@mui/material'
import { NavBarContainerStyle, NavBarRowStyle } from './NavBar.style'

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
	return (
		<Box sx={NavBarContainerStyle}>
			<Box sx={NavBarRowStyle}>
				<Box className="flex items-center">
					<Image
						src="/assets/navbar.PNG"
						width={120}
						height={40}
						alt="Trelo clone"
					/>
					<Box>
						<TabsNavbar />
					</Box>
				</Box>
				<Box>
					<ButtonLogin variant="text" text="login" />
					<ButtonLogin
						variant="contained"
						text="getFree"
						color="white"
						bgColor="rgb(0, 101, 255)"
						hoverColor="rgb(7, 71, 166)"
					/>
				</Box>
			</Box>
		</Box>
	)
}

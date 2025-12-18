import React from 'react'
import Tabs from '@/components/Navbar_TMP/components/TabsNavbar/components/Tabs/Tabs'
import { Box } from '@mui/material'
import { containerBoxStyle } from './TabsNavBar.styles'

/**
 * TabsNavBar is a component that renders a container with a Tabs component.
 * It renders a Box with the containerBoxStyle and contains a Tabs component.
 * The Tabs component renders a list of tabs from the tabsNavbar constant.
 * @returns {React.ReactElement} The Box component with the Tabs component.
 */
const TabsNavBar = () => {
	return (
		<Box sx={containerBoxStyle}>
			<Tabs />
		</Box>
	)
}

export default TabsNavBar

import { tabsNavbar } from '@/constants'
import React from 'react'
import Tab from '@/components/Navbar/components/TabsNavbar/components/Tab/Tab'
import { useStoreTrello } from '@/context/useStoreTrello'
import { ITab, ITabItem } from '@/types/navBar'
import { Box } from '@mui/material'
import { TabsContainerStyle, TabsRowStyle } from './Tabs.styles'

/**
 * Tabs component for rendering a list of tabs in the navbar.
 * Utilizes the Zustand store to manage tab selection state and drawer state.
 *
 * - Sets the selected tab and opens a drawer with tab-specific information.
 *
 * @returns {React.ReactElement} The container with tabs rendered inside.
 */

const Tabs = () => {
	const { tabSelected, setTabSelected, setDrawerOpen, setItemsBoxInfo } =
		useStoreTrello()

	const handleChange = (value: ITab) => {
		setTabSelected(value.tab)
		setDrawerOpen(true)
		setItemsBoxInfo(value.drawer as unknown as ITabItem[])
	}

	return (
		<Box sx={TabsContainerStyle}>
			<Box sx={TabsRowStyle}>
				{tabsNavbar.map((tab, index) => (
					<Tab
						key={`index-${index}-${tab.tab}`}
						tab={tab as ITab}
						handleChange={handleChange}
						selected={tabSelected === tab.tab}
					/>
				))}
			</Box>
		</Box>
	)
}

export default Tabs

import { tabsNavbar } from '@/constants'
import React from 'react'
import Tab from '@/components/Navbar/components/TabsNavbar/components/Tab'
import { useStoreTrello } from '@/context/useStoreTrello'
import { ITab } from '@/types/navBar'
import { TabsOptions } from '@/context/interface'

const Tabs = () => {
	const { tabSelected, setTabSelected, setDrawerOpen } = useStoreTrello()

	const handleChange = (value: TabsOptions) => {
		setTabSelected(value)
		setDrawerOpen(true)
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center">
				{tabsNavbar.map((tab, index) => (
					<Tab
						key={`index-${index}-${tab.tab}`}
						tab={tab as ITab}
						handleChange={handleChange}
						selected={tabSelected === tab.tab}
					/>
				))}
			</div>
		</div>
	)
}

export default Tabs

import { tabsNavbar } from '@/constants'
import React from 'react'
import Tab from './Tab'

const Tabs = () => {
	const [value, setValue] = React.useState(0)
	console.log('🚀 ~ NavBar ~ value:', value)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<div className="flex flex-row items-center">
			{tabsNavbar.map((tab, index) => (
				<Tab
					key={`index-${index}-${tab.tab}`}
					tab={tab}
					value={index}
					handleChange={handleChange}
					selected={value === index}
				/>
			))}
		</div>
	)
}

export default Tabs

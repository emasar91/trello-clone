import { ITab } from '@/types/navBar'
import { Button } from '@mui/material'
import React from 'react'
import { ArrowDown } from '@/components/Icons/ArrowDown'
import { useTranslations } from 'next-intl'
import { TabContainerStyle } from './Tab.style'

type Props = {
	tab: ITab
	selected: boolean
	handleChange: (value: ITab) => void
}

/**
 * Tab component for the navbar
 * @param {ITab} tab - The tab item configuration
 * @param {boolean} selected - Whether the tab is selected or not
 * @param {(value: ITab) => void} handleChange - The function to be called when the tab is clicked
 * @returns {React.ReactElement} The tab component
 */
const Tab = ({ tab, selected, handleChange }: Props) => {
	const buttonDrawer = tab.drawer

	const t = useTranslations('NavBar.tabs')

	return (
		<Button
			variant="text"
			onClick={() => handleChange(tab)}
			disableRipple
			sx={TabContainerStyle(selected)}
		>
			{t(tab.tab)}
			{buttonDrawer && <ArrowDown />}
		</Button>
	)
}

export default Tab

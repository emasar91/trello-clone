import { ITab } from '@/types/navBar'
import { Button } from '@mui/material'
import React, { forwardRef } from 'react'
import { ArrowDown } from '@/components/Icons/ArrowDown'
import { useTranslations } from 'next-intl'
import { TabContainerStyle } from './Tab.style'

type Props = {
	tab: ITab
	selected: boolean
	handleChange: (value: ITab) => void
	isOpen: boolean
	ref?: (el: HTMLButtonElement | null) => void
}

const Tab = forwardRef<HTMLButtonElement, Props>(
	({ tab, selected, handleChange, isOpen }, ref) => {
		const buttonDrawer = tab.drawer
		const t = useTranslations('NavBar.tabs')

		return (
			<Button
				ref={ref}
				variant="text"
				onClick={() => handleChange(tab)}
				disableRipple
				sx={TabContainerStyle(selected, isOpen)}
			>
				{t(tab.tab)}
				{buttonDrawer && <ArrowDown />}
			</Button>
		)
	}
)

Tab.displayName = 'Tab'
export default Tab

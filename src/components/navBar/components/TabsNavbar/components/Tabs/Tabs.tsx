import { tabsNavbar } from '@/constants'
import React, { useEffect, useRef, useState } from 'react'
import Tab from '@/components/Navbar/components/TabsNavbar/components/Tab/Tab'
import { useStoreTrello } from '@/context/useStoreTrello'
import { IDrawer, ITab } from '@/types/navBar'
import { Box } from '@mui/material'
import { TabsContainerStyle, TabsRowStyle } from './Tabs.styles'
import Underline from './components/Underline/Underline'
import { useTranslations } from 'next-intl'

/**
 * Tabs component renders a list of tabs and manages their state.
 *
 * Utilizes Zustand for state management, tracking the selected tab, drawer open state,
 * and box information. It also calculates and applies the underline style for the selected tab.
 *
 * - Maps through the `tabsNavbar` constant to render individual `Tab` components.
 * - Uses `handleChange` to update the state when a tab is selected.
 * - `useEffect` to adjust the underline position and width based on the selected tab.
 *
 * @returns {React.ReactElement} A Box component containing the rendered tabs and underline.
 */

const Tabs = () => {
	const { tabSelected, setTabSelected, setDrawerOpen, setBoxInfo, drawerOpen } =
		useStoreTrello()
	const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

	const t = useTranslations('Drawer')

	const handleChange = (value: ITab) => {
		setTabSelected(value.tab)
		setDrawerOpen(!!value.drawer)
		setBoxInfo(value.drawer as IDrawer)
		if (!value.drawer) {
			window.location.href = t(`${value.tab}.link`)
		}
	}

	const [underline, setUnderline] = useState({
		left: 0,
		width: 0,
		origin: 'left',
		active: false,
	})

	useEffect(() => {
		const buttonEl = tabRefs.current[tabSelected]
		if (!buttonEl) return

		const range = document.createRange()
		const textNode = Array.from(buttonEl.childNodes).find(
			(node) => node.nodeType === Node.TEXT_NODE
		)
		const svgNode = buttonEl.querySelector('svg')

		if (textNode && svgNode) {
			range.setStartBefore(textNode)
			range.setEndAfter(svgNode)

			const rect = range.getBoundingClientRect()
			const containerRect = buttonEl.offsetParent?.getBoundingClientRect()
			if (!containerRect) return

			const left = rect.left - containerRect.left
			const width = rect.width

			setUnderline((prev) => ({
				...prev,
				left,
				width,
				origin: 'left',
				active: false,
			}))

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setUnderline((prev) => ({
						...prev,
						active: drawerOpen,
					}))
				})
			})
		}
	}, [tabSelected, drawerOpen])

	useEffect(() => {
		if (!drawerOpen) setUnderline((prev) => ({ ...prev, active: false }))
	}, [drawerOpen])

	return (
		<Box sx={TabsContainerStyle}>
			<Box sx={TabsRowStyle}>
				{tabsNavbar.map((tab, index) => (
					<Tab
						key={`index-${index}-${tab.tab}`}
						tab={tab as ITab}
						handleChange={handleChange}
						selected={tabSelected === tab.tab}
						ref={(el) => {
							tabRefs.current[tab.tab] = el
						}}
						isOpen={drawerOpen}
					/>
				))}
			</Box>
			<Underline underlineStyle={underline} />
		</Box>
	)
}

export default Tabs

import { tabsNavbar } from '@/constants'
import React, { useEffect, useRef, useState } from 'react'
import Tab from '@/components/Navbar/components/TabsNavbar/components/Tab/Tab'
import { useStoreTrello } from '@/context/useStoreTrello'
import { IDrawer, ITab } from '@/types/navBar'
import { Box } from '@mui/material'
import { TabsContainerStyle, TabsRowStyle } from './Tabs.styles'
import Underline from './components/Underline/Underline'

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

	const handleChange = (value: ITab) => {
		setTabSelected(value.tab)
		setDrawerOpen(!!value.drawer)
		setBoxInfo(value.drawer as IDrawer)
	}

	const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
	const [underline, setUnderline] = useState({
		left: 0,
		width: 0,
		origin: 'left' as 'left' | 'right',
		active: false, // activa animación
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

			// 1. Desactivar visibilidad y setear posición
			setUnderline((prev) => ({
				...prev,
				left,
				width,
				origin: drawerOpen ? 'left' : 'right',
				active: false,
			}))

			// 2. Esperar dos frames y luego activar
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setUnderline((prev) => ({
						...prev,
						active: drawerOpen, // solo mostrar si el drawer está abierto
					}))
				})
			})
		}
	}, [tabSelected, drawerOpen])

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
